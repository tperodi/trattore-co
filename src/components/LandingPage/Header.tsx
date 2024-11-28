import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header
      id="header"
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        className="text-center text-white z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Benvenuto su EventiPrenota
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          La tua piattaforma di fiducia per prenotare eventi indimenticabili.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg">
          <a href="/eventi">Prenota Ora</a>
        </button>
      </motion.div>
    </header>
  );
};

export default Header;
