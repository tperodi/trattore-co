import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Ottieni l'anno corrente

  return (
    <footer id="footer" className="py-8 bg-gray-800 text-white text-center">
      {/* Sezione Social Media */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">Seguici sui social media:</p>
        <div className="flex justify-center space-x-6 text-2xl">
          <a
            href="https://www.facebook.com"
            className="hover:text-blue-500"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.instagram.com"
            className="hover:text-pink-500"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.twitter.com"
            className="hover:text-blue-300"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>

      {/* Sezione Link (Privacy Policy e Cookie) */}
      <div className="mb-6">
        <ul className="flex justify-center space-x-4 text-sm">
          <li>
            <a
              href="/privacy-policy"
              className="hover:text-gray-400"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/cookie-policy"
              className="hover:text-gray-400"
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <p className="text-sm">
        &copy; {currentYear} EventiPrenota. Tutti i diritti riservati.
      </p>
    </footer>
  );
};

export default Footer;
