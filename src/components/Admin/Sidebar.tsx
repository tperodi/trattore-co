"use client";

import React from "react";
import { FiCalendar, FiUsers, FiKey } from "react-icons/fi";

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  return (
    <div className="w-64 bg-green-600 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-green-500">
        <h1 className="text-2xl font-bold">Organizzatore</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              currentView === "dashboard" ? "bg-green-500" : "hover:bg-green-500"
            }`}
            onClick={() => onNavigate("dashboard")}
          >
            <FiCalendar className="mr-3" /> I miei Eventi
          </li>
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              currentView === "gestione-utenti" ? "bg-green-500" : "hover:bg-green-500"
            }`}
            onClick={() => onNavigate("gestione-utenti")}
          >
            <FiUsers className="mr-3" /> Gestione Utenti
          </li>
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              currentView === "gestione-permessi" ? "bg-green-500" : "hover:bg-green-500"
            }`}
            onClick={() => onNavigate("gestione-permessi")}
          >
            <FiKey className="mr-3" /> Gestione Permessi
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
