import React, { useState } from 'react';
import Hero from '../components/Hero';

const GalleryPage = () => {
  const [filter, setFilter] = useState('wszystkie');

  const images = [
    // Zewnątrz - Dron
    ...Array.from({ length: 7 }, (_, i) => ({
      src: `/assets/images/zewnatrz-dron-${i + 1}.webp`,
      category: 'zewnatrz',
      alt: `Widok z drona ${i + 1}`
    })),
    // Z zewnątrz zima/wieczór
    ...Array.from({ length: 11 }, (_, i) => ({
      src: `/assets/images/zewnatrz-zima-wieczor-${i + 1}.webp`,
      category: 'zima',
      alt: `Zima i wieczór ${i + 1}`
    })),
    // Wnętrza
    ...Array.from({ length: 36 }, (_, i) => ({
      src: `/assets/images/wnetrze-${i + 1}.webp`,
      category: 'wnetrza',
      alt: `Wnętrze domku ${i + 1}`
    }))
  ];

  const filteredImages = filter === 'wszystkie' ? images : images.filter(img => img.category === filter);

  return (
    <div>
      <Hero 
        title="Galeria" 
        subtitle="Odkryj Osadę Dzianisz N°54 na zdjęciach" 
        isHome={false} 
      />

      <section className="py-32 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'wszystkie', label: 'Wszystkie' },
              { id: 'wnetrza', label: 'Wnętrza' },
              { id: 'zewnatrz', label: 'Z Drona' },
              { id: 'zima', label: 'Zima i Wieczór' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-300 border ${
                  filter === cat.id 
                    ? 'bg-accent border-accent text-white' 
                    : 'bg-transparent border-gray-300 text-foreground hover:border-accent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((img, index) => (
              <div key={`${img.src}-${index}`} className="relative aspect-[4/3] overflow-hidden group bg-gray-200">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
