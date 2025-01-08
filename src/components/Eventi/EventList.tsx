import React, { useState } from "react";

interface EventData {
  description: string;
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
}

interface EventListProps {
  events: EventData[];
  bookedEvents?: number[]; // IDs degli eventi prenotati
  onEventClick: (event: EventData) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  bookedEvents = [],
  onEventClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (events.length === 0) {
    return <p className="text-center text-gray-500">Nessun evento trovato.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((event) => {
          const isBooked = bookedEvents.includes(event.id);

          return (
            <div
              key={event.id}
              className={`p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer bg-white ${
                isBooked ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => onEventClick(event)}
            >
              <h3 className="text-xl font-bold mb-2 text-blue-600">
                {event.title}
              </h3>
              <p className="text-gray-600">
                <strong>Data:</strong> {event.date}
              </p>
              <p className="text-gray-500">
                <strong>Luogo:</strong> {event.location}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Categoria:</strong> {event.category || "Non specificata"}
              </p>
              {isBooked && (
                <p className="mt-2 text-sm text-green-500 font-semibold">
                  Prenotato
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Paginazione */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Precedente
        </button>

        <p className="text-sm">
          Pagina {currentPage} di {totalPages}
        </p>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default EventList;
