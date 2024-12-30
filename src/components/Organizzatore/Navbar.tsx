"use client";

import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const fetchUsername = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUsername(userData.username || "Utente");
      } catch {
        setUsername("Utente");
      }
    }
  };

  useEffect(() => {
    fetchUsername();

    // Aggiunge un listener per monitorare i cambiamenti nel cookie
    const interval = setInterval(fetchUsername, 1000); // Ogni 1 secondo
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        Cookies.remove("user"); // Rimuove il cookie dell'utente
        router.push("/"); // Reindirizza alla pagina principale
      } else {
        console.error("Errore durante il logout.");
      }
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold">
          Benvenuto, {username ? username : "Organizzatore"}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <FiLogOut
          className="w-6 h-6 text-gray-600 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
