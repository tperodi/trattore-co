import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; // Icone per il menu e la persona stilizzata

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">EventiPrenota</div>

        {/* Desktop Menu - Al centro */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              to="header"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
            >
              Home
            </Link>
          </li>
          
          <li>
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
            >
              Perché Noi
            </Link>
          </li>
          <li>
            <Link
              to="testimonials"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
            >
              Testimonial
            </Link>
          </li>
          
        </ul>

        {/* Icona di Login - Destra */}
        <div className="hidden md:block">
          <a
            href="/login"
            className="text-gray-700 hover:text-blue-500 flex items-center"
            title="Login"
          >
            <FaUserCircle className="text-2xl" />
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white w-full flex flex-col items-center py-6 space-y-4 shadow-lg">
          <li>
            <Link
              to="header"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="footer"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Eventi
            </Link>
          </li>
          <li>
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Perché Noi
            </Link>
          </li>
          <li>
            <Link
              to="testimonials"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Testimonial
            </Link>
          </li>
          
          {/* Icona di Login per Mobile */}
          <li>
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-500 flex items-center"
              title="Login"
            >
              <FaUserCircle className="text-2xl" />
              <span className="ml-2">Login</span>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
