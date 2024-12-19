"use client";

import React, { useState } from "react";

const CreaCorso: React.FC = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [luogo, setLuogo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descrizione, setDescrizione] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nome,
      data,
      luogo,
      categoria,
      descrizione,
    });
    alert("Corso creato con successo!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Crea un Nuovo Corso</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome del Corso
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="luogo" className="block text-sm font-medium text-gray-700">
            Luogo
          </label>
          <input
            type="text"
            id="luogo"
            value={luogo}
            onChange={(e) => setLuogo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
            <option value="">Seleziona una Categoria</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Arte">Arte</option>
            <option value="Sport">Sport</option>
            <option value="Altro">Altro</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700">
            Descrizione
          </label>
          <textarea
            id="descrizione"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Crea Corso
        </button>
      </form>
    </div>
  );
};

export default CreaCorso;
