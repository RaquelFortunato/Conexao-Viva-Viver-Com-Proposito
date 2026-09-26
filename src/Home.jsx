import React from 'react';

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Tela Inicial</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            RF
          </div>
        </div>

        {/* 1. Devocional de Hoje */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold tracking-wider">
            <span>🟡 DEVOCIONAL DE HOJE</span>
            <span className="text-slate-400 font-normal">Hoje</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Paz e Renovação Interior</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Conecte seu coração ao propósito divino para a sua jornada hoje.
            </p>
          </div>
        </div>

        {/* 2. Citação Diária */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">💬 CITAÇÃO DIÁRIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Aguardando conteúdo</span>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center text-slate-400 text-xs italic">
            "Citação do dia..."
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <button title="Curtir" className="hover:text-amber-400 transition cursor-pointer">⭐</button>
              <button title="Baixar" className="hover:text-amber-400 transition cursor-pointer">📥</button>
              <button title="Compartilhar" className="hover:text-amber-400 transition cursor-pointer">🔗</button>
            </div>
            <button className="text-xs hover:text-amber-400 transition flex items-center gap-1 cursor-pointer">📋 Copiar</button>
          </div>
        </div>

        {/* 3. Reflexão do Dia */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">🌿 REFLEXÃO DO DIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Aguardando vídeo</span>
          </div>
          <div className="h-28 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
            Nenhum vídeo enviado ainda
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <button title="Curtir" className="hover:text-amber-400 transition cursor-pointer">⭐</button>
              <button title="Baixar" className="hover:text-amber-400 transition cursor-pointer">📥</button>
              <button title="Compartilhar" className="hover:text-amber-400 transition cursor-pointer">🔗</button>
            </div>
            <button className="text-xs hover:text-amber-400 transition flex items-center gap-1 cursor-pointer">📋 Copiar</button>
          </div>
        </div>

        {/* 4. Mensagem do Dia */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">💬 MENSAGEM DO DIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Aguardando vídeo</span>
          </div>
          <div className="h-28 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
            Nenhum vídeo enviado ainda
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <button title="Curtir" className="hover:text-amber-400 transition cursor-pointer">⭐</button>
              <button title="Baixar" className="hover:text-amber-400 transition cursor-pointer">📥</button>
              <button title="Compartilhar" className="hover:text-amber-400 transition cursor-pointer">🔗</button>
            </div>
            <button className="text-xs hover:text-amber-400 transition flex items-center gap-1 cursor-pointer">📋 Copiar</button>
          </div>
        </div>

        {/* 5. Oração do Dia */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">🙏 ORAÇÃO DO DIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Aguardando áudio</span>
          </div>
          <div className="h-20 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
            Nenhum áudio enviado ainda
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <button title="Curtir" className="hover:text-amber-400 transition cursor-pointer">⭐</button>
              <button title="Baixar" className="hover:text-amber-400 transition cursor-pointer">📥</button>
              <button title="Compartilhar" className="hover:text-amber-400 transition cursor-pointer">🔗</button>
            </div>
            <button className="text-xs hover:text-amber-400 transition flex items-center gap-1 cursor-pointer">📋 Copiar</button>
          </div>
        </div>

        {/* 6. Louvor do Dia */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">🎵 LOUVOR DO DIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Aguardando louvor</span>
          </div>
          <div className="h-28 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
            Nenhum louvor enviado ainda
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <button title="Curtir" className="hover:text-amber-400 transition cursor-pointer">⭐</button>
              <button title="Baixar" className="hover:text-amber-400 transition cursor-pointer">📥</button>
              <button title="Compartilhar" className="hover:text-amber-400 transition cursor-pointer">🔗</button>
            </div>
            <button className="text-xs hover:text-amber-400 transition flex items-center gap-1 cursor-pointer">📋 Copiar</button>
          </div>
        </div>

        {/* 7. Navegação Interna (Home, Bíblia, Planos, Explorar, Configurações, Admin) */}
        <div className="pt-4 border-t border-slate-800">
          <p className="text-[11px] text-amber-400 font-semibold mb-2 text-center tracking-wide">MENU DE NAVEGAÇÃO</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-medium transition cursor-pointer text-center">
              Home
            </button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Bíblia
            </button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Planos
            </button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Explorar
            </button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Configurações
            </button>
            <button onClick={() => onNavigate && onNavigate('admin')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}