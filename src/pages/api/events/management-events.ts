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
  if (req.method === 'POST') {
    // Crea un nuovo evento
    try {
      const {
        titolo,
        descrizione,
        data,
        orario,
        luogo,
        capienza,
        stato,
        categoria
      } = req.body;

      const userCookie = req.cookies['user']; // Prende il cookie user
      if (!userCookie) {
        return res.status(401).json({ error: 'Utente non autorizzato.' });
      }

      const { id: ido } = JSON.parse(userCookie); // Estrae l'ID organizzatore dal cookie

      if (!titolo || !data || !orario || !luogo || !capienza || !stato) {
        return res.status(400).json({
          error: 'Tutti i campi obbligatori (titolo, data, orario, luogo, capienza, stato) devono essere forniti.'
        });
      }

      const { data: evento, error } = await supabase
        .from('evento') // Nome della tabella
        .insert({
          titolo,
          descrizione,
          data,
          orario,
          luogo,
          capienza,
          stato,
          ido,
          categoria
        })
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({ evento });
    } catch (err) {
      return res.status(500).json({ error: 'Errore del server', details: err });
    }
  } else if (req.method === 'PUT') {
    // Modifica un evento esistente
    try {
      const {
        ide,
        titolo,
        descrizione,
        data,
        orario,
        luogo,
        capienza,
        stato,
        categoria
      } = req.body;

      const userCookie = req.cookies['user']; // Prende il cookie user
      
      if (!userCookie) {
        return res.status(401).json({ error: 'Utente non autorizzato.' });
      }

      const { id: ido } = JSON.parse(userCookie); // Estrae l'ID organizzatore dal cookie

      if (!ide || !titolo || !data || !orario || !luogo || !capienza || !stato) {
        return res.status(400).json({
          error: 'Tutti i campi obbligatori (ide, titolo, data, orario, luogo, capienza, stato) devono essere forniti.'
        });
      }

      const { data: evento, error } = await supabase
        .from('evento')
        .update({
          titolo,
          descrizione,
          data,
          orario,
          luogo,
          capienza,
          stato,
          categoria
        })
        .eq('ide', ide)
        .eq('ido', ido) // Verifica che l'utente abbia diritto di modificare l'evento
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ evento });
    } catch (err) {
      return res.status(500).json({ error: 'Errore del server', details: err });
    }
  } else if (req.method === 'GET') {
    // Recupera tutti gli eventi dell'organizzatore
    try {
      const userCookie = req.cookies['user']; // Prende il cookie user
      if (!userCookie) {
        return res.status(401).json({ error: 'Utente non autorizzato.' });
      }

      const { id: ido } = JSON.parse(userCookie); // Estrae l'ID organizzatore dal cookie

      const { data: eventi, error } = await supabase
        .from('evento')
        .select('*')
        .eq('ido', ido); // Filtra per ID organizzatore

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ events: eventi });
    } catch (err) {
      return res.status(500).json({ error: 'Errore del server', details: err });
    }
  } else if (req.method === 'DELETE') {
    // Elimina un evento
    try {
      const { ide } = req.body;

      const userCookie = req.cookies['user']; // Prende il cookie user
      if (!userCookie) {
        return res.status(401).json({ error: 'Utente non autorizzato.' });
      }

      const { id: ido } = JSON.parse(userCookie); // Estrae l'ID organizzatore dal cookie

      const { error } = await supabase
        .from('evento')
        .delete()
        .eq('ide', ide)
        .eq('ido', ido); // Verifica che l'utente abbia diritto di eliminare l'evento

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ message: 'Evento eliminato con successo' });
    } catch (err) {
      return res.status(500).json({ error: 'Errore del server', details: err });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'GET', 'DELETE']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
