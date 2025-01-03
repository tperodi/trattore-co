// App con Sidebar e Navbar
import React from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Navbar from "@/components/Admin/Navbar";
import AdminDashboard from "@/components/Admin/AdminDashboard";

const DashboardPage = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6 flex-1 overflow-y-auto">
                    <AdminDashboard />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
