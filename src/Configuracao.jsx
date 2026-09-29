import React, { useState } from 'react';

export default function Configuracao({ onNavigate }) {
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(true);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white p-4 py-6 flex flex-col items-center pb-24">
      
      {/* Moldura do Aplicativo / Celular */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-2xl space-y-4">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-[11px] font-bold text-white flex items-center gap-1">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-[9px] font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-xs font-bold text-amber-400 mt-0.5">Configurações da Conta</p>
          </div>
          <div className="w-8 h-8 rounded-full border border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs shadow">
            RF
          </div>
        </div>

        {/* Perfil do Usuário */}
        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-lg shadow-lg">
              RF
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-amber-400 text-slate-950 rounded-full text-[9px] font-extrabold flex items-center justify-center border-2 border-slate-900">✓</span>
          </div>
          <div>
            <h2 className="text-xs font-bold text-white">Sara Albuquerque</h2>
            <p className="text-[10px] text-amber-400 font-medium">Membro Conexão Viva</p>
            <p className="text-[9px] text-slate-400 mt-0.5">sara.albuquerque@email.com</p>
            <p className="text-[9px] text-slate-400 mt-0.5">📅 Caminhando há 142 dias no propósito</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full pt-1">
            <button type="button" className="py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-bold text-white transition cursor-pointer">
              ✏️ Editar Perfil
            </button>
            <button type="button" className="py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-bold text-white transition cursor-pointer">
              🔒 Alterar Senha
            </button>
          </div>
        </div>

        {/* Geral & Hábitos */}
        <div className="space-y-1.5">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Geral & Hábitos</h2>
          
          <div className="space-y-1.5">
            {/* Armazenamento em Cache */}
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between">
              <div>
                <h3 className="text-[11px] font-bold text-white">Armazenamento em Cache</h3>
                <p className="text-[9px] text-slate-400">42.8 MB ocupados com mídia</p>
              </div>
              <button type="button" className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[9px] transition cursor-pointer">
                Liberar
              </button>
            </div>

            {/* Registro de Histórico */}
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <div>
                <h3 className="text-[11px] font-bold text-white">Registro de Histórico</h3>
                <p className="text-[9px] text-slate-400">48 devocionais • 19 anotações</p>
              </div>
              <span className="text-slate-500 text-xs">›</span>
            </div>

            {/* Tamanho da Fonte */}
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner space-y-1.5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[11px] font-bold text-white">Tamanho da Fonte</h3>
                  <p className="text-[9px] text-slate-400">Leitura ({tamanhoFonte}px)</p>
                </div>
                <span className="text-[10px] font-bold text-amber-400">Médio</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[9px] text-slate-400 font-bold">A-</span>
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  value={tamanhoFonte} 
                  onChange={(e) => setTamanhoFonte(e.target.value)}
                  className="w-full accent-amber-400 cursor-pointer" 
                />
                <span className="text-[10px] text-slate-400 font-bold">A+</span>
              </div>
            </div>

            {/* Lembrete Diário */}
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between">
              <div>
                <h3 className="text-[11px] font-bold text-white">Lembrete Diário</h3>
                <p className="text-[9px] text-slate-400">Momento de quietude</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold text-amber-400">06:30</span>
                <button 
                  type="button"
                  onClick={() => setNotificacaoAtiva(!notificacaoAtiva)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition cursor-pointer ${notificacaoAtiva ? 'bg-amber-400 justify-end' : 'bg-slate-800 justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Institucional */}
        <div className="space-y-1.5">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Institucional</h2>
          
          <div className="space-y-1.5">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-xs">⛪</span>
                <h3 className="text-[11px] font-bold text-white">Sobre Nós • Raquel Fortunato</h3>
              </div>
              <p className="text-[9px] text-slate-300 leading-relaxed">
                O Conexão Viva nasceu sob a direção de Raquel Fortunato para despertar corações para um relacionamento íntimo com Deus.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <h3 className="text-[11px] font-bold text-white">Termos de Uso</h3>
              <span className="text-slate-500 text-xs">›</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <h3 className="text-[11px] font-bold text-white">Política de Privacidade</h3>
              <span className="text-slate-500 text-xs">›</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between">
              <div>
                <h3 className="text-[11px] font-bold text-white">Versão do Aplicativo</h3>
                <p className="text-[9px] text-slate-400">Estável e segura</p>
              </div>
              <span className="text-[9px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">v2.4.0</span>
            </div>
          </div>
        </div>

        {/* Ações da Conta */}
        <div className="space-y-1.5 pt-1">
          <button type="button" className="w-full py-2.5 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-2xl text-[11px] font-bold text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-inner">
            <span>🚪</span> Sair da Conta
          </button>
          <button type="button" className="w-full py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 rounded-2xl text-[11px] font-bold text-red-400 flex items-center justify-center gap-2 transition cursor-pointer shadow-inner">
            <span>⚠️</span> Excluir Minha Conta Permanentemente
          </button>
        </div>

      </div>
    </div>
  );
}