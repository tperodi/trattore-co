"use client";

import React, { useState } from "react";

const CreaEvento: React.FC = () => {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [data, setData] = useState("");
  const [orario, setOrario] = useState("");
  const [luogo, setLuogo] = useState("");
  const [capienza, setCapienza] = useState<number | "">("");
  const [stato, setStato] = useState("Attivo");
  const [categoria, setCategoria] = useState("");
  const [categoriaSuggerimenti, setCategoriaSuggerimenti] = useState<string[]>(["Workshop", "Conferenza", "Seminario", "Altro"]);

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoria(value);

    // Filtra i suggerimenti in base al valore attuale
    const suggerimenti = ["Workshop", "Conferenza", "Seminario", "Altro"].filter((cat) =>
      cat.toLowerCase().includes(value.toLowerCase())
    );
    setCategoriaSuggerimenti(suggerimenti);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuovoEvento = {
      titolo,
      descrizione,
      data,
      orario,
      luogo,
      capienza: Number(capienza), // Assicuriamo che sia un numero
      stato,
      categoria,
    };

    try {
      const response = await fetch('/api/events/management-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovoEvento),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Errore: ${error.error}`);
        return;
      }

      const result = await response.json();
      alert('Corso creato con successo!');
      console.log(result);
    } catch (err) {
      console.error('Errore durante la creazione del corso:', err);
      alert('Errore durante la creazione del corso.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crea un Nuovo Evento</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="titolo" className="block text-sm font-medium text-gray-700">
              Titolo del Evento
            </label>
            <input
              type="text"
              id="titolo"
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="orario" className="block text-sm font-medium text-gray-700">
              Orario
            </label>
            <input
              type="time"
              id="orario"
              value={orario}
              onChange={(e) => setOrario(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="luogo" className="block text-sm font-medium text-gray-700">
              Luogo
            </label>
            <input
              type="text"
              id="luogo"
              value={luogo}
              onChange={(e) => setLuogo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700">
            Descrizione
          </label>
          <textarea
            id="descrizione"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="capienza" className="block text-sm font-medium text-gray-700">
              Capienza
            </label>
            <input
              type="number"
              id="capienza"
              value={capienza}
              onChange={(e) => setCapienza(e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="stato" className="block text-sm font-medium text-gray-700">
              Stato
            </label>
            <select
              id="stato"
              value={stato}
              onChange={(e) => setStato(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="Attivo">Attivo</option>
              <option value="Non Attivo">Non Attivo</option>
              <option value="Cancellato">Cancellato</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={handleCategoriaChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            list="categoria-suggestions"
            required
          />
          <datalist id="categoria-suggestions">
            {categoriaSuggerimenti.map((suggerimento, index) => (
              <option key={index} value={suggerimento} />
            ))}
          </datalist>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Crea Corso
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreaEvento;
