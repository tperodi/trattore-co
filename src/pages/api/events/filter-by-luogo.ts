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

  const { luogo } = req.query;

  // Validazione del parametro 'luogo'
  if (!luogo || typeof luogo !== 'string') {
    return res.status(400).json({ error: 'Parametro luogo è obbligatorio e deve essere una stringa.' });
  }

  try {
    // Recupera tutti gli eventi filtrati per luogo
    const { data, error } = await supabase
      .from('evento')
      .select('ide, titolo, descrizione, data, orario, luogo, capienza, stato')
      .ilike('luogo', `%${luogo}%`); // Usa il filtro 'ilike' per ricerca case-insensitive

    if (error) {
      console.error('Errore durante il recupero degli eventi:', error.message);
      return res.status(500).json({ error: 'Errore del server durante il recupero degli eventi.' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: `Nessun evento trovato per il luogo "${luogo}".` });
    }

    return res.status(200).json({ events: data });
  } catch (err) {
    console.error('Errore durante il recupero degli eventi:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
