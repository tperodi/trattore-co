"use client"
import React, { useState } from 'react';
import EventSearchBar from '../../components/Eventi/EventSearchBar';
import EventFilter from '../../components/Eventi/EventFilter';
import EventList from '../../components/Eventi/EventList';
import EventDetailModal from '../../components/Eventi/EventDetailModal';
import Navbar from '@/components/LandingPage/Navbar';
import Footer from '@/components/LandingPage/Footer';


interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

const Page: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Stato per la ricerca
  const [filterCategory, setFilterCategory] = useState<string>(''); // Stato per il filtro categoria
  const [filterDate, setFilterDate] = useState<string>(''); // Stato per il filtro data

  // Simulazione dati eventi
  const events: EventData[] = [
    {
      id: 1,
      title: 'Concerto di Musica Classica',
      date: '2024-12-10',
      location: 'Teatro Verdi, Milano',
      category: 'Musica',
      description: 'Un concerto imperdibile di musica classica.',
    },
    {
      id: 2,
      title: 'Festival del Cinema',
      date: '2024-12-15',
      location: 'Cinema Centrale, Roma',
      category: 'Cinema',
      description: 'Proiezione di film indipendenti.',
    },
    {
      id: 3,
      title: 'Mostra di Arte Moderna',
      date: '2024-11-20',
      location: 'Galleria d’Arte, Firenze',
      category: 'Arte',
      description: 'Un’esposizione esclusiva di arte moderna.',
    },
  ];

  // Filtraggio dinamico degli eventi
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === '' || event.category === filterCategory;
    const matchesDate = filterDate === '' || event.date === filterDate;

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Eventi</h1>
      {/* Barra di ricerca */}
      <EventSearchBar onSearch={setSearchQuery} />

      {/* Filtri */}
      <EventFilter
        onCategoryChange={setFilterCategory}
        onDateChange={setFilterDate}
      />

      {/* Lista degli eventi */}
      <EventList events={filteredEvents} onEventClick={setSelectedEvent} />

      {/* Modale per i dettagli dell'evento */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
    <Footer/>

    </>
    
  );
};

export default Page;
