import React from 'react';

const LoginFooter: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600">
        Non hai un account?{' '}
        <a
          href="/register"
          className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrati
        </a>
      </p>
      <p className="text-gray-600 mt-2">
        <a
          href="/forgot-password"
          className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Password dimenticata?
        </a>
      </p>
    </div>
  );
};

export default LoginFooter;
