"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import GestioneUtenti from "./GestioneUtenti";
import GestionePermessi from "./GestionePermessi";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registra gli elementi necessari per i grafici
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "gestione-utenti":
        return <GestioneUtenti />;
      case "gestione-permessi":
        return <GestionePermessi />;
      case "dashboard":
      default:
        return (
          <>
            <h1 className="text-2xl font-bold mb-4">Organizzatore Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Iscrizioni ai Corsi</h2>
                <Pie
                  data={{
                    labels: ["Corso A", "Corso B", "Corso C", "Corso D"],
                    datasets: [
                      {
                        label: "Iscritti",
                        data: [120, 90, 60, 30],
                        backgroundColor: [
                          "#4CAF50",
                          "#FF9800",
                          "#F44336",
                          "#2196F3",
                        ],
                        borderColor: [
                          "#4CAF50",
                          "#FF9800",
                          "#F44336",
                          "#2196F3",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Confronto Partecipanti</h2>
                <Pie
                  data={{
                    labels: ["Partecipanti Attivi", "Partecipanti Non Attivi"],
                    datasets: [
                      {
                        label: "Partecipanti",
                        data: [200, 50],
                        backgroundColor: ["#4CAF50", "#F44336"],
                        borderColor: ["#4CAF50", "#F44336"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
