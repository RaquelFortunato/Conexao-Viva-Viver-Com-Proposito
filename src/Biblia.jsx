import React, { useState } from 'react';

export default function BibleScreen() {
  const [selectedBook, setSelectedBook] = useState('João');
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [fontSize, setFontSize] = useState('normal');

  const verses = [
    { num: 1, text: "Havia, entre os fariseus, um homem chamados Nicodemos, principal dos judeus." },
    { num: 2, text: "Este foi ter com Jesus, de noite, e disse-lhe: Rabi, bem sabemos que és Mestre vindo de Deus; porque ninguém pode fazer estes sinais que tu fazes, se Deus não for com ele." },
    { num: 3, text: "A Respondeu-lhe Jesus: Em verdade, em verdade te digo que se alguém não nascer de novo, não pode ver o reino de Deus." },
    { num: 4, text: "Disse-lhe Nicodemos: Como pode um homem nascer, sendo velho? Pode, porventura, tornar a entrar no ventre de sua mãe e nascer?" },
    { num: 5, text: "Jesus respondeu: Em verdade, em verdade te digo que se alguém não nascer da água e do Espírito, não pode entrar no reino de Deus." },
    { num: 6, text: "O que é nascido da carne é carne, e o que é nascido do Espírito é espírito." }
  ];

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Fixo Topo */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe border-b border-surface-container-highest/60">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center gap-1.5 text-on-surface font-label-md text-label-md transition-colors">
              <span className="material-symbols-outlined text-[18px] text-primary">menu_book</span>
              <span>{selectedBook} {selectedChapter}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
              title="Ajustar Tamanho da Fonte"
            >
              <span className="material-symbols-outlined text-[20px]">format_size</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal (Texto Bíblico) */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-surface px-margin gap-space-md">
        
        {/* Seletor de Versão / Tradução */}
        <div className="flex items-center justify-between bg-surface-container p-2.5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <span className="font-label-md text-label-md text-on-surface">Versão: Almeida Corrigida Fiel (ACF)</span>
          </div>
          <button className="text-primary font-caption text-caption hover:underline font-semibold">Alterar</button>
        </div>

        {/* Bloco de Leitura */}
        <div className="flex flex-col rounded-2xl bg-surface-container p-space-md shadow-sm gap-4">
          <div className="border-b border-surface-container-highest pb-3 flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-primary">João Capítulo {selectedChapter}</h2>
            <div className="flex items-center gap-1 text-on-surface-variant font-caption text-caption">
              <span className="material-symbols-outlined text-[16px]">volume_up</span>
              <span>Áudio Disponível</span>
            </div>
          </div>

          <div className={`flex flex-col gap-3 ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-normal'}`}>
            {verses.map((v) => (
              <p key={v.num} className="font-body-md text-on-surface hover:bg-surface-container-high/40 p-1.5 rounded-lg transition-colors group">
                <span className="font-caption text-primary font-bold mr-2 text-xs select-none">{v.num}</span>
                {v.text}
              </p>
            ))}
          </div>
        </div>

        {/* Navegação entre capítulos */}
        <div className="flex items-center justify-between pt-2">
          <button 
            onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Capítulo Anterior
          </button>
          <button 
            onClick={() => setSelectedChapter(prev => prev + 1)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:brightness-105 transition-all shadow-sm"
          >
            Próximo Capítulo
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-low/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.35)]">
        <div className="flex justify-around items-center h-16 px-space-xs">
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Home</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-primary font-semibold transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            <span className="font-label-md text-label-md text-[11px] leading-none text-primary font-semibold">Bíblia</span>
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