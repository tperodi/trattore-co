import React from "react";

interface EventFilterProps {
  onCategoryChange: (category: string) => void;
  onDateChange: (date: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({
  onCategoryChange,
  onDateChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value); // Aggiorna lo stato del filtro categoria
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value); // Aggiorna lo stato del filtro data
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Ricerca eventi</h2>
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleCategoryChange}
        >
          <option value="">Tutte le categorie</option>
          <option value="Musica">Musica</option>
          <option value="Cinema">Cinema</option>
          <option value="Arte">Arte</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default EventFilter;
