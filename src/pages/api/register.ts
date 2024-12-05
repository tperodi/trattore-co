import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt'; // Libreria per hashare le password

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d\'ambiente.'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface UserPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password, firstName, lastName, email, role }: UserPayload = req.body;

      // Validazione dei campi
      if (!username || !password || !firstName || !lastName || !email || !role) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori.' });
      }

      // Validazione del ruolo
      const validRoles = ['Organizzatore', 'Partecipante', 'Admin'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Ruolo non valido.' });
      }

      // Hash della password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserimento nel database tramite Supabase
      const { data, error } = await supabase
        .from('utente') // Nome della tabella
        .insert([
          {
            nomeutente: username,
            password: hashedPassword, // Usa la password hashata
            nome: firstName,
            cognome: lastName,
            email,
            ruolo: role,
          },
        ]);

      if (error) {
        console.error('Errore durante l\'inserimento in Supabase:', error.message);
        return res.status(500).json({ error: 'Errore durante la registrazione dell\'utente.' });
      }

      return res.status(201).json({ message: 'Utente registrato con successo', data });
    } catch (err: unknown) {
      console.error('Errore del server:', err);
      return res.status(500).json({
        error: (err instanceof Error ? err.message : 'Errore del server'),
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
