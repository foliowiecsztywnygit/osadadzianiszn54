import React from 'react';
import Hero from '../components/Hero';

const Rules = () => {
  return (
    <div>
      <Hero 
        title="Regulamin i Zasady" 
        subtitle="Dla komfortu i bezpieczeństwa naszych gości" 
        isHome={false} 
      />

      <section className="py-32 px-4 max-w-4xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-foreground mb-4">Godziny i Czas Pobytu</h2>
          <div className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
            <div className="flex-1">
              <span className="block text-4xl font-serif text-accent mb-2">15:00 - 22:00</span>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Zameldowanie</span>
              <p className="text-sm text-gray-600 mt-4">Prosimy o wcześniejszy kontakt w celu poinformowania nas o planowanej godzinie przyjazdu.</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-gray-200"></div>
            <div className="flex-1">
              <span className="block text-4xl font-serif text-accent mb-2">08:00 - 10:00</span>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Wymeldowanie</span>
              <p className="text-sm text-gray-600 mt-4">Wymeldowanie i zwrot kluczy odbywa się w wyznaczonych godzinach porannych.</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-4 border-b border-gray-200 pb-2">Zasady dotyczące dzieci</h3>
            <p className="text-gray-600 font-light mb-4">
              Nasze domki wakacyjne są miejscem przyjaznym rodzinom. Dzieci w każdym wieku są mile widziane.
            </p>
            <ul className="text-sm text-gray-500 space-y-2 list-disc list-inside ml-2">
              <li><strong>0 - 2 lata:</strong> Łóżeczko dziecięce udostępniamy bezpłatnie na życzenie (możliwość skorzystania zależy od dostępności). Dodatkowe łóżka nie są dostępne.</li>
              <li><strong>6 lat i starsze:</strong> Podlegają opłatom takim jak osoby dorosłe.</li>
              <li>Obiekt nie posiada ograniczeń wiekowych przy zameldowaniu.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-foreground mb-4 border-b border-gray-200 pb-2">Zasady dotyczące zwierząt</h3>
            <p className="text-gray-600 font-light mb-4">
              Doskonale rozumiemy, że psy to część rodziny (co potwierdzają nasze opinie!). Jesteśmy obiektem przyjaznym zwierzętom.
            </p>
            <p className="text-sm text-gray-500 bg-[#EBE7DF] p-4 rounded-md">
              <strong>Ważna informacja:</strong> Teren osady nie posiada zamkniętego, szczelnego ogrodzenia (wynika to z regionalnych uwarunkowań). Prosimy mieć to na uwadze przyjeżdżając ze swoimi pupilami.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-foreground mb-4 border-b border-gray-200 pb-2">Odwołania i Przedpłaty</h3>
            <p className="text-gray-600 font-light">
              Zasady dotyczące przedpłaty i odwoływania rezerwacji różnią się w zależności od rodzaju rezerwacji, sezonu oraz pośrednika. W celu poznania szczegółów konkretnej oferty zapraszamy do bezpośredniego kontaktu telefonicznego.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Rules;
