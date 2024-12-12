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
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Metodo ${req.method} non consentito`);
  }

  const { userId } = req.query;

  // Validazione dell'userId
  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ error: 'ID utente valido è obbligatorio.' });
  }

  try {
    // Recupera le prenotazioni dell'utente con i dettagli dell'evento
    const { data, error } = await supabase
      .from('prenotazione')
      .select(`
        idp,
        dataprenotazione,
        stato,
        evento (
          ide,
          titolo,
          descrizione,
          data,
          orario,
          luogo,
          capienza,
          stato
        )
      `)
      .eq('idu', Number(userId));

    if (error) {
      console.error('Errore durante il recupero delle prenotazioni:', error.message);
      return res.status(500).json({ error: 'Errore del server durante il recupero delle prenotazioni.' });
    }

    // Se non ci sono prenotazioni
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Nessuna prenotazione trovata per l\'utente.' });
    }

    return res.status(200).json({ events: data });
  } catch (err) {
    console.error('Errore durante il recupero delle prenotazioni:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
