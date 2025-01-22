import React from 'react';
import RegisterForm from './RegisterForm';
import RegisterHeader from './RegisterHeader';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <RegisterHeader />
        <RegisterForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Hai già un account?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Accedi qui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
