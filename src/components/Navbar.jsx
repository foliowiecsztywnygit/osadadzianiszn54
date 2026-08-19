import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Domki', path: '/domki' },
    { name: 'O nas', path: '/o-nas' },
    { name: 'Galeria', path: '/galeria' },
    { name: 'Atrakcje', path: '/atrakcje' },
    { name: 'Regulamin', path: '/regulamin' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-3' : 'bg-gradient-to-b from-black/70 to-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/assets/images/logo.png" 
              alt="Osada Dzianisz N°54" 
              className="h-28 md:h-36 w-auto object-contain transform scale-150 origin-left logo-filter" 
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${location.pathname === link.path ? 'text-accent' : 'text-white hover:text-accent'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/domki" 
              className="border border-white/60 text-white px-8 py-2.5 text-xs font-semibold tracking-widest hover:border-accent hover:text-accent transition-colors duration-300"
            >
              REZERWUJ
            </Link>
          </div>

          {/* Mobile menu (simplified) */}
          <div className="md:hidden flex items-center">
            <button className="text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
