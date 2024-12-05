"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

type FormData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "Partecipante", // Ruolo predefinito
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore nella registrazione");
      }

      setSuccessMessage("Registrazione avvenuta con successo! Benvenuto!");
      setFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Errore sconosciuto");
      }
    }
  };

  return (
    <div>
      {error && (
        <p className="text-red-500 font-semibold text-center">{error}</p>
      )}
      {successMessage && (
        <p className="text-green-500 font-semibold text-center">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Username"
          id="username"
          name="username"
          type="text"
          placeholder="Inserisci il tuo nome utente"
          value={formData.username}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Crea una password sicura"
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          label="Nome"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Inserisci il tuo nome"
          value={formData.firstName}
          onChange={handleChange}
        />
        <FormInput
          label="Cognome"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Inserisci il tuo cognome"
          value={formData.lastName}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Inserisci il tuo indirizzo email"
          value={formData.email}
          onChange={handleChange}
        />
        <SubmitButton label="Registrati" />
      </form>
    </div>
  );
};

export default RegisterForm;
