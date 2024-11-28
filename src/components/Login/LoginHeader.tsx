import React from 'react';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Accedi al tuo account</h1>
      <p className="text-gray-600">Inserisci le tue credenziali per continuare</p>
    </div>
  );
};

export default LoginHeader;
