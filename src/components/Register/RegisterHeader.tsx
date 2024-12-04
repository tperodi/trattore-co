import React from 'react';

const RegisterHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-blue-600">Benvenuto!</h1>
      <p className="text-gray-700">
        Completa il modulo sottostante per creare il tuo account personale.
      </p>
    </div>
  );
};

export default RegisterHeader;
