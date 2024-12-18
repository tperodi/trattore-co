"use client";

import React, { useState } from "react";

interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
}

const initialUsers: User[] = [
  { id: 1, nome: "Mario", cognome: "Rossi", email: "mario.rossi@example.com", ruolo: "Partecipante" },
  { id: 2, nome: "Luisa", cognome: "Bianchi", email: "luisa.bianchi@example.com", ruolo: "Organizzatore" },
  { id: 3, nome: "Alessandro", cognome: "Verdi", email: "alessandro.verdi@example.com", ruolo: "Admin" },
];

const GestionePermessi: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ruolo: newRole } : user))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gestione Permessi</h2>
      <table className="table-auto w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Ruolo</th>
            <th className="px-4 py-2">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.nome} {user.cognome}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.ruolo}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="Partecipante">Partecipante</option>
                  <option value="Organizzatore">Organizzatore</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Salva
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionePermessi;
