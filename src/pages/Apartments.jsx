import React from 'react';
import Hero from '../components/Hero';

const Apartments = () => {
  return (
    <div>
      <Hero 
        title="Nasze Domki Wakacyjne" 
        subtitle="160m² luksusu z widokiem na Tatry" 
        isHome={false} 
      />

      <section className="py-32 bg-[#EBE7DF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-foreground mb-6">Trzy Niezależne Domy</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Oferujemy zakwaterowanie w 3 identycznych, luksusowych domkach 14-osobowych. Każdy dom o powierzchni 160m² to miejsce dla osób ceniących sobie ciszę i spokój, a jednocześnie chcących cieszyć się atrakcjami Podhala.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <img src="/assets/images/wnetrze-2.webp" alt="Sypialnia" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">5 Komfortowych Sypialni</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  W każdym domku znajduje się 5 sypialni komfortowo rozłożonych na wyższych kondygnacjach. Dwie z nich posiadają prywatne balkony z widokiem na panoramę gór.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Łóżka jedno- i dwuosobowe</li>
                  <li>• Dodatkowe rozkładane kanapy</li>
                  <li>• Przestrzeń na przechowywanie rzeczy osobistych</li>
                  <li>• Świeża pościel w cenie</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <img src="/assets/images/wnetrze-7.webp" alt="Kuchnia" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">W Pełni Wyposażona Kuchnia i Jadalnia</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Serce domu to przestronna kuchnia płynnie łącząca się z jadalnią. Duży stół do biesiadowania to idealne miejsce na wspólne posiłki dla wszystkich 14 gości.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Płyta indukcyjna (4-palnikowa) i zmywarka</li>
                  <li>• Duża lodówka, mikrofala</li>
                  <li>• Ekspres do kawy, toster i opiekacz</li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <img src="/assets/images/wnetrze-13.webp" alt="Salon" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">Salon z Kominkiem</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Jasny, słoneczny salon to idealne miejsce na długie wieczory. Wyposażony w nastrojowy kominek, ogromne i wygodne kanapy oraz duży telewizor z bogatą ofertą kanałów.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Ogrzewanie podłogowe na parterze i w łazienkach (elektryczne piecyki konwekcyjne w reszcie domu)</li>
                  <li>• Darmowe szybkie Wi-Fi</li>
                  <li>• Bezpośrednie wyjście na taras widokowy</li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <img src="/assets/images/wnetrze-4.webp" alt="Łazienka" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">2 Łazienki</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Dla pełnego komfortu dużej grupy, każdy domek dysponuje dwiema niezależnymi łazienkami z komfortowymi kabinami prysznicowymi oraz ogrzewaniem podłogowym.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Zestaw świeżych ręczników dla każdego gościa</li>
                  <li>• Nowoczesne i sterylnie czyste wykończenie</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apartments;
