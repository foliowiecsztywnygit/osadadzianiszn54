import React from 'react';
import SearchBar from './SearchBar';

const Hero = ({ title, subtitle, isHome = false }) => {
  return (
    <div className={`relative ${isHome ? 'h-[90vh]' : 'h-[60vh]'} bg-gray-900 w-full z-40`}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="/assets/video/hero-background.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/50"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg tracking-wide max-w-5xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-200 tracking-[0.2em] uppercase max-w-2xl font-medium drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 w-full px-4 transform translate-y-1/2 z-50">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
