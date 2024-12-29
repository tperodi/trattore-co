import React from "react";
import Sidebar from "@/components/Organizzatore/Sidebar";
import Navbar from "@/components/Organizzatore/Navbar";
import CreaCorso from "@/components/Organizzatore/CreaEvento";

const CreateEventPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <CreaCorso />
      </div>
    </div>
  );
};

export default CreateEventPage;
