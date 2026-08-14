import React from 'react';
import Hero from '../components/Hero';

const Attractions = () => {
  return (
    <div>
      <Hero 
        title="Atrakcje w Okolicy" 
        subtitle="Odkrywaj uroki Podhala" 
        isHome={false} 
      />

      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-serif text-foreground mb-6">Doskonała Baza Wypadowa</h2>
          <p className="text-gray-600 mb-6 font-light leading-relaxed">
            Osada Dzianisz N°54 to nie tylko komfortowy nocleg, to przede wszystkim brama do najpiękniejszych miejsc na Podhalu. Znajdujemy się w urokliwej, zacisznej okolicy z dala od miejskiego gwaru, jednak wciąż blisko kluczowych punktów turystycznych.
          </p>
          <p className="text-gray-600 font-light leading-relaxed">
            Latem zapraszamy na piesze wycieczki szlakami Tatrzańskiego Parku Narodowego oraz rowerowe wyprawy. Zimą okolica zamienia się w raj dla miłośników narciarstwa (zarówno zjazdowego jak i biegowego). 
          </p>
        </div>
        <div className="flex-1 w-full h-[500px] relative">
          <img 
            src="/assets/images/zewnatrz-dron-3.webp" 
            alt="Osada z lotu ptaka" 
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="text-center group">
              <div className="relative h-64 overflow-hidden mb-6 rounded-t-full">
                <img src="/assets/images/zewnatrz-zima-wieczor-1.webp" alt="Narty" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">Stacja Narciarska<br/>Witów Ski</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Zaledwie 2 km od domków</p>
              <p className="text-gray-600 font-light">
                Raj dla narciarzy. Świetnie przygotowane stoki dla początkujących i zaawansowanych, zaledwie 3 minuty jazdy samochodem.
              </p>
            </div>

            <div className="text-center group mt-12 md:mt-0">
              <div className="relative h-64 overflow-hidden mb-6 rounded-t-full">
                <img src="/assets/images/zewnatrz-zima-wieczor-2.webp" alt="Termy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">Termy<br/>Chochołowskie</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Zaledwie 2 km od domków</p>
              <p className="text-gray-600 font-light">
                Największe termy na Podhalu. Idealne miejsce na relaks po dniu spędzonym na stoku lub górskich szlakach. Gorące źródła z widokiem na góry.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative h-64 overflow-hidden mb-6 rounded-t-full">
                <img src="/assets/images/zewnatrz-dron-7.webp" alt="Gubałówka" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">Gubałówka<br/>i Zakopane</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Gubałówka 10km | Zakopane 9km</p>
              <p className="text-gray-600 font-light">
                Słynny deptak Krupówki, kultowa kolejka na Gubałówkę i bogata baza gastronomiczna Zakopanego są na wyciągnięcie ręki.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Attractions;
