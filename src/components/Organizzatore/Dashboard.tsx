"use client";

import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

interface Evento {
  ide: number;
  titolo: string;
  data: string;
  orario: string;
  luogo: string;
  categoria: string;
  descrizione: string;
  capienza: number;
  stato: string;
}

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [eventi, setEventi] = useState<Evento[]>([]);
  const [eventoSelezionato, setEventoSelezionato] = useState<Evento | null>(null);

  useEffect(() => {
    const fetchEventi = async () => {
      try {
        const response = await fetch("/api/events/management-events");
        if (response.ok) {
          const data = await response.json();
          setEventi(data.events);
        } else {
          console.error("Errore nel caricamento degli eventi.");
        }
      } catch (error) {
        console.error("Errore durante il fetch degli eventi:", error);
      }
    };

    fetchEventi();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Sei sicuro di voler eliminare questo evento?")) {
      try {
        const response = await fetch(`/api/events/management-events`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ide: id }),
        });
        if (response.ok) {
          setEventi((prev) => prev.filter((evento) => evento.ide !== id));
          alert("Evento eliminato con successo!");
        } else {
          alert("Errore durante l'eliminazione dell'evento.");
        }
      } catch (error) {
        console.error("Errore durante l'eliminazione dell'evento:", error);
      }
    }
  };

  const handleEdit = (evento: Evento) => {
    setEventoSelezionato(evento);
    setCurrentView("modifica-evento");
  };

  const handleSaveEdit = async (updatedEvento: Evento) => {
    try {
      const response = await fetch("/api/events/management-events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvento),
      });
      if (response.ok) {
        setEventi((prev) =>
          prev.map((evento) => (evento.ide === updatedEvento.ide ? updatedEvento : evento))
        );
        setEventoSelezionato(null);
        setCurrentView("dashboard");
        alert("Evento modificato con successo!");
      } else {
        alert("Errore durante la modifica dell'evento.");
      }
    } catch (error) {
      console.error("Errore durante la modifica dell'evento:", error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "modifica-evento":
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Modifica Evento</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (eventoSelezionato) handleSaveEdit(eventoSelezionato);
              }}
              className="bg-white shadow rounded-lg p-6 space-y-6"
            >
              <div>
                <label htmlFor="titolo" className="block text-sm font-medium text-gray-700">
                  Nome dell&apos;Evento
                </label>
                <input
                  type="text"
                  id="titolo"
                  value={eventoSelezionato?.titolo || ""}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, titolo: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                    Data
                  </label>
                  <input
                    type="date"
                    id="data"
                    value={eventoSelezionato?.data || ""}
                    onChange={(e) =>
                      setEventoSelezionato((prev) =>
                        prev ? { ...prev, data: e.target.value } : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orario" className="block text-sm font-medium text-gray-700">
                    Orario
                  </label>
                  <input
                    type="time"
                    id="orario"
                    value={eventoSelezionato?.orario || ""}
                    onChange={(e) =>
                      setEventoSelezionato((prev) =>
                        prev ? { ...prev, orario: e.target.value } : null
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="luogo" className="block text-sm font-medium text-gray-700">
                  Luogo
                </label>
                <input
                  type="text"
                  id="luogo"
                  value={eventoSelezionato?.luogo || ""}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, luogo: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <input
                  type="text"
                  id="categoria"
                  value={eventoSelezionato?.categoria || ""}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, categoria: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700">
                  Descrizione
                </label>
                <textarea
                  id="descrizione"
                  value={eventoSelezionato?.descrizione || ""}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, descrizione: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                >
                  Salva Modifiche
                </button>
              </div>
            </form>
          </div>
        );
      case "dashboard":
      default:
        return (
          <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Gestione Eventi</h1>
            <div className="bg-white shadow rounded-lg">
              <Table className="w-full">
                <Thead>
                  <Tr className="bg-gray-200">
                    <Th className="px-4 py-2 text-left">Nome</Th>
                    <Th className="px-4 py-2 text-left">Data</Th>
                    <Th className="px-4 py-2 text-left">Luogo</Th>
                    <Th className="px-4 py-2 text-left">Categoria</Th>
                    <Th className="px-4 py-2 text-center">Azioni</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {eventi.map((evento) => (
                    <Tr key={evento.ide} className="border-b">
                      <Td className="px-4 py-2">{evento.titolo}</Td>
                      <Td className="px-4 py-2">{evento.data}</Td>
                      <Td className="px-4 py-2">{evento.luogo}</Td>
                      <Td className="px-4 py-2">{evento.categoria}</Td>
                      <Td className="px-4 py-2 text-center">
                        <button
                          className="bg-blue-500
                          text-white px-4 py-2 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(evento)}
                        >
                          Modifica
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                          onClick={() => handleDelete(evento.ide)}
                        >
                          Elimina
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
