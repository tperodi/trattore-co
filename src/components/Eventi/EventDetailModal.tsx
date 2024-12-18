import React from 'react';

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
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onBook }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Luogo:</strong> {event.location}</p>
        <p><strong>Categoria:</strong> {event.category}</p>
        <p className="my-4">{event.description}</p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Chiudi
          </button>
          <button 
            onClick={() => onBook(event.id)} 
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
          >
            Prenota Evento
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
