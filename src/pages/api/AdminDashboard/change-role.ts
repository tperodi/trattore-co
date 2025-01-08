import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function changeRoleHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Metodo ${req.method} non consentito`);
    }

    const { idu, newRole } = req.body;

    if (!idu || !newRole) {
        return res.status(400).json({ error: "Parametri mancanti" });
    }

    try {
        const { error } = await supabase
            .from("utente")
            .update({ ruolo: newRole })
            .eq("idu", idu);

        if (error) {
            throw error;
        }

        return res.status(200).json({ message: "Ruolo aggiornato con successo" });
    } catch (error) {
        console.error("Errore durante l'aggiornamento del ruolo:", error);
        return res.status(500).json({ error: "Errore durante l'aggiornamento del ruolo" });
    }
}
