import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL || ''; // URL del tuo progetto Supabase
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''; // Chiave di servizio

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d\'ambiente.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Handler API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Query per ottenere gli eventi con il conteggio delle prenotazioni
      const { data, error } = await supabase
        .from('evento')
        .select(`
          ide,
          titolo,
          data,
          luogo,
          descrizione,
          categoria,
          capienza,
          stato,
          prenotazioni:prenotazione(ide)
        `);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // Trasforma i dati per includere il conteggio delle prenotazioni
      const events = data.map(event => ({
        ...event,
        prenotazioni: event.prenotazioni ? event.prenotazioni.length : 0, // Conteggio delle prenotazioni
      }));

      return res.status(200).json({ events });
    } catch (err) {
      console.error('Errore del server:', err);
      return res.status(500).json({ error: 'Errore del server', details: err });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
