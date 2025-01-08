"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(""); // Stato per il ruolo dell'utente

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        console.log("Dati estratti dal cookie:", user); // Debug: logga l'oggetto estratto dal cookie
        setUsername(user.username || "");
        setRole(user.role || ""); // Imposta il ruolo
      } catch (error) {
        console.error("Errore nel parsing del cookie user:", error); // Debug: logga l'errore
      }
    } else {
      console.log("Nessun cookie trovato con il nome 'user'."); // Debug: nessun cookie trovato
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginClick = () => {

    if (username && role) {
      if(role=="Organizzatore"){
        window.location.href= '/organizzazione/dashboard'
      }
      else if(role=="Partecipante"){
        window.location.href= '/eventi'
      }
      else if(role=="Admin"){
        window.location.href = '/admin/dashboard'
      }
      console.log("Reindirizzamento alla dashboard:", `/${role}/dashboard`); // Debug
    } else {
      console.log("Reindirizzamento alla pagina di login."); // Debug
      window.location.href = "/auth/login";
    }
  };
  const handleLogoutClick = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("Logout effettuato con successo.");
        // Rimuovi il cookie o altre informazioni dal client
        Cookies.remove("user");
        setUsername("");
        setRole("");
        window.location.href = "/"; // Reindirizza alla homepage o alla pagina desiderata
      } else {
        console.error("Errore durante il logout:", await response.text());
      }
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };
  
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="text-gray-700 hover:text-blue-500">
            EventiPrenota
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="cursor-pointer text-gray-700 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/#features" className="cursor-pointer text-gray-700 hover:text-blue-500">
              Perché Noi
            </Link>
          </li>
          <li>
            <Link
              href="/#testimonials"
              className="cursor-pointer text-gray-700 hover:text-blue-500"
            >
              Testimonial
            </Link>
          </li>
        </ul>

        {/* Login or Profile */}
        <div className="hidden md:flex items-center space-x-2">
  {username && role === "Partecipante" ? (
    <button
      onClick={handleLogoutClick}
      className="text-gray-700 hover:text-red-500 flex items-center"
      title="Logout"
    >
      <FaUserCircle className="text-2xl" />
      <span className="ml-2">Logout</span>
    </button>
  ) : (
    <button
      onClick={handleLoginClick}
      className="text-gray-700 hover:text-blue-500 flex items-center"
      title={username ? "Dashboard" : "Login"}
    >
      <FaUserCircle className="text-2xl" />
      <span className="ml-2">{username ? "Dashboard" : "Login"}</span>
    </button>
  )}
</div>


        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white w-full flex flex-col items-center py-6 space-y-4 shadow-lg">
          <li>
            <Link
              href="/"
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#features"
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Perché Noi
            </Link>
          </li>
          <li>
            <Link
              href="/#testimonials"
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Testimonial
            </Link>
          </li>
          <li>
      {username && role === "Partecipante" ? (
        <button
          onClick={() => {
            handleLogoutClick();
            toggleMenu();
          }}
          className="cursor-pointer text-gray-700 hover:text-red-500 flex items-center"
        >
          <FaUserCircle className="text-2xl" />
          <span className="ml-2">Logout</span>
        </button>
      ) : (
        <button
          onClick={() => {
            handleLoginClick();
            toggleMenu();
          }}
          className="cursor-pointer text-gray-700 hover:text-blue-500 flex items-center"
        >
          <FaUserCircle className="text-2xl" />
          <span className="ml-2">{username ? "Dashboard" : "Login"}</span>
        </button>
      )}
    </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
