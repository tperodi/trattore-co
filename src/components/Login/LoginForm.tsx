"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Hook per il redirect

const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState(""); // Email o Nome Utente
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter(); // Hook per il redirect

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore nel login");
      }

      const data = await response.json();

      // Mostra il messaggio di successo
      setSuccessMessage(`Benvenuto, ${data.user.username}!`);

      localStorage.setItem("userId",data.user.id);

      // Reindirizza in base al ruolo
      switch (data.user.role) {
        case "Admin":
          router.push("/admin/dashboard");
          break;
        case "Organizzatore":
          router.push("/organizzazione/dashboard");
          break;
        case "Partecipante":
          router.push("/eventi");
          break;
        default:
          throw new Error("Ruolo non riconosciuto.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Errore sconosciuto.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      {error && (
        <p className="text-red-500 font-semibold text-center">{error}</p>
      )}
      {successMessage && (
        <p className="text-green-500 font-semibold text-center">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Identifier (Nome Utente o Email) */}
        <div className="mb-4">
          <label htmlFor="identifier" className="block text-gray-700 mb-2">
            Nome Utente o Email
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserisci nome utente o email"
            required
          />
        </div>

        {/* Campo Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserisci la tua password"
            required
          />
        </div>

        {/* Pulsante Login */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Accedi
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
