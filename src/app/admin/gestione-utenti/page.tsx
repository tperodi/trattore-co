// App con Sidebar e Navbar
import React from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Navbar from "@/components/Admin/Navbar";
import GestioneUtenti from "@/components/Admin/GestioneUtenti";

const GestioneUtentiPage = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6 flex-1 overflow-y-auto">
                    <GestioneUtenti />
                </main>
            </div>
        </div>
    );
};

export default GestioneUtentiPage;
