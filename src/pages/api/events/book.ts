import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d’ambiente.'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Metodo ${req.method} non consentito`);
  }

  const { userId, eventId, stato }: { userId: number; eventId: number; stato: string } = req.body;

  // Validazione dei dati
  if (!userId || !eventId || !stato) {
    return res.status(400).json({ error: 'ID utente, ID evento e stato sono obbligatori.' });
  }

  if (!['Confermata', 'In Attesa', 'Annullata'].includes(stato)) {
    return res.status(400).json({ error: 'Stato non valido. Usa: Confermata, In Attesa, Annullata.' });
  }

  try {
    // Verifica se l'evento esiste
    const { data: event, error: eventError } = await supabase
      .from('evento')
      .select('capienza, stato')
      .eq('ide', eventId)
      .single();

    if (eventError || !event) {
      return res.status(404).json({ error: 'Evento non trovato.' });
    }

    // Controlla se lo stato dell'evento è attivo
    if (event.stato !== 'Attivo') {
      return res.status(400).json({ error: 'L\'evento non è attivo.' });
    }

    // Controlla le prenotazioni esistenti
    const { data: bookings, error: bookingError } = await supabase
      .from('prenotazione')
      .select('idp')
      .eq('ide', eventId);

    if (bookingError) {
      console.error('Errore nel recupero delle prenotazioni:', bookingError.message);
      return res.status(500).json({ error: 'Errore del server durante la verifica delle prenotazioni.' });
    }

    // Verifica che la capienza non sia superata
    if (bookings.length >= event.capienza) {
      return res.status(400).json({ error: 'Capienza massima dell\'evento raggiunta.' });
    }

    // Aggiungi la prenotazione
    const { error: insertError } = await supabase
      .from('prenotazione')
      .insert({
        idu: userId,
        ide: eventId,
        dataprenotazione: new Date().toISOString().split('T')[0], // Data odierna
        stato,
      });

    if (insertError) {
      // Gestisce errore di chiave unica (utente già prenotato per l'evento)
      if (insertError.message.includes('unico_utente_evento')) {
        return res.status(400).json({ error: 'L\'utente ha già prenotato questo evento.' });
      }
      console.error('Errore durante la creazione della prenotazione:', insertError.message);
      return res.status(500).json({ error: 'Errore del server durante la prenotazione.' });
    }

    return res.status(201).json({ message: 'Prenotazione effettuata con successo.' });
  } catch (err) {
    console.error('Errore durante la prenotazione:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
