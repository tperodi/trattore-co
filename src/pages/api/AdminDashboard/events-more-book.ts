import { NextApiRequest, NextApiResponse } from 'next';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d’ambiente.'
  );
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey);

type EventData = {
  titolo: string;
  capienza: number;
  stato: string;
  prenotazioni: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Metodo ${req.method} non consentito`);
  }

  try {
    // Query per ottenere gli eventi con il numero di prenotazioni
    const { data: eventsData, error: eventsError } = await supabase
      .from('evento')
      .select('titolo, capienza, stato, ide');

    if (eventsError) {
      console.error('Errore durante il recupero degli eventi:', eventsError.message);
      return res.status(500).json({ error: 'Errore del server durante il recupero degli eventi.' });
    }

    const enrichedEvents = await Promise.all(
      eventsData.map(async (event: { titolo: string; capienza: number; stato: string; ide: number; }) => {
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('prenotazione')
          .select('idp')
          .eq('ide', event.ide);

        if (bookingsError) {
          console.error(
            `Errore durante il recupero delle prenotazioni per l'evento ${event.titolo}:`,
            bookingsError.message
          );
          return { ...event, prenotazioni: 0 };
        }

        return { ...event, prenotazioni: bookingsData ? bookingsData.length : 0 };
      })
    );

    // Ordinare gli eventi per numero di prenotazioni decrescente
    enrichedEvents.sort((a: EventData, b: EventData) => b.prenotazioni - a.prenotazioni);

    return res.status(200).json({ events: enrichedEvents });
  } catch (err) {
    console.error('Errore generale durante il recupero dei dati:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
