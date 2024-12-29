"use client";

import React from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
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
    <div className="w-64 bg-green-600 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-green-500">
        <h1 className="text-2xl font-bold">Organizzatore</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.href}
              className={`flex items-center p-2 rounded cursor-pointer ${
                pathname === item.href ? "bg-green-700" : "hover:bg-green-500"
              }`}
            >
              <Link href={item.href} className="flex items-center w-full">
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
