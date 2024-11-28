import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🎟️',
    title: 'Ampia Selezione',
    description: 'Accedi a una vasta gamma di eventi esclusivi.',
  },
  {
    icon: '🔒',
    title: 'Prenotazioni Sicure',
    description: 'Sistema di prenotazione semplice e sicuro.',
  },
  {
    icon: '💬',
    title: 'Supporto 24/7',
    description: 'Assistenza clienti sempre disponibile.',
  },
  {
    icon: '💰',
    title: 'Offerte Speciali',
    description: 'Sconti imperdibili su eventi selezionati.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">
        Perché scegliere noi
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {features.map((feature, index) => (
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg text-center"
            key={index}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
