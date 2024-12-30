import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
}

interface EventDetailModalProps {
  event: EventData | null;
  onClose: () => void;
  onBook: (eventId: number) => void;
  onCancel: (eventId: number) => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onBook,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!event) return null;

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID non trovato.");
        return;
      }

      const response = await fetch("/api/events/cancel-booking", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, eventId: event.id }),
      });

      if (!response.ok) {
        toast.error("Errore durante la cancellazione della prenotazione.");
        return;
      }

      toast.success("Prenotazione annullata con successo!");
      onCancel(event.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
  <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">{event.title}</h2>
    <div className="space-y-2">
      <p><strong>Data:</strong> {event.date}</p>
      <p><strong>Luogo:</strong> {event.location}</p>
      <p><strong>Categoria:</strong> {event.category}</p>
      <p className="my-4 text-gray-600">{event.description}</p>
    </div>
    <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full sm:w-auto"
        disabled={isLoading}
      >
        Chiudi
      </button>
      <button
        onClick={() => onBook(event.id)}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 w-full sm:w-auto"
        disabled={isLoading}
      >
        Prenota Evento
      </button>
      <button
        onClick={handleCancel}
        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 w-full sm:w-auto"
        disabled={isLoading}
      >
        Annulla Prenotazione
      </button>
    </div>
  </div>
</div>
  );
};

export default EventDetailModal;
