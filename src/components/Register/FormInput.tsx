import React from 'react';
import { FormInputProps } from './type'; // Assicurati che il tipo sia importato correttamente

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder, // Aggiunto il supporto per il placeholder
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} // Assegna il valore del placeholder
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormInput;
