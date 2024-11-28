import React from 'react';

interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

interface EventListProps {
  events: EventData[];
  onEventClick: (event: EventData) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
          onClick={() => onEventClick(event)}
        >
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-gray-600">{event.date}</p>
          <p className="text-gray-500">{event.location}</p>
          <p className="text-sm text-gray-400">{event.category}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
