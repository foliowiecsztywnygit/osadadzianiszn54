import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    if (checkin && checkout) {
      setMessage(`Dzień dobry, potrzebuję noclegu w Osadzie Dzianisz N°54 pomiędzy ${checkin} a ${checkout}. Czy mają Państwo wolny termin?`);
    }
  }, [searchParams]);

  return (
    <div>
      <Hero 
        title="Kontakt" 
        subtitle="Zarezerwuj swój pobyt i zapytaj o szczegóły" 
        isHome={false} 
      />

      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Contact Info */}
        <div className="flex-1">
          <h2 className="text-4xl font-serif text-foreground mb-8">Porozmawiajmy</h2>
          <p className="text-gray-600 font-light leading-relaxed mb-12">
            Jeśli masz pytania dotyczące pobytu, wolnych terminów lub specyficznego wyposażenia domków, jesteśmy do Twojej dyspozycji. 
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#EBE7DF] p-4 rounded-full text-accent mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Adres</h3>
                <p className="text-gray-600 font-light mt-1">
                  Osada Dzianisz N°54<br/>
                  ul. Kurierów Tatrzańskich 47<br/>
                  34-514 Dzianisz
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#EBE7DF] p-4 rounded-full text-accent mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Telefon</h3>
                <p className="text-gray-600 font-light mt-1 text-xl">+48 503 142 398</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 bg-white p-10 border border-gray-100 shadow-xl">
          <h3 className="text-2xl font-serif text-foreground mb-6">Napisz do nas</h3>
          {/* Uzupełnij adres action po założeniu darmowego konta na Formspree.io */}
          <form action="https://formspree.io/f/TWOJ_KOD_FORMSPREE" method="POST" className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Imię i Nazwisko</label>
              <input type="text" name="name" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="Jan Kowalski" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Telefon</label>
                <input type="tel" name="phone" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="+48 ___ ___ ___" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">E-mail</label>
                <input type="email" name="email" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="jan@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Wiadomość</label>
              <textarea 
                name="message"
                rows="4" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-accent transition-colors" 
                placeholder="Twoje pytanie o wolny termin..."
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-accent text-white py-4 text-sm font-bold tracking-widest hover:bg-[#b88c45] transition-colors mt-4">
              WYŚLIJ ZAPYTANIE
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Contact;
