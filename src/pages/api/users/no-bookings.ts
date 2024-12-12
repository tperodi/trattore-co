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
    // Recupera gli ID degli utenti che hanno effettuato prenotazioni
    const { data: bookedUsers, error: bookedUsersError } = await supabase
      .from('prenotazione')
      .select('idu');

    if (bookedUsersError) {
      console.error('Errore durante il recupero delle prenotazioni:', bookedUsersError.message);
      return res.status(500).json({
        error: 'Errore durante il recupero delle prenotazioni.',
        details: bookedUsersError.message,
      });
    }

    const bookedUserIds = bookedUsers.map((booking) => booking.idu);

    // Recupera gli utenti che non sono nella lista degli utenti prenotati
    const { data: users, error: usersError } = await supabase
      .from('utente')
      .select('idu, nomeutente, email, nome, cognome, ruolo');

    if (usersError) {
      console.error('Errore durante il recupero degli utenti:', usersError.message);
      return res.status(500).json({
        error: 'Errore durante il recupero degli utenti.',
        details: usersError.message,
      });
    }

    // Filtra manualmente gli utenti non prenotati
    const usersWithoutBookings = users.filter((user) => !bookedUserIds.includes(user.idu));

    if (usersWithoutBookings.length === 0) {
      return res.status(404).json({
        error: 'Tutti gli utenti hanno effettuato almeno una prenotazione.',
      });
    }

    return res.status(200).json({ users: usersWithoutBookings });
  } catch (err) {
    console.error('Errore generale durante il recupero degli utenti:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
