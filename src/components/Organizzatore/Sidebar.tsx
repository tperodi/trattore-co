// Sidebar.tsx
"use client";

import React, { useState } from "react";
import { FiCalendar, FiPlus, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/organizzazione/dashboard",
      label: "Dashboard",
      icon: <FiCalendar className="mr-3" />,
    },
    {
      href: "/organizzazione/crea-evento",
      label: "Crea Evento",
      icon: <FiPlus className="mr-3" />,
    },
  ];

  return (
    <div className="relative flex">
      {/* Hamburger Icon */}
      <button
        className="fixed top-3 left-4 z-30 lg:hidden p-2 text-black rounded-full "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 top-0 left-0 h-full bg-green-600 text-white flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-20 border-b border-green-500">
        <Link href={"/"}><h1 className="text-2xl font-bold">EventiPrenota</h1></Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  pathname === item.href
                    ? "bg-green-700"
                    : "hover:bg-green-500"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex items-center w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;