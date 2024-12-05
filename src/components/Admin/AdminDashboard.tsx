import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminDashboard: React.FC = () => {
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
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Example */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Total Users</h2>
              <p className="text-3xl font-bold">1,024</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
              <p className="text-3xl font-bold">512</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Revenue</h2>
              <p className="text-3xl font-bold">$12,450</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Pending Issues</h2>
              <p className="text-3xl font-bold">7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
