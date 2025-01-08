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
      // Query per ottenere gli eventi
      const { data, error } = await supabase
        .from('evento') // Nome della tabella
        .select('*'); // Seleziona tutte le colonne

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ events: data });
    } catch (err) {
      return res.status(500).json({ error: 'Errore del server', details: err });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
