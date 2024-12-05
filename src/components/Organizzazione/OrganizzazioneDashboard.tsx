import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const OrganizzatoreDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Organizzatore Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Example */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Eventi Creati</h2>
              <p className="text-3xl font-bold">15</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Partecipanti Totali</h2>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Eventi in Scadenza</h2>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>
          {/* Sezione Eventi */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Gestisci i tuoi eventi</h2>
            <div className="bg-white shadow rounded-lg p-4">
              <p>Puoi gestire gli eventi, aggiungerne di nuovi o aggiornare quelli esistenti.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Crea Nuovo Evento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizzatoreDashboard;
