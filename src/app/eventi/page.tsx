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
  category: string; // Nuova proprietà
}

interface ApiEvent {
  ide?: number;
  titolo?: string;
  data?: string;
  luogo?: string;
  descrizione?: string;
  categoria?: string;
}

const Page: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        const mappedEvents: EventData[] = data.events.map((event: ApiEvent) => ({
          id: event.ide || 0,
          title: event.titolo || "Titolo non disponibile",
          date: event.data || "",
          location: event.luogo || "Località non specificata",
          description: event.descrizione || "Descrizione non disponibile",
          category: event.categoria || "Categoria non specificata",
        }));

        setEvents(mappedEvents);
      } catch (err: unknown) {
        console.error("Errore nella fetch:", err);
        setError(
          err instanceof Error ? err.message : "Errore sconosciuto durante la fetch."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || false;

    const matchesStartDate =
      !startDate || new Date(event.date) >= new Date(startDate);

    const matchesEndDate =
      !endDate || new Date(event.date) <= new Date(endDate);

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  const handleBook = (event: EventData) => {
    // Aggiungi qui la logica di prenotazione, ad esempio invio a un'API
    alert(`Prenotazione effettuata per l'evento: ${event.title}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Eventi</h1>

        {loading && <p>Caricamento eventi...</p>}
        {error && <p className="text-red-500">Errore: {error}</p>}

        {!loading && !error && (
          <>
            <EventSearchBar onSearch={setSearchQuery} />
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

            <EventList events={filteredEvents} onEventClick={setSelectedEvent} />

            {selectedEvent && (
              <EventDetailModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                onBook={() => handleBook(selectedEvent)}
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
