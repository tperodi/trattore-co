import React from "react";
import { FiBell, FiLogOut } from "react-icons/fi";

const Navbar: React.FC = () => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold">Benvenuto, Organizzatore</h1>
      </div>
      <div className="flex items-center space-x-4">
        <FiBell className="w-6 h-6 text-gray-600" />
        <FiLogOut className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
};

export default Navbar;
