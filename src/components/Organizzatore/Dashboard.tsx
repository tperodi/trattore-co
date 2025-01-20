"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Toaster, toast } from "react-hot-toast";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Evento {
  ide: number;
  titolo: string;
  descrizione: string | null;
  data: string;
  orario: string;
  luogo: string;
  capienza: number;
  stato: string;
  ido: number;
  categoria: string | null;
}

const statiValidi = ["Attivo", "Non Attivo", "Cancellato"];

const Dashboard: React.FC = () => {
  const [eventi, setEventi] = useState<Evento[]>([]);
  const [eventoSelezionato, setEventoSelezionato] = useState<Evento | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchEventi = async () => {
      try {
        const response = await fetch("/api/events/management-events");
        if (response.ok) {
          const data = await response.json();
          setEventi(data.events);
        } else {
          toast.error("Errore nel caricamento degli eventi.");
        }
      } catch (error) {
        console.error("Errore durante il fetch degli eventi:", error);
        toast.error("Errore durante il fetch degli eventi.");
      }
    };

    fetchEventi();
  }, []);

  // Gestisci il numero di elementi per pagina in base alla larghezza dello schermo
  useEffect(() => {
    const updatePageSize = () => {
      setPageSize(window.innerWidth < 768 ? 3 : 10);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const startIndex = currentPage * pageSize;
  const currentEvents = eventi.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if ((currentPage + 1) * pageSize < eventi.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
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
          toast.success("Evento eliminato con successo!");
        } else {
          toast.error("Errore durante l'eliminazione dell'evento.");
        }
      } catch (error) {
        console.error("Errore durante l'eliminazione dell'evento:", error);
        toast.error("Errore durante l'eliminazione dell'evento.");
      }
    }
  };

  const handleEdit = (evento: Evento) => {
    setEventoSelezionato(evento);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!eventoSelezionato) return;

    try {
      const response = await fetch("/api/events/management-events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventoSelezionato),
      });
      if (response.ok) {
        setEventi((prev) =>
          prev.map((evento) => (evento.ide === eventoSelezionato.ide ? eventoSelezionato : evento))
        );
        setEventoSelezionato(null);
        setIsDialogOpen(false);
        toast.success("Evento modificato con successo!");
      } else {
        toast.error("Errore durante la modifica dell'evento.");
      }
    } catch (error) {
      console.error("Errore durante la modifica dell'evento:", error);
      toast.error("Errore durante la modifica dell'evento.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex-1 flex flex-col">
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Gestione Eventi</h1>
          <div className="bg-white shadow rounded-lg">
            <Table className="w-full">
              <Thead>
                <Tr className="bg-gray-200">
                  <Th className="px-4 py-2 text-left">Titolo</Th>
                  <Th className="px-4 py-2 text-left">Data</Th>
                  <Th className="px-4 py-2 text-left">Luogo</Th>
                  <Th className="px-4 py-2 text-left">Categoria</Th>
                  <Th className="px-4 py-2 text-center">Azioni</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentEvents.map((evento) => (
                  <Tr key={evento.ide} className="border-b">
                    <Td className="px-4 py-2">{evento.titolo}</Td>
                    <Td className="px-4 py-2">{evento.data}</Td>
                    <Td className="px-4 py-2">{evento.luogo}</Td>
                    <Td className="px-4 py-2">{evento.categoria}</Td>
                    <Td className="px-4 py-2 text-center">
                      <button
                          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                          onClick={() => handleEdit(evento)}
                          title="Modifica"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(evento.ide)}
                        title="Elimina"
                      >
                        <FiTrash size={18}/>
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Precedente
            </button>
            <span>
              Pagina <strong>{currentPage + 1}</strong> di{" "}
              {Math.ceil(eventi.length / pageSize)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={(currentPage + 1) * pageSize >= eventi.length}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Successivo
            </button>
          </div>
        </div>
      </div>

      {/* Dialog per Modifica Evento */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <Dialog.Title className="text-xl font-bold">Modifica Evento</Dialog.Title>
          {eventoSelezionato && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Titolo</label>
                <input
                  type="text"
                  value={eventoSelezionato.titolo}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, titolo: e.target.value } : null
                    )
                  }
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrizione</label>
                <textarea
                  value={eventoSelezionato.descrizione || ""}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, descrizione: e.target.value } : null
                    )
                  }
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data</label>
                  <input
                    type="date"
                    value={eventoSelezionato.data}
                    onChange={(e) =>
                      setEventoSelezionato((prev) =>
                        prev ? { ...prev, data: e.target.value } : null
                      )
                    }
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Orario</label>
                  <input
                    type="time"
                    value={eventoSelezionato.orario}
                    onChange={(e) =>
                      setEventoSelezionato((prev) =>
                        prev ? { ...prev, orario: e.target.value } : null
                      )
                    }
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Luogo</label>
                <input
                  type="text"
                  value={eventoSelezionato.luogo}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, luogo: e.target.value } : null
                    )
                  }
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capienza</label>
                <input
                  type="number"
                  value={eventoSelezionato.capienza}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev
                        ? { ...prev, capienza: Number(e.target.value) > 0 ? Number(e.target.value) : 1 }
                        : null
                    )
                  }
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stato</label>
                <select
                  value={eventoSelezionato.stato}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, stato: e.target.value } : null
                    )
                  }
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {statiValidi.map((stato) => (
                    <option key={stato} value={stato}>
                      {stato}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <input
                  type="text"
                  value={eventoSelezionato.categoria || ""}
                  onChange={(e) =>
                    setEventoSelezionato((prev) =>
                      prev ? { ...prev, categoria: e.target.value } : null
                    )
                  }
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Salva
                </button>
              </div>
            </form>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;

