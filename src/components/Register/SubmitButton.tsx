import React from 'react';

// Definizione dell'interfaccia per le proprietà
interface SubmitButtonProps {
    label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
    return (
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {label}
        </button>
    );
};

export default SubmitButton;
