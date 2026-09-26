import React, { useState } from 'react';

export default function HomeScreen() {
  const [isLiked, setIsLiked] = useState(false);
  const [completedDevotional, setCompletedDevotional] = useState(false);

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Fixo Topo */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <img 
              alt="Logo Conexão Viva" 
              className="h-8 w-auto object-contain flex-shrink-0" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XFl-KQE3U0xdqVUeO8uSuBMeglP10yE2tk2nwpMyJKa3BxXY2HYizp3m0F5PsraNqUl4eeyNjNeFulRUZ_RB2F_2bHUUYiZLmMmmavombY28bSeA3pyzpJVkCBhMGHHWj7BNgg0y2PnFZrVs_kDW-Gy63jc3Pfte4La5xBlQVbjXEFvoV57bjbO8d1yFzyCuGOwmnnngQURjO5eGGTT0Wq0sNDFgPQE0AN0m14ids3O6xy8DRzmEMKwg" 
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary truncate leading-tight tracking-wide uppercase">Conexão Viva</span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">Olá, Sara!</h1>
            </div>
          </div>
          <div className="flex items-center gap-space-xs flex-shrink-0">
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors relative" href="#">
              <span className="material-symbols-outlined text-[20px] text-on-surface">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></span>
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-primary/20" href="#">
              <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxfcwpBRGfwYEf14P3htUtZ7_Kcu0GEqlvolzAVRU8BzwL0uG9EdCH69Sc-mEQOTS5PR3WhSGuKVcDKjwA8TCJmbiB01I1EMKpg_h_qZS4Z8YVWUMHv9pfVQpDcq6DueZNZApHz0BXVCR6o4bzf1e2krlzo0axZWE1Dp5KowARU-dMfeJRo83PWAMiOrqSDbq5QbIHobzkyUefg4w_cGz0-CYiMBp1caA1VkUt5g" />
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-surface px-margin gap-space-lg">
        
        {/* Card de Oferecimento / Boas-Vindas de Raquel Fortunato */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container/40 via-surface-container to-surface-container p-space-md shadow-sm border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 font-caption text-caption text-primary font-semibold">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              Devocional do Dia
            </span>
            <span className="font-caption text-caption text-on-surface-variant">25 de Setembro</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Construindo sobre a Rocha</h2>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
            "Aquele que ouve as minhas palavras e as pratica é como um homem prudente que edificou a sua casa sobre a rocha..."
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest/60">
            <div className="flex items-center gap-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxNGwt_N_aQUzTb9YhwmPkCU4OyYbvMV8a3mPODIsRHf30ObQ2gOJEDofjJbYI1j1RryCf5U2oDLe6kxrUq8-SS-gzrJfzfnjMpvQRN766NVnAN0RZHMGepKVZfUG2boFKMua0BD4fSQiGOCUUcC_TbqcYAV2zeq9V0HZTGjFxZGgsumd3WO9amUZoUuQumGmbuZeQPb_BnVe1h0edAJAHIoNUWUcmHEUvMpeuaw" alt="Raquel" className="w-7 h-7 rounded-full object-cover" />
              <span className="font-caption text-caption text-on-surface-variant">Por Raquel Fortunato</span>
            </div>
            <button className="flex items-center gap-1 bg-primary text-on-primary px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm hover:brightness-105 transition-all">
              <span>Ler Completo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Atalhos Rápidos */}
        <div className="grid grid-cols-4 gap-3">
          <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <span className="font-caption text-caption text-on-surface font-medium">Bíblia</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">event_available</span>
            </div>
            <span className="font-caption text-caption text-on-surface font-medium">Planos</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
            <div className="w-12 h-12 rounded-xl bg-tertiary/15 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[24px]">headphones</span>
            </div>
            <span className="font-caption text-caption text-on-surface font-medium">Áudios</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-container/60 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">explore</span>
            </div>
            <span className="font-caption text-caption text-on-surface font-medium">Explorar</span>
          </a>
        </div>

        {/* Versículo em Destaque */}
        <div className="flex flex-col rounded-2xl bg-surface-container p-space-md shadow-sm border border-surface-container-highest/60 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">format_quote</span>
              <span className="font-label-lg text-label-lg uppercase tracking-wide">Versículo em Destaque</span>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
            </button>
          </div>
          <p className="font-headline-sm text-headline-sm text-on-surface italic mb-3">
            "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho."
          </p>
          <span className="font-label-md text-label-md text-secondary self-end">Salmos 119:105</span>
        </div>

        {/* Progresso do Propósito */}
        <div className="flex items-center justify-between p-space-md rounded-2xl bg-surface-container shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">Leitura de Hoje</span>
              <span className="font-caption text-caption text-on-surface-variant">
                {completedDevotional ? "Concluído com sucesso!" : "Pendente para hoje"}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setCompletedDevotional(!completedDevotional)}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${completedDevotional ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'}`}
          >
            {completedDevotional ? "Feito ✓" : "Marcar Lido"}
          </button>
        </div>

      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-low/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.35)]">
        <div className="flex justify-around items-center h-16 px-space-xs">
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-primary font-semibold transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-label-md text-label-md text-[11px] leading-none text-primary font-semibold">Home</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Bíblia</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Planos</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">explore</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Explorar</span>
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