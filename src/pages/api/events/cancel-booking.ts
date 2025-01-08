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
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Metodo ${req.method} non consentito.` });
  }

  const { userId, eventId }: { userId: string; eventId: number } = req.body;

  // Validazione dei dati
  if (!userId || !eventId) {
    return res.status(400).json({
      error: "Entrambi ID utente (userId) e ID evento (eventId) sono obbligatori.",
    });
  }

  try {
    // Verifica se la prenotazione esiste
    const { data: booking, error: bookingError } = await supabase
      .from("prenotazione")
      .select("idp")
      .eq("idu", userId)
      .eq("ide", eventId)
      .single();

    if (bookingError || !booking) {
      return res
        .status(404)
        .json({ error: "Prenotazione non trovata o già cancellata." });
    }

    // Esegui la cancellazione
    const { error: deleteError } = await supabase
      .from("prenotazione")
      .delete()
      .eq("idu", userId)
      .eq("ide", eventId);

    if (deleteError) {
      console.error(
        "Errore durante la cancellazione della prenotazione:",
        deleteError.message
      );
      return res.status(500).json({
        error: "Errore del server durante la cancellazione della prenotazione.",
      });
    }

    return res.status(200).json({ message: "Prenotazione cancellata con successo." });
  } catch (err) {
    console.error("Errore durante la cancellazione della prenotazione:", err);
    return res.status(500).json({ error: "Errore interno del server." });
  }
}
