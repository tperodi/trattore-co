"use client";
import React, { useState, useEffect } from "react";
import EventSearchBar from "../../components/Eventi/EventSearchBar";
import EventList from "../../components/Eventi/EventList";
import EventDetailModal from "../../components/Eventi/EventDetailModal";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

interface EventData {
  id: number;
  title: string;
  date: string; // Formato ISO: "YYYY-MM-DD"
  location: string;
  description: string;
}

const Page: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]); // Stato per gli eventi
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Stato per la ricerca
  const [startDate, setStartDate] = useState<string>(""); // Data di inizio filtro
  const [endDate, setEndDate] = useState<string>(""); // Data di fine filtro
  const [loading, setLoading] = useState<boolean>(true); // Stato per il caricamento
  const [error, setError] = useState<string | null>(null); // Stato per gli errori

  // Recupero eventi dall'API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/getEvents");
        if (!response.ok) {
          throw new Error("Errore durante il recupero degli eventi.");
        }
        const data = await response.json();

        // Mappare i dati per adattarli alla struttura di EventData
        const mappedEvents = data.events.map((event: any) => ({
          id: event.ide,
          title: event.titolo,
          date: event.data,
          location: event.luogo || "Località non specificata", // Fallback se il campo non esiste
          description: event.descrizione,
        }));

        console.log("Eventi mappati:", mappedEvents);
        setEvents(mappedEvents); // Aggiorna lo stato con i dati mappati
      } catch (err: any) {
        console.error("Errore nella fetch:", err);
        setError(err.message || "Errore sconosciuto.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtraggio dinamico degli eventi
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;

    const matchesStartDate =
      !startDate || new Date(event.date) >= new Date(startDate);

    const matchesEndDate =
      !endDate || new Date(event.date) <= new Date(endDate);

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Eventi</h1>

        {/* Gestione dello stato di caricamento e errori */}
        {loading && <p>Caricamento eventi...</p>}
        {error && <p className="text-red-500">Errore: {error}</p>}

        {!loading && !error && (
          <>
            {/* Barra di ricerca */}
            <EventSearchBar onSearch={setSearchQuery} />

            {/* Filtro per le date */}
            <div className="flex space-x-4 mb-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data Inizio
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data Fine
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Lista degli eventi */}
            <EventList events={filteredEvents} onEventClick={setSelectedEvent} />

            {/* Modale per i dettagli dell'evento */}
            {selectedEvent && (
              <EventDetailModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
