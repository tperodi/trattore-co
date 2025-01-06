// GestioneUtenti.tsx con design ottimizzato per mobile
"use client";
import React, { useState, useEffect } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

interface User {
  idu: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
}

const GestioneUtenti = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editedRoles, setEditedRoles] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/AdminDashboard/getUsers");
        if (!response.ok) {
          throw new Error("Errore nel caricamento degli utenti");
        }
        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      `${user.nome} ${user.cognome}`.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleRoleChangeLocal = (idu: number, newRole: string) => {
    setEditedRoles((prev) => ({ ...prev, [idu]: newRole }));
  };

  const handleRoleChangeSave = async (idu: number) => {
    const newRole = editedRoles[idu];
    if (!newRole) return;

    try {
      const response = await fetch(`/api/AdminDashboard/change-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idu, newRole }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento del ruolo");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.idu === idu ? { ...user, ruolo: newRole } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.idu === idu ? { ...user, ruolo: newRole } : user
        )
      );

      setEditedRoles((prev) => {
        const updated = { ...prev };
        delete updated[idu];
        return updated;
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) return <div className="p-6 text-center">Caricamento in corso...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Errore: {error}</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gestione Utenti</h2>

      {/* Barra di ricerca */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Cerca per nome..."
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista Utenti */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.idu}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 items-start sm:items-center"
          >
            {/* Informazioni Utente */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                <span className="block">Nome: {user.nome} {user.cognome}</span>
                <span className="block">Email: {user.email}</span>
              </p>
            </div>

            {/* Ruolo Utente */}
            <div className="w-full sm:w-auto">
              <select
                value={editedRoles[user.idu] || user.ruolo}
                onChange={(e) => handleRoleChangeLocal(user.idu, e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Partecipante">Partecipante</option>
                <option value="Organizzatore">Organizzatore</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Pulsante Salva */}
            <button
              onClick={() => handleRoleChangeSave(user.idu)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              disabled={!editedRoles[user.idu]}
            >
              Salva
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestioneUtenti;
