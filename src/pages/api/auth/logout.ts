import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie'; // Per gestire i cookie

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Metodo ${req.method} non consentito.` });
  }

  try {
    // Rimuovi il cookie 'user'
    res.setHeader(
      'Set-Cookie',
      serialize('user', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Imposta una data passata per invalidare il cookie
      })
    );

    // Risposta di successo
    return res.status(200).json({ message: 'Logout effettuato con successo.' });
  } catch (error) {
    console.error('Errore durante il logout:', error);
    return res.status(500).json({ error: 'Errore del server durante il logout.' });
  }
}
