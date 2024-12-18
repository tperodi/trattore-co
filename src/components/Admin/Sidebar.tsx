import React from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

interface SidebarProps {
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-blue-500">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li
            className="flex items-center p-2 hover:bg-blue-500 rounded cursor-pointer"
            onClick={() => setCurrentPage("Dashboard")}
          >
            <FiHome className="mr-3" /> Dashboard
          </li>
          <li
            className="flex items-center p-2 hover:bg-blue-500 rounded cursor-pointer"
            onClick={() => setCurrentPage("Users")}
          >
            <FiUsers className="mr-3" /> Users
          </li>
          <li
            className="flex items-center p-2 hover:bg-blue-500 rounded cursor-pointer"
            onClick={() => setCurrentPage("Settings")}
          >
            <FiSettings className="mr-3" /> Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
