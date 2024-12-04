import React from 'react';

import Register from '@/components/Register/RegisterPage';
import Navbar from '@/components/LandingPage/Navbar';
import Footer from '@/components/LandingPage/Footer'
const RegisterPage: React.FC = () => {
  return (
    <>
    {/* Form */}
    <Navbar/>
    <Register />
    <Footer />
    </>
 
  );
};

export default RegisterPage;
