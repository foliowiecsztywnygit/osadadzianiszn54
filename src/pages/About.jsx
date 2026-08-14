import React from 'react';
import Hero from '../components/Hero';

const About = () => {
  const reviews = [
    {
      author: "Agnieszka Kasprzak",
      rating: 5,
      date: "rok temu",
      text: "Było naprawdę super 🤩klimatyczny kominek, dwie łazienki, 5 sypialni, które spokojnie pomieszczą 12/14 osób. Brakuje jedynie balii/jacuzzi i zamykanego ogrodzenia. W pełni wyposażone, czysto i bardzo dobry kontakt. Polecam z całego serca ❤️"
    },
    {
      author: "Мар'яна Палига",
      rating: 5,
      date: "rok temu",
      text: "Bardzo ładne, kameralne miejsce. 🥰 Super widoki, bardzo blisko do Term Chochołowskich, oprócz tego dom posiada wszystkie niezbędne wyposażenie. Osobno chciałam podziękować za możliwość pobytu z psem, dla nas to bardzo ważne, dlatego polecamy w 100 procentach 🫶🏻"
    },
    {
      author: "Anna Muras",
      rating: 5,
      date: "rok temu",
      text: "Domek jest klimatyczny, przytulny, jest czyściutko, dobrze wyposażony. Bardzo słoneczny salon, wygodna kanapa😍. Piekny widok na góry! Bardzo blisko do stoków narciarskich (2 km Szymoszkowa). Miła obsługa. Na pewno wrócimy tu za rok! 💛"
    }
  ];

  return (
    <div>
      <Hero 
        title="O nas" 
        subtitle="Twoje miejsce na ziemi" 
        isHome={false} 
      />

      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 w-full h-[600px] relative">
          <img 
            src="/assets/images/wnetrze-13.webp" 
            alt="Osada Dzianisz N°54" 
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-serif text-foreground mb-6">Misja i Spokój</h2>
          <p className="text-gray-600 mb-6 font-light leading-relaxed">
            Osada N°54 to miejsce, które chcielibyśmy oddać do Państwa dyspozycji na czas wypoczynku. Stworzyliśmy przestrzeń dla osób ceniących sobie ciszę i spokój, a jednocześnie chcących cieszyć się atrakcjami, jakie oferuje całe Podhale.
          </p>
          <p className="text-gray-600 font-light leading-relaxed mb-12">
            Zadbaliśmy o każdy najmniejszy detal, by Nasi goście czuli się u nas swobodnie i absolutnie komfortowo. Każdy z domków to 160m² luksusu przygotowanego z myślą o spędzeniu wyjątkowych chwil w gronie przyjaciół i rodziny.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-12">
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">9 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Od Zakopanego</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">2 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Od Term Chochołowskich</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">2 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Od Stacji Witów Ski</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">83 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Lotnisko Kraków-Balice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-gray-900 text-white border-t-8 border-accent">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-serif mb-6">Opinie naszych Gości</h2>
            <div className="inline-flex items-center space-x-6 bg-white/10 px-8 py-4 rounded-full border border-white/20">
              <span className="text-5xl font-bold text-accent">4.9</span>
              <div className="flex flex-col items-start">
                <div className="flex text-accent text-xl mb-1">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-300 font-medium tracking-widest uppercase">Z Google (97 opinii)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white/5 p-10 border border-white/10 hover:border-accent transition-colors relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-4.4 0-8 3.6-8 8v8h8v-8H6c0-2.2 1.8-4 4-4V8zm18 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z"/>
                  </svg>
                </div>
                <div className="flex text-accent text-lg mb-6">★★★★★</div>
                <p className="text-gray-300 font-light italic mb-8 leading-relaxed relative z-10 text-lg">
                  "{review.text}"
                </p>
                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-6">
                  <span className="font-bold text-white uppercase tracking-widest">{review.author}</span>
                  <span className="text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
