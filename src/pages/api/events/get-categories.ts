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
    const { data: categories, error } = await supabase
      .from('evento')
      .select('categoria', { count: 'exact' })
      .neq('categoria', null) // Esclude valori null
      .neq('categoria', ''); // Esclude valori vuoti

    if (error) {
      console.error('Errore durante il recupero delle categorie:', error.message);
      return res.status(500).json({ error: 'Errore durante il recupero delle categorie.' });
    }

    // Rimuove duplicati, se necessario
    const uniqueCategories = Array.from(new Set(categories.map((cat) => cat.categoria)));

    return res.status(200).json({ categories: uniqueCategories });
  } catch (err) {
    console.error('Errore del server:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
