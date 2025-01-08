import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Variabili d'ambiente mancanti.");
    throw new Error("Assicurati di configurare SUPABASE_URL e SUPABASE_SERVICE_KEY nelle variabili d'ambiente.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function fetchUsersHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Metodo ${req.method} non consentito`);
    }

    console.log("Inizio fetch degli utenti...");
    try {
        const { data: users, error } = await supabase
            .from('utente')
            .select('idu, nome, cognome, email, ruolo');

        if (error) {
            console.error("Errore durante il recupero degli utenti dal database:", error.message);
            return res.status(500).json({ error: "Errore del server durante il recupero degli utenti" });
        }

        console.log("Utenti recuperati con successo:", users);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Errore generale durante il recupero degli utenti:", error);
        return res.status(500).json({ error: "Errore del server" });
    }
}
