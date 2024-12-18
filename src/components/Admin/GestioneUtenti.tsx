"use client";

import React, { useState } from "react";

// Definizione del tipo per gli utenti
interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  eventi: string[];
}

const initialUsers: User[] = [
  { id: 1, nome: "Giulia", cognome: "Bianchi", email: "giulia.bianchi@example.com", ruolo: "Partecipante", eventi: ["Evento A", "Evento B"] },
  { id: 2, nome: "Marco", cognome: "Rossi", email: "marco.rossi@example.com", ruolo: "Organizzatore", eventi: ["Evento C"] },
  { id: 3, nome: "Chiara", cognome: "Verdi", email: "chiara.verdi@example.com", ruolo: "Partecipante", eventi: ["Evento D", "Evento E"] },
];

const GestioneUtenti: React.FC = () => {
  const [users] = useState<User[]>(initialUsers);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gestione Utenti</h2>
      <table className="table-auto w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Ruolo</th>
            <th className="px-4 py-2">Eventi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.nome} {user.cognome}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.ruolo}</td>
              <td className="border px-4 py-2">{user.eventi.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestioneUtenti;
