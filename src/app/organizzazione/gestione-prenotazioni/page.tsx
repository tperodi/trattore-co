import React from "react";
import Sidebar from "@/components/Organizzatore/Sidebar";
import Navbar from "@/components/Organizzatore/Navbar";
import GestionePrenotazioni from "@/components/Organizzatore/GestionePrenotazioni";

const GestionePrenotazioniPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <GestionePrenotazioni />
      </div>
    </div>
  );
};

export default GestionePrenotazioniPage;
