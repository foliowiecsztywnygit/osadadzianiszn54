import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState(today.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(tomorrow.toISOString().split('T')[0]);
  const [href, setHref] = useState('');

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('pl-PL', { month: 'short' }).replace('.', '');
    const weekday = date.toLocaleString('pl-PL', { weekday: 'long' });
    
    return { day, month, weekday };
  };

  const checkInDisplay = formatDateForDisplay(checkIn);
  const checkOutDisplay = formatDateForDisplay(checkOut);

  // Funkcja przekierowująca do formularza z parametrami
  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate(`/kontakt?checkin=${checkIn}&checkout=${checkOut}`);
  };

  // Funkcje wywołujące systemowy kalendarz
  const handleCheckInClick = () => {
    if (checkInRef.current && checkInRef.current.showPicker) {
      checkInRef.current.showPicker();
    }
  };

  const handleCheckOutClick = () => {
    if (checkOutRef.current && checkOutRef.current.showPicker) {
      checkOutRef.current.showPicker();
    }
  };

  return (
    <div className="bg-white max-w-4xl mx-auto flex flex-col md:flex-row shadow-2xl relative z-20">
      
      {/* Check In */}
      <div 
        onClick={handleCheckInClick}
        className="flex-1 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100 relative hover:bg-gray-50 transition-colors cursor-pointer group overflow-hidden"
      >
        <input 
          type="date" 
          ref={checkInRef}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="absolute opacity-0 -z-10 w-1 h-1" 
        />
        <div className="flex items-center space-x-3 pointer-events-none">
          <span className="text-4xl font-serif text-foreground group-hover:text-accent transition-colors">{checkInDisplay.day}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground capitalize">{checkInDisplay.month}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{checkInDisplay.weekday}</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center px-6 text-gray-300">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

      {/* Check Out */}
      <div 
        onClick={handleCheckOutClick}
        className="flex-1 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100 relative hover:bg-gray-50 transition-colors cursor-pointer group overflow-hidden"
      >
        <input 
          type="date" 
          ref={checkOutRef}
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className="absolute opacity-0 -z-10 w-1 h-1" 
        />
        <div className="flex items-center space-x-3 pointer-events-none">
          <span className="text-4xl font-serif text-foreground group-hover:text-accent transition-colors">{checkOutDisplay.day}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground capitalize">{checkOutDisplay.month}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{checkOutDisplay.weekday}</span>
          </div>
        </div>
      </div>

      {/* CTA Button przenoszący do formularza */}
      <button 
        onClick={handleSearchClick}
        className="md:w-56 bg-accent text-white py-6 text-sm font-bold tracking-widest hover:bg-[#b88c45] transition-colors duration-300 flex items-center justify-center text-center focus:outline-none"
      >
        SZUKAJ
      </button>

    </div>
  );
};

export default SearchBar;
