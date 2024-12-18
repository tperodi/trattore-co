import React from "react";

interface EventSearchBarProps {
  onSearch: (query: string) => void;
}

const EventSearchBar: React.FC<EventSearchBarProps> = ({ onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Ricerca Eventi</h1>
      <input
        type="text"
        placeholder="Cerca eventi..."
        className="w-full px-4 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default EventSearchBar;
