import React, { useState } from 'react';

export default function ReadingPlansScreen() {
  const [activeTab, setActiveTab] = useState('meus');

  const plans = [
    {
      id: 1,
      title: "Viver com Propósito em 30 Dias",
      category: "Jornada Diária",
      progress: 68,
      currentDay: 21,
      totalDays: 30,
      imageBg: "from-primary/20 to-primary/5",
      isJoined: true
    },
    {
      id: 2,
      title: "A Armadura de Deus na Prática",
      category: "Batalha Espiritual",
      progress: 0,
      currentDay: 1,
      totalDays: 14,
      imageBg: "from-secondary/20 to-secondary/5",
      isJoined: false
    },
    {
      id: 3,
      title: "A Sabedoria de Provérbios",
      category: "Sabedoria & Família",
      progress: 15,
      currentDay: 5,
      totalDays: 31,
      imageBg: "from-tertiary/20 to-tertiary/5",
      isJoined: true
    }
  ];

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Fixo Topo */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe border-b border-surface-container-highest/60">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wide">Jornadas Espirituais</span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface">Planos de Leitura</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px] text-primary">search</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-surface px-margin gap-space-md">
        
        {/* Abas (Meus Planos / Explorar Novos) */}
        <div className="flex bg-surface-container p-1 rounded-xl shadow-sm">
          <button 
            onClick={() => setActiveTab('meus')}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'meus' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Meus Planos Ativos
          </button>
          <button 
            onClick={() => setActiveTab('novos')}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'novos' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Explorar Catálogo
          </button>
        </div>

        {/* Lista de Planos */}
        <div className="flex flex-col gap-4">
          {plans
            .filter(p => activeTab === 'meus' ? p.isJoined : true)
            .map((plan) => (
              <div key={plan.id} className={`flex flex-col rounded-2xl bg-gradient-to-br ${plan.imageBg} bg-surface-container p-space-md shadow-sm border border-surface-container-highest/60 gap-3`}>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-primary font-semibold uppercase">{plan.category}</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{plan.title}</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-caption text-caption text-on-surface font-medium">
                    {plan.totalDays} Dias
                  </span>
                </div>

                {plan.isJoined ? (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-center text-xs text-on-surface-variant font-caption">
                      <span>Progresso: Dia {plan.currentDay} de {plan.totalDays}</span>
                      <span>{plan.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${plan.progress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Uma jornada profunda para alinhar seus passos à verdade bíblica.
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest/60 mt-1">
                  <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                    Raquel Fortunato
                  </span>
                  <button className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all shadow-sm ${plan.isJoined ? 'bg-primary text-on-primary hover:brightness-105' : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'}`}>
                    {plan.isJoined ? "Continuar Leitura" : "Participar do Plano"}
                  </button>
                </div>
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
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-primary font-semibold transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
            <span className="font-label-md text-label-md text-[11px] leading-none text-primary font-semibold">Planos</span>
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