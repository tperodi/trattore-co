import React from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
  onBook: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, onBook }) => {
  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer flex justify-between items-center bg-white"
      onClick={onClick}
    >
      <div>
        <h3 className="text-xl font-bold mb-2 text-blue-600">{event.title}</h3>
        <p className="text-gray-600">{event.date}</p>
        <p className="text-gray-500">{event.location}</p>
        <p className="text-sm text-gray-400">{event.category}</p>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          onBook();
        }}
      >
        Prenota
      </button>
    </div>
  );
};

export default EventCard;
