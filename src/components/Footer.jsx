import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background py-16 border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/assets/images/logo.png" 
              alt="Osada Dzianisz N°54" 
              className="h-40 w-auto mb-6 mx-auto md:mx-0 opacity-90 logo-filter transform scale-150 origin-center md:origin-left object-contain" 
            />
            <p className="text-gray-600 text-sm font-light leading-loose max-w-sm mx-auto md:mx-0">
              ul. Kurierów Tatrzańskich 47<br />
              34-514 Dzianisz
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-accent font-medium"><span className="text-foreground mr-2">📱</span>+48 503 142 398</p>
              <p className="text-accent font-medium"><span className="text-foreground mr-2">✉</span>Aga75karol@op.pl</p>
              <p className="text-accent font-medium"><span className="text-foreground mr-2">✉</span>domkidzianisz@wp.pl</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-serif mb-6 text-foreground">Na skróty</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-accent transition-colors">Strona Główna</Link></li>
              <li><Link to="/domki" className="hover:text-accent transition-colors">Domki Wakacyjne</Link></li>
              <li><Link to="/o-nas" className="hover:text-accent transition-colors">O nas</Link></li>
              <li><Link to="/galeria" className="hover:text-accent transition-colors">Galeria</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-serif mb-6 text-foreground">Informacje</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/atrakcje" className="hover:text-accent transition-colors">Atrakcje</Link></li>
              <li><Link to="/regulamin" className="hover:text-accent transition-colors">Regulamin</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/kontakt" className="hover:text-accent transition-colors">Kontakt</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
