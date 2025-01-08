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
      className="border rounded-lg p-4 shadow hover:shadow-lg bg-white flex flex-col space-y-4 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold text-blue-600">{event.title}</h3>
      <p className="text-sm text-gray-600">{event.date}</p>
      <p className="text-sm text-gray-500">{event.location}</p>
      <p className="text-xs text-gray-400">{event.category}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
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
