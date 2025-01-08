import React from "react";

interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
}

interface EventListProps {
  events: EventData[];
  onEventClick: (event: EventData) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  if (events.length === 0) {
    return <p className="text-center text-gray-500">Nessun evento trovato.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer bg-white"
          onClick={() => onEventClick(event)}
        >
          <h3 className="text-xl font-bold mb-2 text-blue-600">{event.title}</h3>
          <p className="text-gray-600">{event.date}</p>
          <p className="text-gray-500">{event.location}</p>
          <p className="text-sm text-gray-400">{event.category}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
