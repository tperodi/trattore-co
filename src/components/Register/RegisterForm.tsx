"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Tipo per i dati del modulo
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

  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Funzione per verificare la sicurezza della password
  const checkPasswordStrength = (password: string): string => {
    if (password.length < 6) {
      return "La password è troppo corta.";
    }
    if (!/[A-Z]/.test(password)) {
      return "La password deve contenere almeno una lettera maiuscola.";
    }
    if (!/[a-z]/.test(password)) {
      return "La password deve contenere almeno una lettera minuscola.";
    }
    if (!/[0-9]/.test(password)) {
      return "La password deve contenere almeno un numero.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "La password deve contenere almeno un carattere speciale.";
    }
    return "Password sicura.";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Aggiorna la forza della password
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/auth/register", {
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
        <FormInput
          label="Username"
          id="username"
          name="username"
          type="text"
          placeholder="Inserisci il tuo nome utente"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="relative">
          <FormInput
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Crea una password sicura"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-11 transform -translate-y-2/6 right-0 px-3 flex items-center focus:outline-none"
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>
        {passwordStrength && (
          <p
            className={`text-sm mt-1 ${
              passwordStrength === "Password sicura."
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {passwordStrength}
          </p>
        )}
        <SubmitButton label="Registrati" />
      </form>
    </div>
  );
};

export default RegisterForm;
