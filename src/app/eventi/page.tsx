"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventSearchBar from "../../components/Eventi/EventSearchBar";
import EventList from "../../components/Eventi/EventList";
import EventDetailModal from "../../components/Eventi/EventDetailModal";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import { Toaster, toast } from "react-hot-toast";

interface EventData {
  id: number;
  title: string;
  date: string; // Formato ISO: "YYYY-MM-DD"
  location: string;
  description: string; // Ora opzionale
  category: string;
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
  const [locations, setLocations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookedEvents, setBookedEvents] = useState<EventData[]>([]);
  const [showOnlyBooked, setShowOnlyBooked] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/events/getEvents');
        if (!response.ok) {
          throw new Error('Errore durante il recupero degli eventi.');
        }
        const data = await response.json();

        const mappedEvents: EventData[] = data.events.map((event: ApiEvent) => ({
          id: event.ide || 0,
          title: event.titolo || 'Titolo non disponibile',
          date: event.data || '',
          location: event.luogo || 'Località non specificata',
          description: event.descrizione || 'Descrizione non disponibile',
          category: event.categoria || 'Categoria non specificata',
        }));

        setEvents(mappedEvents);
      } catch (err: unknown) {
        console.error('Errore nella fetch:', err);
        setError(
          err instanceof Error ? err.message : 'Errore sconosciuto durante la fetch.'
        );
      } finally {
        setLoading(false);
      }
    };
    const fetchBookedEvents = async () => {
      try {
        const userId = Number(localStorage.getItem("userId"));
        if (!userId) return;
    
        const response = await fetch(`/api/events/booked?userId=${userId}`);
        if (!response.ok) throw new Error("Errore nel recupero delle prenotazioni");
        const data = await response.json();
    
        // Estrai e mappa gli eventi prenotati
        const mappedBookedEvents: EventData[] = data.events.map((booking: any) => ({
          id: booking.evento.ide, // ID dell'evento
          title: booking.evento.titolo,
          date: booking.evento.data,
          location: booking.evento.luogo,
          description: booking.evento.descrizione || "Descrizione non disponibile",
          category: booking.evento.categoria || "Non specificata",
        }));
    
        setBookedEvents(mappedBookedEvents);
      } catch (err) {
        console.error("Errore durante il fetch degli eventi prenotati:", err);
      }
    };
    

    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/events/get-location');
        if (!response.ok) {
          throw new Error('Errore durante il recupero delle location.');
        }
        const data = await response.json();
        setLocations(data.locations || []);
      } catch (err) {
        console.error('Errore durante il recupero delle location:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/events/get-categories');
        if (!response.ok) {
          throw new Error('Errore durante il recupero delle categorie.');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Errore durante il recupero delle categorie:', err);
      }
    };

    fetchEvents();
    fetchLocations();
    fetchCategories();
    fetchBookedEvents();
  }, []);

  const handleToggleBookedEvents = () => {
    setShowOnlyBooked(!showOnlyBooked);
  };

  const filteredEvents = events
  .filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || false;

    const matchesStartDate =
      !startDate || new Date(event.date) >= new Date(startDate);

    const matchesEndDate =
      !endDate || new Date(event.date) <= new Date(endDate);

    const matchesLocation =
      !selectedLocation || event.location === selectedLocation;

    const matchesCategory =
      !selectedCategory || event.category === selectedCategory;

    return (
      matchesSearch &&
      matchesStartDate &&
      matchesEndDate &&
      matchesLocation &&
      matchesCategory
    );
  })
  .filter((event) => {
    if (showOnlyBooked) {
      // Mostra solo gli eventi che si trovano in bookedEvents
      return bookedEvents.some((bookedEvent) => bookedEvent.id === event.id);
    }
    return true; // Mostra tutti gli eventi se il filtro non è attivo
  });






  const handleBookEvent = async (eventId: number) => {
    try {
      // Recupera userId da localStorage e lo converte in numero
      const userId = Number(localStorage.getItem("userId"));
  
      // Verifica che user_id sia un numero valido
      if (isNaN(userId)) {
        throw new Error("User ID non valido.");
      }
  
      const response = await fetch('/api/events/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          userId: userId,
          stato: "Confermata",
        }),
      });
  
      if (!response.ok) {
        // Analizza la risposta del server per ottenere dettagli sull'errore
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante la prenotazione dell\'evento.');
      }
  
      // Se la chiamata va a buon fine
      toast.success('Evento prenotato con successo!');
      setSelectedEvent(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Errore durante la prenotazione:', err.message);
        toast.error(err.message);
      } else {
        console.error('Errore sconosciuto:', err);
        toast.error('Errore sconosciuto durante la prenotazione. Riprova più tardi.');
      }
    }
  };
  const handleCancelEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <>
  <Toaster position="top-right" reverseOrder={false} />
  <Navbar />
  <div className="container mx-auto px-6 py-8">
    <h1 className="text-3xl font-bold mb-6">Eventi</h1>

    {loading && <p>Caricamento eventi...</p>}
    {error && <p className="text-red-500">Errore: {error}</p>}

    {!loading && !error && (
      <>
        <EventSearchBar onSearch={setSearchQuery} />

        {/* Sezione Filtri */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filtra Eventi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Inizio
              </label>
              <DatePicker
                selected={startDate ? new Date(startDate) : null}
                onChange={(date: Date | null) =>
                  setStartDate(date ? date.toISOString().slice(0, 10) : "")
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="Seleziona data inizio"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Fine
              </label>
              <DatePicker
                selected={endDate ? new Date(endDate) : null}
                onChange={(date: Date | null) =>
                  setEndDate(date ? date.toISOString().slice(0, 10) : "")
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="Seleziona data fine"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Luogo
              </label>
              <Select
                options={[
                  { value: "", label: "Tutti i luoghi" },
                  ...locations.map((loc) => ({ value: loc, label: loc })),
                ]}
                value={
                  selectedLocation
                    ? { value: selectedLocation, label: selectedLocation }
                    : { value: "", label: "Tutti i luoghi" }
                }
                onChange={(selectedOption) =>
                  setSelectedLocation(selectedOption?.value || "")
                }
                placeholder="Seleziona un luogo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <Select
                options={[
                  { value: "", label: "Tutte le categorie" },
                  ...categories.map((cat) => ({ value: cat, label: cat })),
                ]}
                value={
                  selectedCategory
                    ? { value: selectedCategory, label: selectedCategory }
                    : { value: "", label: "Tutte le categorie" }
                }
                onChange={(selectedOption) =>
                  setSelectedCategory(selectedOption?.value || "")
                }
                placeholder="Seleziona una categoria"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between space-x-4">
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setSelectedLocation("");
                setSelectedCategory("");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Resetta Filtri
            </button>

            {/* Bottone per mostrare gli eventi prenotati */}
            <button
              onClick={() => setShowOnlyBooked(!showOnlyBooked)}
              className={`px-4 py-2 rounded-lg ${
                showOnlyBooked
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {showOnlyBooked
                ? "Mostra Tutti gli Eventi"
                : "Mostra Eventi Prenotati"}
            </button>
          </div>
        </div>

        {/* Lista degli eventi */}
        <EventList
  events={filteredEvents} // Eventi filtrati
  bookedEvents={bookedEvents.map((event) => event.id)} // IDs degli eventi prenotati
  onEventClick={(event) =>
    setSelectedEvent({
      ...event,
      description: event.description || "Descrizione non disponibile",
    })
  }
/>



        {/* Modal Dettagli Evento */}
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onBook={handleBookEvent}
            onCancel={handleCancelEvent}
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
