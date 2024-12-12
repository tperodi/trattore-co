import React from 'react';

interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

interface EventDetailModalProps {
  event: EventData;
  onClose: () => void;
  onBook: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onBook }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{event.title}</h2>
        <p className="text-gray-600 mb-2 font-medium">{event.date}</p>
        <p className="text-gray-500 mb-2 italic">{event.location}</p>
        <p className="text-sm text-gray-400 mb-4">{event.category}</p>
        <p className="text-gray-700">{event.description}</p>
        <div className="mt-6 flex space-x-4">
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Chiudi
          </button>
          <button
            onClick={onBook}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            Prenota
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
