import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO, isBefore } from 'date-fns';
import { pl } from 'date-fns/locale';
import SearchBar from '../components/SearchBar';
import Calendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const startParam = searchParams.get('start');
  const endParam = searchParams.get('end');
  const guestsParam = searchParams.get('guests');

  const [availableCabins, setAvailableCabins] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const navigate = useNavigate();
  const [selectionPhase, setSelectionPhase] = useState('start');
  const [tempStart, setTempStart] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        // Fetch all cabins
        const cabinsRes = await fetch(`${API_URL}/api/cabins`);
        const cabins = await cabinsRes.json();

        // Fetch blocks
        const blocksRes = await fetch(`${API_URL}/api/availability`);
        const blocks = await blocksRes.json();

        // Calculate fully booked dates for general calendar
        const cabinCount = cabins.length;
        const blockCountsByDate = {};
        blocks.forEach(b => {
          const d = b.start_date;
          blockCountsByDate[d] = (blockCountsByDate[d] || 0) + 1;
        });
        
        const fullyBooked = Object.keys(blockCountsByDate).filter(date => blockCountsByDate[date] >= cabinCount);
        setFullyBookedDates(fullyBooked);

        if (!startParam || !endParam) {
           setAvailableCabins(cabins); // show all if no dates
           setLoading(false);
           return;
        }

        // Filter available cabins
        const available = cabins.filter(cabin => {
          const cabinBlocks = blocks.filter(b => b.cabin_id === cabin.id);
          const isBlocked = cabinBlocks.some(block => {
            return (
              (startParam <= block.end_date && startParam >= block.start_date) ||
              (endParam <= block.end_date && endParam >= block.start_date) ||
              (startParam <= block.start_date && endParam >= block.end_date)
            );
          });
          return !isBlocked;
        });

        setAvailableCabins(available);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [startParam, endParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCabin) {
      alert("Proszę wybrać domek");
      return;
    }
    
    setSubmitStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabin_id: selectedCabin,
          start_date: startParam,
          end_date: endParam,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          message: message
        })
      });
      if (res.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const displayDate = (isoStr) => {
    if (!isoStr) return '';
    return format(parseISO(isoStr), 'dd MMMM yyyy', { locale: pl });
  };

  const handleCalendarClick = (day) => {
    if (selectionPhase === 'start') {
      setTempStart(day);
      setSelectionPhase('end');
    } else {
      if (isBefore(day, tempStart) || day.getTime() === tempStart.getTime()) {
         setTempStart(day);
      } else {
         const startStr = format(tempStart, 'yyyy-MM-dd');
         const endStr = format(day, 'yyyy-MM-dd');
         navigate(`/rezerwacja?start=${startStr}&end=${endStr}&guests=2`);
         setTempStart(null);
         setSelectionPhase('start');
      }
    }
  };

  const currentSelectedDates = tempStart 
    ? [tempStart] 
    : [startParam ? parseISO(startParam) : null, endParam ? parseISO(endParam) : null].filter(Boolean);

  const cabinDetails = {
    1: { img: "dom1-1.jpg", desc: "Z prywatnym jacuzzi i altaną. Obejmuje strefę wypoczynku z grillem oraz plac zabaw." },
    2: { img: "wnetrze-7.webp", desc: "Z przestronnym tarasem lub altaną, strefą wypoczynku z grillem i placem zabaw." },
    3: { img: "wnetrze-18.webp", desc: "Z altaną lub dużym tarasem, strefą wypoczynku z grillem i placem zabaw." }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto mb-12">
        <SearchBar />
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-foreground mb-2 text-center">Rezerwacja</h1>
        <p className="text-gray-500 text-center mb-12">
          {startParam && endParam ? (
            <>Twój termin: <span className="text-foreground font-medium">{displayDate(startParam)} - {displayDate(endParam)}</span> dla {guestsParam} osób.</>
          ) : (
            "Wybierz termin aby sprawdzić dostępność."
          )}
        </p>

        {!loading && (
          <div className="mb-16 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-serif text-foreground mb-2 text-center">Ogólna dostępność osady</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Kliknij w kalendarzu, aby wybrać nowy termin pobytu (przyjazd i wyjazd).</p>
            
            <div className="flex justify-center mb-6">
              <Calendar 
                selectedDates={currentSelectedDates}
                blockedDates={fullyBookedDates}
                publicStyles={true}
                readOnly={false}
                onChange={handleCalendarClick}
                monthsCount={1}
                className="shadow-none border-none !p-0 max-w-md w-full"
              />
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200"></div>
                <span className="text-gray-600 font-medium">Brak wolnych domków</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-50 border border-gray-200"></div>
                <span className="text-gray-600 font-medium">Dostępne</span>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 text-center">Sprawdzam dostępność...</p>
        ) : submitStatus === 'success' ? (
           <div className="bg-white border border-gray-200 shadow-xl p-8 rounded-xl text-center">
             <h2 className="text-2xl text-accent mb-4 font-serif">Dziękujemy!</h2>
             <p className="text-gray-600">Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Cabins Selection */}
            <div>
              <h2 className="text-2xl font-serif text-foreground mb-6">Dostępne domki</h2>
              {availableCabins.length === 0 ? (
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-red-800">
                  Niestety w wybranym terminie nie mamy wolnych domków. Spróbuj wybrać inny termin powyżej.
                </div>
              ) : (
                <div className="space-y-4">
                  {availableCabins.map(cabin => {
                    const details = cabinDetails[cabin.id] || { img: "wnetrze-13.webp", desc: "Komfortowy domek w Osadzie Dzianisz." };
                    return (
                    <div 
                      key={cabin.id} 
                      onClick={() => setSelectedCabin(cabin.id)}
                      className={`p-0 rounded-xl border cursor-pointer overflow-hidden transition-all flex flex-col sm:flex-row h-full sm:h-40 ${
                        selectedCabin === cabin.id 
                        ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                        <img src={`/assets/images/${details.img}`} alt={cabin.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 sm:w-2/3 flex flex-col justify-center">
                        <h3 className="text-xl text-foreground font-serif font-medium mb-1">{cabin.name}</h3>
                        <p className="text-gray-500 text-xs font-light mb-2">{details.desc}</p>
                        <ul className="text-[11px] text-gray-500 space-y-1 mt-auto">
                          <li>• Do 14 gości (160m²)</li>
                          <li>• 5 sypialni, 2 łazienki</li>
                          <li>• Salon z kominkiem</li>
                        </ul>
                      </div>
                    </div>
                  )})}
                </div>
              )}
            </div>

            {/* Inquiry Form */}
            <div>
              <div className="bg-white border border-gray-200 shadow-xl p-8 rounded-xl sticky top-24">
                <h2 className="text-2xl font-serif text-foreground mb-6">Wyślij zapytanie</h2>
                
                {/* Mobile SMS Quick Action */}
                <div className="block md:hidden">
                   <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                     Jesteś na smartfonie? Najszybsza rezerwacja odbywa się przez SMS. Przygotowaliśmy dla Ciebie gotową wiadomość z terminem!
                   </p>
                   <a 
                     href={`sms:+48600123456?body=${encodeURIComponent(`Dzień dobry, chciał(a)bym zarezerwować ${selectedCabin ? `Domek Wakacyjny N°${selectedCabin}` : 'domek'} w terminie od ${displayDate(startParam)} do ${displayDate(endParam)} dla ${guestsParam} osób. Czy termin jest nadal aktualny?`)}`}
                     className={`w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors text-sm uppercase tracking-widest ${!selectedCabin ? 'opacity-50 pointer-events-none' : ''}`}
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                     Wyślij SMS z zapytaniem
                   </a>
                   {!selectedCabin && <p className="text-xs text-red-500 mt-4 text-center">Wybierz domek z listy, aby wysłać zapytanie.</p>}
                </div>

                {/* Desktop Form */}
                <form onSubmit={handleSubmit} className="hidden md:block space-y-4">
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Imię i nazwisko</label>
                    <input required type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">E-mail</label>
                    <input required type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Telefon</label>
                    <input required type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Wiadomość (opcjonalnie)</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <button 
                    disabled={!selectedCabin || submitStatus === 'sending'}
                    type="submit" 
                    className="w-full bg-accent hover:bg-[#b88c45] disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-colors mt-4 text-sm uppercase tracking-widest"
                  >
                    {submitStatus === 'sending' ? 'Wysyłanie...' : 'Wyślij zapytanie o rezerwację'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
