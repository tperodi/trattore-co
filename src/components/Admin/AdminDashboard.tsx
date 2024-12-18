"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
}

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentPage === "Dashboard") {
      fetchEvents();
    }
  }, [currentPage]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/events/with-more-than-10-users");
      if (!response.ok) {
        throw new Error("Non ci sono eventi con più di 10 iscritti!");
      }
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Usa il messaggio dell'errore
      } else {
        setError("Errore sconosciuto.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard Overview</h1>
            {loading ? (
              <p>Caricamento eventi...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <p className="text-sm text-gray-500">{event.category}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "Users":
        return <h1 className="text-2xl font-bold">Users Management</h1>;
      case "Settings":
        return <h1 className="text-2xl font-bold">Settings</h1>;
      default:
        return <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-y-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
