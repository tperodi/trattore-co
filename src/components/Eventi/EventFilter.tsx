import React from 'react';

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
    <div className="flex space-x-4 mb-6">
      <select
        className="px-4 py-2 border rounded-lg"
        onChange={handleCategoryChange} // Gestore evento
      >
        <option value="">Tutte le categorie</option>
        <option value="Musica">Musica</option>
        <option value="Cinema">Cinema</option>
        <option value="Arte">Arte</option>
      </select>
      <input
        type="date"
        className="px-4 py-2 border rounded-lg"
        placeholder="Seleziona una data"
        onChange={handleDateChange} // Gestore evento
      />
    </div>
  );
};

export default EventFilter;
