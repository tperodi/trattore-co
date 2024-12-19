"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import CreaCorso from "./CreaCorso";

// Dati fittizi per i corsi
interface Corso {
  id: number;
  nome: string;
  data: string;
  luogo: string;
  categoria: string;
  descrizione: string;
}

const corsiFittizi: Corso[] = [
  {
    id: 1,
    nome: "Introduzione alla Programmazione",
    data: "2024-01-15",
    luogo: "Milano",
    categoria: "Tecnologia",
    descrizione: "Un corso base per iniziare con la programmazione.",
  },
  {
    id: 2,
    nome: "Pittura per Principianti",
    data: "2024-02-10",
    luogo: "Roma",
    categoria: "Arte",
    descrizione: "Un corso per apprendere le tecniche di base della pittura.",
  },
  {
    id: 3,
    nome: "Calisthenics Avanzato",
    data: "2024-03-05",
    luogo: "Bologna",
    categoria: "Sport",
    descrizione: "Allenamento avanzato per gli appassionati di calisthenics.",
  },
];

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [corsi, setCorsi] = useState<Corso[]>(corsiFittizi);
  const [corsoSelezionato, setCorsoSelezionato] = useState<Corso | null>(null);

  const handleDelete = (id: number) => {
    const conferma = confirm("Sei sicuro di voler eliminare questo corso?");
    if (conferma) {
      setCorsi((prev) => prev.filter((corso) => corso.id !== id));
    }
  };

  const handleEdit = (corso: Corso) => {
    setCorsoSelezionato(corso);
    setCurrentView("modifica-corso");
  };

  const handleSaveEdit = (updatedCorso: Corso) => {
    setCorsi((prev) =>
      prev.map((corso) => (corso.id === updatedCorso.id ? updatedCorso : corso))
    );
    setCorsoSelezionato(null);
    setCurrentView("dashboard");
  };

  const renderContent = () => {
    switch (currentView) {
      case "crea-corso":
        return <CreaCorso />;
      case "modifica-corso":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Modifica Corso</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (corsoSelezionato) handleSaveEdit(corsoSelezionato);
              }}
              className="bg-white shadow rounded-lg p-6"
            >
              <div className="mb-4">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome del Corso
                </label>
                <input
                  type="text"
                  id="nome"
                  value={corsoSelezionato?.nome || ""}
                  onChange={(e) =>
                    setCorsoSelezionato((prev) =>
                      prev ? { ...prev, nome: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                  Data
                </label>
                <input
                  type="date"
                  id="data"
                  value={corsoSelezionato?.data || ""}
                  onChange={(e) =>
                    setCorsoSelezionato((prev) =>
                      prev ? { ...prev, data: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="luogo" className="block text-sm font-medium text-gray-700">
                  Luogo
                </label>
                <input
                  type="text"
                  id="luogo"
                  value={corsoSelezionato?.luogo || ""}
                  onChange={(e) =>
                    setCorsoSelezionato((prev) =>
                      prev ? { ...prev, luogo: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <select
                  id="categoria"
                  value={corsoSelezionato?.categoria || ""}
                  onChange={(e) =>
                    setCorsoSelezionato((prev) =>
                      prev ? { ...prev, categoria: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                >
                  <option value="">Seleziona una Categoria</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Arte">Arte</option>
                  <option value="Sport">Sport</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700">
                  Descrizione
                </label>
                <textarea
                  id="descrizione"
                  value={corsoSelezionato?.descrizione || ""}
                  onChange={(e) =>
                    setCorsoSelezionato((prev) =>
                      prev ? { ...prev, descrizione: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Salva Modifiche
              </button>
            </form>
          </div>
        );
      case "dashboard":
      default:
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Gestione Corsi</h1>
            <table className="table-auto w-full bg-white shadow rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Luogo</th>
                  <th className="px-4 py-2">Categoria</th>
                  <th className="px-4 py-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {corsi.map((corso) => (
                  <tr key={corso.id}>
                    <td className="border px-4 py-2">{corso.nome}</td>
                    <td className="border px-4 py-2">{corso.data}</td>
                    <td className="border px-4 py-2">{corso.luogo}</td>
                    <td className="border px-4 py-2">{corso.categoria}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleEdit(corso)}
                      >
                        Modifica
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(corso.id)}
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
