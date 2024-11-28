import React from 'react';

interface EventSearchBarProps {
  onSearch: (query: string) => void;
}

const EventSearchBar: React.FC<EventSearchBarProps> = ({ onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Aggiorna lo stato della ricerca
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Cerca eventi..."
        className="w-full px-4 py-2 border rounded-lg"
        onChange={handleSearchChange} // Gestore evento
      />
    </div>
  );
};

export default EventSearchBar;
