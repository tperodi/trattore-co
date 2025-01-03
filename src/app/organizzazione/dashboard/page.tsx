import React from "react";
import Sidebar from "@/components/Organizzatore/Sidebar";
import Navbar from "@/components/Organizzatore/Navbar";
import Dashboard from "@/components/Organizzatore/Dashboard";

const EventManagementPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default EventManagementPage;
