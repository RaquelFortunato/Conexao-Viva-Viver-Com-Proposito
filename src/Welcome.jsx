import React from 'react';
import logoImg from './assets/Whatslogo.jpeg';
import fotoPerfil from './assets/Whatsadministradora.jpeg';

export default function Welcome({ onContinue }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-4 overflow-y-auto">
      
      <div className="w-full max-w-md bg-slate-900/95 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md my-auto text-center">
        
        {/* Logotipo no topo (Com imagem local) */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden">
            <img 
              src={logoImg} 
              alt="Logo Conexão Viva" 
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Títulos principais */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-white">Conexão Viva</h1>
          <p className="text-amber-400 text-xs font-semibold tracking-widest mt-0.5">VIVER COM PROPÓSITO</p>
          
          <h2 className="text-lg font-bold mt-4 text-slate-100">
            Seja bem-vindo ao Conexão Viva
          </h2>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            Um refúgio diário de paz, reflexão e oração.
          </p>
        </div>

        {/* Card da Criadora com a Foto da Raquel */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-6 text-center shadow-inner relative">
          
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full border-2 border-amber-400 overflow-hidden shadow-md bg-slate-800 flex items-center justify-center">
              <img 
                src={fotoPerfil} 
                alt="Raquel Fortunato" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          <p className="text-slate-300 text-xs italic leading-relaxed">
            "Sou Raquel Fortunato, brasileira e criei esse espaço especialmente para você, para trazer palavras que acalmam, fortalecem e trazem esperança para o seu coração!"
          </p>
        </div>

        {/* Botão de Prosseguir */}
        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mb-6"
        >
          <span>Prosseguir</span>
          <span className="text-base">→</span>
        </button>

        {/* Rodapé e Termos */}
        <div className="pt-4 border-t border-slate-800/60 space-y-1.5 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            🔒 Ambiente Seguro & Privado • Dados Protegidos
          </p>
          <p className="text-[10px] text-slate-500">
            Ao continuar, você concorda com nossos <span className="underline cursor-pointer text-slate-400">Termos de Uso</span>.
          </p>
        </div>

      </div>
    </div>
  );
}