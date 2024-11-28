import React from 'react';

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
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600">{event.date}</p>
      <p className="text-gray-500">{event.location}</p>
      <p className="text-sm text-gray-400">{event.category}</p>
    </div>
  );
};

export default EventCard;
