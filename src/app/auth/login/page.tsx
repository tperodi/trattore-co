import React from 'react';
import LoginHeader from '@/components/Login/LoginHeader'
import LoginForm from '@/components/Login//LoginForm';
import LoginFooter from '@/components/Login//LoginFooter';
import Navbar from '@/components/LandingPage/Navbar';
import Footer from '@/components/LandingPage/Footer'

const LoginPage: React.FC = () => {
  return (
    <>
    
    <Navbar/>
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
    <Footer/>
    </>
       
  );
};

export default LoginPage;
