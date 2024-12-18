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
    // Recupera luoghi unici dalla tabella evento
    const { data: locations, error } = await supabase
      .from('evento')
      .select('luogo', { count: 'exact' }) // Seleziona solo la colonna luogo
      .neq('stato', 'Cancellato') // Filtra per eventi non cancellati
      .neq('luogo', null); // Esclude valori null

    if (error) {
      console.error('Errore durante il recupero delle location:', error.message);
      return res.status(500).json({ error: 'Errore durante il recupero delle location.' });
    }

    // Rimuovi duplicati
    const uniqueLocations = Array.from(new Set(locations.map((event) => event.luogo)));

    return res.status(200).json({ locations: uniqueLocations });
  } catch (err) {
    console.error('Errore del server:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
