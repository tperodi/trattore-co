import React from "react";

interface EventFilterProps {
  onCategoryChange: (category: string) => void;
  onDateChange: (date: string) => void;
  onLocationChange: (location: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({
  onCategoryChange,
  onDateChange,
  onLocationChange,
}) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtra Eventi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          <option value="Musica">Musica</option>
          <option value="Cinema">Cinema</option>
          <option value="Arte">Arte</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => onDateChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Luogo..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EventFilter;
