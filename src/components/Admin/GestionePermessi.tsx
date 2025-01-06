"use client";
import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

type User = {
    idu: number;
    nome: string;
    cognome: string;
    email: string;
    ruolo: string;
};

const GestionePermessi = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/AdminDashboard/getUsers");
                if (!response.ok) {
                    throw new Error("Errore nel caricamento degli utenti");
                }
                const data: User[] = await response.json();
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = users.filter(user =>
            `${user.nome} ${user.cognome}`.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset alla prima pagina
    };

    const getPaginatedUsers = () => {
        const startIndex = (currentPage - 1) * usersPerPage;
        return filteredUsers.slice(startIndex, startIndex + usersPerPage);
    };

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (direction: "next" | "prev") => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (error) return <div className="p-6 text-center text-red-500">Errore: {error}</div>;

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Gestione Permessi</h2>

            {/* Barra di ricerca */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Cerca per nome..."
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Tabella Responsiva */}
            <Table className="w-full bg-white shadow-lg rounded-lg">
                <Thead className="bg-gray-100">
                    <Tr>
                        <Th className="text-left px-2 sm:px-4 py-2">Nome</Th>
                        <Th className="text-left px-2 sm:px-4 py-2">Email</Th>
                        <Th className="text-left px-2 sm:px-4 py-2">Ruolo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {getPaginatedUsers().map(user => (
                        <Tr key={user.idu} className="border-b last:border-b-0 hover:bg-gray-50">
                            <Td className="px-2 sm:px-4 py-3 font-medium text-gray-700">{user.nome} {user.cognome}</Td>
                            <Td className="px-2 sm:px-4 py-3 text-gray-600">{user.email}</Td>
                            <Td className="px-2 sm:px-4 py-3">
                                <select
                                    value={user.ruolo}
                                    className="w-full border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Partecipante">Partecipante</option>
                                    <option value="Organizzatore">Organizzatore</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Paginazione */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Precedente
                </button>
                <span className="text-gray-700">
                    Pagina {currentPage} di {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Successiva
                </button>
            </div>
        </div>
    );
};

export default GestionePermessi;