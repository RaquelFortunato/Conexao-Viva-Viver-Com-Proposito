import React from 'react';

export default function WelcomeScreen() {
  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col justify-between antialiased selection:bg-primary-container selection:text-on-primary-container relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Topo / Logo */}
      <header className="pt-safe px-margin pt-6 flex justify-center z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">flare</span>
          <span className="font-label-lg text-label-lg tracking-widest text-primary uppercase">Conexão Viva</span>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-margin z-10 my-auto">
        <div className="w-24 h-24 rounded-3xl bg-primary-container/40 flex items-center justify-center text-primary mb-6 shadow-sm border border-primary/20">
          <span className="material-symbols-outlined text-[48px]">auto_stories</span>
        </div>

        <h1 className="font-headline-md text-headline-md text-on-surface mb-3 leading-tight">
          Viver com Propósito <br />todos os dias.
        </h1>
        
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
          Um espaço dedicado a fortalecer sua fé, guiar sua leitura bíblica e manter seu coração alinhado com a Palavra.
        </p>

        <div className="flex items-center gap-1.5 mt-8 bg-surface-container px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-caption text-caption text-on-surface-variant">Liderado por Raquel Fortunato</span>
        </div>
      </main>

      {/* Rodapé com Ações */}
      <footer className="pb-safe px-margin pb-8 flex flex-col gap-3 z-10">
        <button 
          onClick={() => alert("Indo para o Cadastro...")}
          className="w-full h-12 flex items-center justify-center rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:brightness-105 transition-all active:scale-[0.99]"
        >
          Criar Minha Conta
        </button>
        <button 
          onClick={() => alert("Indo para o Login...")}
          className="w-full h-12 flex items-center justify-center rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors"
        >
          Já tenho uma conta (Entrar)
        </button>
      </footer>
    </div>
  );
}