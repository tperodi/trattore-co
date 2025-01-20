import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d\'ambiente.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function bookingsHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetBookings(req, res);



    case 'PUT':
      return handleUpdateBooking(req, res);

    case 'DELETE':
      return handleDeleteBooking(req, res);

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Metodo ${method} non consentito`);
  }
}

// Recupera tutte le prenotazioni associate agli eventi di un organizzatore
// Recupera tutte le prenotazioni associate agli eventi di un organizzatore
async function handleGetBookings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userCookie = req.cookies["user"];
      if (!userCookie) {
        console.error("Errore: cookie 'user' mancante.");
        return res.status(401).json({ error: "Utente non autorizzato." });
      }
  
      const { id: ido } = JSON.parse(userCookie); // ID dell'organizzatore
  
      console.log(`Inizio recupero prenotazioni per organizer_id: ${ido}`);
  
      // Query per ottenere prenotazioni con dettagli utente e evento
      const { data: bookings, error } = await supabase
        .from("prenotazione")
        .select(
          `
          idp,
          dataprenotazione,
          stato,
          evento (
            ide,
            titolo,
            data,
            luogo,
            descrizione,
            capienza
          ),
          utente (
            idu,
            nome,
            cognome,
            email
          )
        `
        )
        .eq("evento.ido", ido) // Filtra per ID dell'organizzatore
        .order("dataprenotazione", { ascending: false }); // Ordina per data decrescente
  
      if (error) {
        console.error("Errore durante la query Supabase:", error.message);
        return res
          .status(500)
          .json({ error: "Errore durante il recupero delle prenotazioni." });
      }
  
      // Filtra solo le prenotazioni valide con eventi e utenti associati
      const filteredBookings = bookings.filter(
        (booking) => booking.evento && booking.utente
      );
  
      console.log("Prenotazioni filtrate:", filteredBookings);
      return res.status(200).json({ bookings: filteredBookings });
    } catch (err) {
      console.error("Errore generale durante il recupero delle prenotazioni:", err);
      return res.status(500).json({ error: "Errore del server." });
    }
  }
  
// Crea una nuova prenotazione


// Aggiorna lo stato di una prenotazione
async function handleUpdateBooking(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { idp, stato } = req.body;

    if (!idp || !stato) {
      return res.status(400).json({
        error: 'ID prenotazione (idp) e stato sono obbligatori.',
      });
    }

    const { error } = await supabase
      .from('prenotazione')
      .update({ stato })
      .eq('idp', idp);

    if (error) {
      console.error('Errore durante l\'aggiornamento della prenotazione:', error.message);
      return res.status(500).json({ error: 'Errore durante l\'aggiornamento della prenotazione.' });
    }

    return res.status(200).json({ message: 'Stato della prenotazione aggiornato con successo.' });
  } catch (err) {
    console.error('Errore generale durante l\'aggiornamento della prenotazione:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}

// Elimina una prenotazione
async function handleDeleteBooking(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { idp } = req.body;

    if (!idp) {
      return res.status(400).json({ error: 'ID prenotazione (idp) è obbligatorio.' });
    }

    const { error } = await supabase
      .from('prenotazione')
      .delete()
      .eq('idp', idp);

    if (error) {
      console.error('Errore durante l\'eliminazione della prenotazione:', error.message);
      return res.status(500).json({ error: 'Errore durante l\'eliminazione della prenotazione.' });
    }

    return res.status(200).json({ message: 'Prenotazione eliminata con successo.' });
  } catch (err) {
    console.error('Errore generale durante l\'eliminazione della prenotazione:', err);
    return res.status(500).json({ error: 'Errore del server.' });
  }
}
