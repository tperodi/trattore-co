import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import bcrypto from 'bcrypt'; // Libreria per hashare le password

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d\'ambiente.'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, firstName, lastName, email, role } = req.body;

    if (!username || !password || !firstName || !lastName || !email || !role) {
        console.error('Campi mancanti:', {
          username,
          password,
          firstName,
          lastName,
          email,
          role,
        });
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori.' });
      }
      

    // Controlla che il ruolo sia valido
    const validRoles = ['Organizzatore', 'Partecipante', 'Admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Ruolo non valido.' });
    }

    try {
      // Hash della password
      const hashedPassword = await bcrypto.hash(password, 10);

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
        throw error;
      }

      return res.status(201).json({ message: 'Utente registrato con successo', data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Errore del server' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
