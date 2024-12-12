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

  try {
    // Query SQL personalizzata per ottenere gli eventi con più di 10 iscritti
    const { data, error } = await supabase.rpc('get_events_with_more_than_10_users');

    if (error) {
      console.error('Errore durante il recupero degli eventi:', error.message);
      return res.status(500).json({ error: 'Errore del server durante il recupero degli eventi.' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Nessun evento trovato con più di 10 iscritti.' });
    }

    return res.status(200).json({ events: data });
  } catch (err) {
    console.error('Errore generale durante il recupero degli eventi:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
