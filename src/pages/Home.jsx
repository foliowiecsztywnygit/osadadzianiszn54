import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const Home = () => {
  const reviews = [
    {
      author: "Agnieszka Kasprzak",
      rating: 5,
      date: "rok temu",
      text: "Było naprawdę super 🤩klimatyczny kominek, dwie łazienki, 5 sypialni, które spokojnie pomieszczą 12/14 osób. Brakuje jedynie balii/jacuzzi i zamykanego ogrodzenia. W pełni wyposażone..."
    },
    {
      author: "Мар'яна Палига",
      rating: 5,
      date: "rok temu",
      text: "Bardzo ładne, kameralne miejsce. 🥰 Super widoki, bardzo blisko do Term Chochołowskich, oprócz tego dom posiada wszystkie niezbędne wyposażenie. Osobno chciałam..."
    },
    {
      author: "Anna Muras",
      rating: 5,
      date: "rok temu",
      text: "Domek jest klimatyczny, przytulny, jest czyściutko, dobrze wyposażony. Bardzo słoneczny salon, wygodna kanapa😍. Piekny widok na góry! Bardzo blisko do stoków..."
    }
  ];

  return (
    <div>
      <Hero 
        title="Luksusowe Domki Wakacyjne" 
        subtitle="W Dzianiszu koło Zakopanego oferujemy domy z widokiem na góry" 
        isHome={true} 
      />

      {/* About Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 mt-12">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-serif text-foreground mb-6">Osada N°54 – Twoje miejsce na wypoczynek</h2>
          <p className="text-gray-600 mb-6 font-light leading-relaxed">
            Cicha i urokliwa miejscowość, w której znajdują się nasze domki, oddalona jest zaledwie 9 km od Zakopanego, 2 km od stacji narciarskiej Witów Ski i 2 km od Term Chochołowskich, co czyni ją doskonałą bazą wypadową do licznych atrakcji Podhala. Cisza i spokój pozwolą na spędzenie wyjątkowych chwil w gronie najbliższych.
          </p>
          <p className="text-gray-600 font-light leading-relaxed mb-6">
            Oferujemy zakwaterowanie w luksusowych domkach 14-osobowych o powierzchni 160m² każdy. Znajdziecie w nich przytulnie urządzone wnętrza, wygodne meble i tarasy z widokiem na góry. Zadbaliśmy o to, by nasi goście czuli się swobodnie i komfortowo (zapewniamy ręczniki i pościel).
          </p>
          <p className="text-xs uppercase tracking-widest font-bold text-accent">
            Najbliższe lotnisko: Kraków-Balice (83 km)
          </p>
        </div>
        <div className="flex-1 w-full h-[500px] relative">
          <img 
            src="/assets/images/wnetrze-13.webp" 
            alt="Wnętrze luksusowego domku" 
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Houses Grid Section */}
      <section className="py-24 bg-[#EBE7DF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl font-serif text-foreground mb-4">Nasze Domki</h2>
            <p className="text-gray-600 font-light">Do Twojej dyspozycji oddajemy 3 niezależne, w pełni wyposażone domki 14-osobowe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, img: "wnetrze-1.webp" },
              { id: 2, img: "wnetrze-7.webp" },
              { id: 3, img: "wnetrze-18.webp" }
            ].map(domek => (
              <div key={domek.id} className="bg-white shadow-md group overflow-hidden flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img src={`/assets/images/${domek.img}`} alt={`Domek ${domek.id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    REZERWUJ
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif text-foreground mb-4">Domek Wakacyjny<br/>N°{domek.id}</h3>
                  <ul className="text-sm text-gray-500 mb-6 space-y-1 flex-grow">
                    <li>• Do 14 gości (160m²)</li>
                    <li>• 5 sypialni (część z balkonem)</li>
                    <li>• 2 łazienki z prysznicem</li>
                    <li>• Salon z kominkiem i dużą kuchnią</li>
                  </ul>
                  <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
                    <p className="text-xs text-gray-500 font-medium">Ogrzewanie podłogowe<br/>Parking w cenie</p>
                    <Link to="/domki" className="text-accent text-xs font-bold uppercase tracking-widest hover:text-[#b88c45]">Więcej</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Details Section */}
      <section className="py-24 text-center px-4">
        <h2 className="text-3xl font-serif text-foreground mb-8">Wyposażenie najwyższej klasy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-left">
          <div className="p-6 bg-white border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-accent mb-4">Kuchnia i Salon</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Przestronna kuchnia z dużą jadalnią posiada wszystko, czego potrzebujesz: lodówkę, zmywarkę, mikrofalę, 4-palnikową płytę indukcyjną, ekspres do kawy, toster i opiekacz. W salonie czeka kominek, wygodne kanapy i duży telewizor.
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-accent mb-4">Komfortowe Sypialnie</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              5 sypialni rozmieszczono na wyższych kondygnacjach (dwie z balkonami). Wyposażone są w wygodne łóżka (jedno- i dwuosobowe), rozkładane kanapy i miejsce na przechowywanie.
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-accent mb-4">Ogrzewanie i Ciepło</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              W łazienkach i częściowo na parterze zamontowano ogrzewanie podłogowe. Dodatkowe ciepło zapewniają elektryczne piecyki konwekcyjne oraz nastrojowy kominek w salonie.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="text-4xl font-serif mb-4">Co mówią nasi Goście?</h2>
            <div className="flex items-center space-x-4 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm mt-4 border border-white/20">
              <span className="text-3xl font-bold text-accent">4.9</span>
              <div className="flex flex-col items-start">
                <div className="flex text-accent text-sm">
                  ★★★★★
                </div>
                <span className="text-xs text-gray-300 font-medium tracking-widest uppercase">Na podstawie 97 opinii w Google</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white/5 p-8 border border-white/10 hover:border-accent/50 transition-colors">
                <div className="flex text-accent text-sm mb-4">★★★★★</div>
                <p className="text-gray-300 font-light italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">{review.author}</span>
                  <span className="text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-foreground mb-12 text-center">Często zadawane pytania (FAQ)</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Ilu gości może zatrzymać się w obiekcie?</h3>
              <p className="text-gray-600 font-light">Domek udostępnia jedną dużą opcję zakwaterowania, która pomieści aż 14 gości.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Ile sypialni znajduje się w obiekcie?</h3>
              <p className="text-gray-600 font-light">W każdym domu wakacyjnym zapewniono 5 oddzielnych sypialni oraz 2 łazienki z prysznicem. Dwie sypialnie posiadają własne balkony.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Jakie są godziny zameldowania i wymeldowania?</h3>
              <p className="text-gray-600 font-light">Zameldowanie w obiekcie rozpoczyna się o godzinie 15:00 (do 22:00), a wymeldować się można do godziny 10:00 (od 08:00). Prosimy o poinformowanie nas z wyprzedzeniem o planowanej godzinie przyjazdu.</p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Czy obiekt jest przyjazny dzieciom?</h3>
              <p className="text-gray-600 font-light">Tak, obiekt jest bardzo często rezerwowany przez rodziny! Dzieci w każdym wieku są mile widziane. Łóżeczka dla dzieci (0-2 lata) są dostępne bezpłatnie na życzenie. Dzieci od 6. roku życia podlegają standardowym opłatom.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Czy w obiekcie dostępny jest balkon lub taras?</h3>
              <p className="text-gray-600 font-light">Tak, każdy z naszych domków wakacyjnych posiada taras oraz wybrane sypialnie posiadają balkony.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
