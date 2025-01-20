"use client";

import React, { useState, useEffect } from "react";
import { FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

interface BookingData {
  idp: number;
  dataprenotazione: string;
  stato: string;
  evento: {
    ide: number;
    titolo: string;
    data: string;
    luogo: string;
    descrizione: string;
    capienza: number;
  };
  utente: {
    idu: number;
    nome: string;
    cognome: string;
    email: string;
  };
}

const GestionePrenotazioni: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Imposta il numero di elementi per pagina

  useEffect(() => {
    const updatePageSize = () => {
      // Imposta il numero di elementi per pagina in base alle dimensioni dello schermo
      if (window.innerWidth < 768) {
        setPageSize(3); // Mobile
      } else {
        setPageSize(10); // Desktop
      }
    };

    // Inizializza la dimensione della pagina
    updatePageSize();

    // Aggiorna la dimensione della pagina in caso di resize
    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    const fetchBookings = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/AdminOrganizzatore/bookings");
        if (!response.ok) throw new Error("Errore durante il recupero delle prenotazioni.");

        const data: { bookings: BookingData[] } = await response.json();
        setBookings(data.bookings);
      } catch (err: unknown) {
        console.error("Errore:", err);
        if (err instanceof Error) setError(err.message);
        else setError("Errore sconosciuto.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: number, status: string): Promise<void> => {
    try {
      const response = await fetch(`/api/AdminOrganizzatore/bookings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idp: bookingId, stato: status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'aggiornamento dello stato.");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.idp === bookingId ? { ...booking, stato: status } : booking
        )
      );
      toast.success(`Stato aggiornato a ${status.toLowerCase()}.`);
    } catch (err: unknown) {
      console.error("Errore:", err);
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Errore sconosciuto.");
    }
  };

  const handleDelete = async (bookingId: number): Promise<void> => {
    try {
      const response = await fetch(`/api/AdminOrganizzatore/bookings`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idp: bookingId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'eliminazione della prenotazione.");
      }

      setBookings((prev) => prev.filter((booking) => booking.idp !== bookingId));
      toast.success("Prenotazione eliminata con successo.");
    } catch (err: unknown) {
      console.error("Errore:", err);
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Errore sconosciuto.");
    }
  };

  const startIndex = currentPage * pageSize;
  const currentBookings = bookings.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if (startIndex + pageSize < bookings.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <div className="p-6 text-center">Caricamento in corso...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Errore: {error}</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Gestione Prenotazioni</h1>
      <div className="overflow-x-auto">
        <Table className="w-full border rounded-lg bg-white shadow-sm">
          <Thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <Tr>
              <Th className="px-4 py-2 text-left">Titolo Evento</Th>
              <Th className="px-4 py-2 text-left">Data Evento</Th>
              <Th className="px-4 py-2 text-left">Luogo</Th>
              <Th className="px-4 py-2 text-left">Utente</Th>
              <Th className="px-4 py-2 text-left">Stato</Th>
              <Th className="px-4 py-2 text-center">Azioni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBookings.map((booking) => (
              <Tr key={booking.idp} className="hover:bg-gray-100">
                <Td className="px-4 py-2">{booking.evento.titolo}</Td>
                <Td className="px-4 py-2">{booking.evento.data}</Td>
                <Td className="px-4 py-2">{booking.evento.luogo}</Td>
                <Td className="px-4 py-2">
                  {`${booking.utente.nome} ${booking.utente.cognome}`}
                  <br />
                  <span className="text-xs text-gray-500">{booking.utente.email}</span>
                </Td>
                <Td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      booking.stato === "Confermata"
                        ? "bg-green-200 text-green-700"
                        : booking.stato === "In Attesa"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {booking.stato}
                  </span>
                </Td>
                <Td className="px-4 py-2 text-center space-x-2">
                  {booking.stato === "In Attesa" && (
                    <>
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleUpdateStatus(booking.idp, "Confermata")}
                      >
                        <FiCheck size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleUpdateStatus(booking.idp, "Annullata")}
                      >
                        <FiX size={18} />
                      </button>
                    </>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(booking.idp)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* Paginazione */}
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
          {Math.ceil(bookings.length / pageSize)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={startIndex + pageSize >= bookings.length}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default GestionePrenotazioni;
