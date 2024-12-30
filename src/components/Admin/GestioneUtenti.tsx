// Gestione Utenti migliorato
"use client"
import React, { useState } from "react";

const GestioneUtenti = () => {
    const [users] = useState([
        { id: 1, nome: "Giulia", cognome: "Bianchi", email: "giulia.bianchi@example.com", ruolo: "Partecipante", eventi: ["Evento A", "Evento B"] },
        { id: 2, nome: "Marco", cognome: "Rossi", email: "marco.rossi@example.com", ruolo: "Organizzatore", eventi: ["Evento C"] },
        { id: 3, nome: "Chiara", cognome: "Verdi", email: "chiara.verdi@example.com", ruolo: "Partecipante", eventi: ["Evento D", "Evento E"] },
    ]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestione Utenti</h2>
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2">Nome</th>
                        <th className="text-left px-4 py-2">Email</th>
                        <th className="text-left px-4 py-2">Ruolo</th>
                        <th className="text-left px-4 py-2">Eventi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b last:border-b-0">
                            <td className="px-4 py-3">{user.nome} {user.cognome}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.ruolo}</td>
                            <td className="px-4 py-3">{user.eventi.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestioneUtenti;
