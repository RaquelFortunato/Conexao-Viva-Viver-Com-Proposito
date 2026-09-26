import React, { useState } from 'react';

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Áudios & Podcasts', 'Devocionais', 'Família & Relacionamentos', 'Orações'];

  const items = [
    {
      id: 1,
      title: "Como ouvir a voz de Deus no dia a dia",
      category: "Áudios & Podcasts",
      duration: "18 min",
      author: "Raquel Fortunato",
      imageBg: "from-primary/20 to-primary/5",
      icon: "headphones"
    },
    {
      id: 2,
      title: "Fortalecendo o casamento através da Palavra",
      category: "Família & Relacionamentos",
      duration: "12 min",
      author: "Raquel Fortunato",
      imageBg: "from-secondary/20 to-secondary/5",
      icon: "favorite"
    },
    {
      id: 3,
      title: "O poder da oração de intercessão",
      category: "Orações",
      duration: "15 min",
      author: "Conexão Viva",
      imageBg: "from-tertiary/20 to-tertiary/5",
      icon: "auto_awesome"
    },
    {
      id: 4,
      title: "Ansiedade: Encontrando paz nas promessas",
      category: "Devocionais",
      duration: "10 min",
      author: "Raquel Fortunato",
      imageBg: "from-primary-container/40 to-surface-container",
      icon: "spa"
    }
  ];

  const filteredItems = selectedCategory === 'Todos' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Fixo Topo */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe border-b border-surface-container-highest/60">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wide">Descubra Conteúdos</span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface">Explorar</h1>
          </div>
          <div className="relative flex items-center w-40 sm:w-56">
            <span className="absolute left-3 material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-surface-container text-on-surface font-caption text-caption border border-surface-container-highest focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-surface px-margin gap-space-md">
        
        {/* Banner em Destaque */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container/50 via-surface-container to-surface-container p-space-md shadow-sm border border-primary/20">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <span className="material-symbols-outlined text-[18px]">podcasts</span>
            <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">Série Especial</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Mulheres Segundo o Coração de Deus</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            Ouça agora os episódios completos da conferência exclusiva com Raquel Fortunato.
          </p>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-xl font-label-md text-label-md shadow-sm hover:brightness-105 transition-all">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            <span>Ouvir Episódios</span>
          </button>
        </div>

        {/* Filtros de Categoria (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all shadow-sm ${selectedCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grade / Lista de Conteúdos */}
        <div className="flex flex-col gap-3">
          {filteredItems.map((item) => (
            <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${item.imageBg} bg-surface-container shadow-sm border border-surface-container-highest/60 hover:border-primary/30 transition-all group`}>
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-caption text-caption text-primary font-semibold uppercase">{item.category}</span>
                  <h3 className="font-label-lg text-label-lg text-on-surface truncate mt-0.5">{item.title}</h3>
                  <span className="font-caption text-caption text-on-surface-variant flex items-center gap-2 mt-1">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-[14px]">schedule</span> {item.duration}</span>
                  </span>
                </div>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-colors flex-shrink-0 ml-3 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </button>
            </div>
          ))}
        </div>

      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-low/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.35)]">
        <div className="flex justify-around items-center h-16 px-space-xs">
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Home</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Bíblia</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Planos</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-primary font-semibold transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
            <span className="font-label-md text-label-md text-[11px] leading-none text-primary font-semibold">Explorar</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Configurações</span>
          </a>
        </div>
      </nav>
    </div>
  );
}