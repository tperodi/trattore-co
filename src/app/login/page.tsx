import React from 'react';
import LoginHeader from '@/components/Login/LoginHeader'
import LoginForm from '@/components/Login//LoginForm';
import LoginFooter from '@/components/Login//LoginFooter';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <LoginHeader />

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;
