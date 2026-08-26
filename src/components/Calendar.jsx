import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore,
  startOfDay
} from 'date-fns';
import { pl } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ selectedDates, onChange, blockedDates = [], readOnly = false, allowAdminBlocks = false, publicStyles = false, monthsCount = 1, className = '' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const onDateClick = (day) => {
    if (readOnly) return;
    
    if (!allowAdminBlocks && blockedDates.some(blockedDate => isSameDay(new Date(blockedDate), day))) {
      return; 
    }
    
    onChange(day);
  };

  const renderMonth = (monthOffset) => {
    const monthDate = addMonths(currentDate, monthOffset);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const today = startOfDay(new Date());

    const days = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'NDZ'];

    const rows = [];
    let dayElements = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isBlocked = blockedDates.some(blocked => isSameDay(new Date(blocked), cloneDay));
        const isSelected = selectedDates?.some(sel => isSameDay(sel, cloneDay));
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isPast = isBefore(day, today);

        let cellClasses = "h-12 w-12 flex items-center justify-center rounded-full text-base transition-all duration-200 mx-auto ";

        if (!isCurrentMonth) {
          cellClasses += "text-gray-300 ";
        } else if (isPast) {
          cellClasses += "text-gray-300 cursor-not-allowed ";
        } else if (isBlocked) {
          if (allowAdminBlocks) {
            cellClasses += "bg-red-100 text-red-600 line-through cursor-pointer hover:bg-red-200 ";
          } else if (publicStyles) {
            cellClasses += "bg-red-50 text-red-400 opacity-80 cursor-not-allowed ";
          } else {
            cellClasses += "bg-gray-100 text-gray-400 line-through cursor-not-allowed ";
          }
        } else if (isSelected) {
          cellClasses += "bg-accent text-white font-medium ";
        } else {
          cellClasses += "text-gray-700 hover:bg-gray-100 cursor-pointer ";
        }
        
        let isClickable = isCurrentMonth && !isPast;
        if (!allowAdminBlocks) {
           isClickable = isClickable && !isBlocked && !readOnly;
        }

        dayElements.push(
          <div 
            key={day} 
            className="py-1"
            onClick={() => {
              if (isClickable) {
                onDateClick(cloneDay);
              }
            }}
          >
            <div className={cellClasses}>
              {formattedDate}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {dayElements}
        </div>
      );
      dayElements = [];
    }

    return (
      <div key={monthOffset} className={monthOffset > 0 ? "mt-8 pt-8 border-t border-gray-100" : ""}>
        <div className="flex justify-between items-center mb-6 px-2">
          {monthOffset === 0 ? (
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : <div className="w-10"></div>}
          
          <h2 className="text-gray-800 font-semibold text-xl capitalize">
            {format(monthDate, 'LLLL yyyy', { locale: pl })}
          </h2>
          
          {monthOffset === monthsCount - 1 ? (
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <ChevronRight size={24} />
            </button>
          ) : <div className="w-10"></div>}
        </div>
        
        <div className="grid grid-cols-7 mb-2">
          {days.map((d, idx) => (
            <div key={idx} className="text-center text-xs font-semibold text-gray-400 tracking-wider mb-2">
              {d}
            </div>
          ))}
        </div>
        
        <div>{rows}</div>
      </div>
    );
  };

  return (
    <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-xl ${className}`}>
      {Array.from({ length: monthsCount }).map((_, i) => renderMonth(i))}
    </div>
  );
};

export default Calendar;
