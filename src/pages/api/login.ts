import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt'; // Per verificare la password

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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Metodo ${req.method} non consentito`);
  }

  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Nome Utente e password sono obbligatori.' });
  }

  try {
    // Cerca l'utente in base all'email o al nome utente
    const { data: user, error } = await supabase
      .from('utente')
      .select('*')
      .or(`email.eq.${identifier},nomeutente.eq.${identifier}`)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Credenziali non valide.' });
    }

    // Verifica la password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenziali non valide.' });
    }

    // Risposta di successo con i dettagli dell'utente
    return res.status(200).json({
      message: 'Login effettuato con successo',
      user: {
        id: user.idu,
        username: user.nomeutente,
        email: user.email,
        role: user.ruolo,
      },
    });
  } catch (err: any) {
    console.error('Errore durante il login:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
