import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import { format, isAfter, isBefore } from 'date-fns';

const SearchBar = () => {
  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  
  const [activeField, setActiveField] = useState(null); // 'checkIn' or 'checkOut'
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateForDisplay = (date) => {
    if (!date) return { day: '', month: '', weekday: '' };
    const day = date.getDate();
    const month = date.toLocaleString('pl-PL', { month: 'short' }).replace('.', '');
    const weekday = date.toLocaleString('pl-PL', { weekday: 'long' });
    
    return { day, month, weekday };
  };

  const checkInDisplay = formatDateForDisplay(checkIn);
  const checkOutDisplay = formatDateForDisplay(checkOut);

  const handleSearchClick = (e) => {
    e.preventDefault();
    const startStr = format(checkIn, 'yyyy-MM-dd');
    const endStr = format(checkOut, 'yyyy-MM-dd');
    navigate(`/rezerwacja?start=${startStr}&end=${endStr}&guests=2`);
  };

  const handleDateSelect = (date) => {
    if (activeField === 'checkIn') {
      setCheckIn(date);
      if (isAfter(date, checkOut) || date.getTime() === checkOut.getTime()) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay);
      }
      setActiveField('checkOut');
    } else if (activeField === 'checkOut') {
      if (isBefore(date, checkIn) || date.getTime() === checkIn.getTime()) {
        setCheckIn(date);
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay);
      } else {
        setCheckOut(date);
      }
      setActiveField(null); // Close after selecting checkout
    }
  };

  return (
    <div ref={containerRef} className="bg-white max-w-4xl mx-auto flex flex-col md:flex-row shadow-2xl relative z-20">
      
      {/* Check In */}
      <div 
        onClick={() => setActiveField('checkIn')}
        className={`flex-1 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100 relative hover:bg-gray-50 transition-colors cursor-pointer group ${activeField === 'checkIn' ? 'bg-gray-50' : ''}`}
      >
        <div className="flex items-center space-x-3 pointer-events-none">
          <span className="text-4xl font-serif text-foreground group-hover:text-accent transition-colors">{checkInDisplay.day}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground capitalize">{checkInDisplay.month}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{checkInDisplay.weekday}</span>
          </div>
        </div>
        
        {/* Check In Calendar Popup */}
        {activeField === 'checkIn' && (
          <div className="absolute top-[100%] left-0 mt-2 z-50">
            <Calendar 
              selectedDates={[checkIn]}
              blockedDates={[]} // Don't show blocks in search
              onChange={handleDateSelect}
            />
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center justify-center px-6 text-gray-300">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

      {/* Check Out */}
      <div 
        onClick={() => setActiveField('checkOut')}
        className={`flex-1 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100 relative hover:bg-gray-50 transition-colors cursor-pointer group ${activeField === 'checkOut' ? 'bg-gray-50' : ''}`}
      >
        <div className="flex items-center space-x-3 pointer-events-none">
          <span className="text-4xl font-serif text-foreground group-hover:text-accent transition-colors">{checkOutDisplay.day}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground capitalize">{checkOutDisplay.month}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{checkOutDisplay.weekday}</span>
          </div>
        </div>

        {/* Check Out Calendar Popup */}
        {activeField === 'checkOut' && (
          <div className="absolute top-[100%] left-0 mt-2 z-50">
            <Calendar 
              selectedDates={[checkOut]}
              blockedDates={[]} // Don't show blocks in search
              onChange={handleDateSelect}
            />
          </div>
        )}
      </div>

      {/* CTA Button */}
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
