import React from "react";

interface EventSearchBarProps {
  onSearch: (query: string) => void;
}

const EventSearchBar: React.FC<EventSearchBarProps> = ({ onSearch }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Cerca eventi per titolo..."
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default EventSearchBar;
