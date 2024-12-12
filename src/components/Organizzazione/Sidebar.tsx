import React from "react";
import { FiCalendar, FiUsers, FiPlus } from "react-icons/fi";

const SidebarOrganizzatore: React.FC = () => {
  return (
    <div className="w-64 bg-green-600 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-green-500">
        <h1 className="text-2xl font-bold">Organizzatore</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li className="flex items-center p-2 hover:bg-green-500 rounded">
            <FiCalendar className="mr-3" /> I miei Eventi
          </li>
          <li className="flex items-center p-2 hover:bg-green-500 rounded">
            <FiUsers className="mr-3" /> Partecipanti
          </li>
          <li className="flex items-center p-2 hover:bg-green-500 rounded">
            <FiPlus className="mr-3" /> Crea Evento
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarOrganizzatore;