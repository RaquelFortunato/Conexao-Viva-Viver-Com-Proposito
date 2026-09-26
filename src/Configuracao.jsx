import React, { useState } from 'react';

export default function Configuracoes({ onNavigate }) {
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(true);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      
      {/* Container Principal Centralizado (Igual às outras telas) */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho Padronizado */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Configurações da Conta</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            RF
          </div>
        </div>

        {/* Perfil do Usuário */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xl shadow-lg">
              RF
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-amber-400 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-slate-900">✓</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Sara Albuquerque</h2>
            <p className="text-[11px] text-amber-400 font-medium">Membro Conexão Viva</p>
            <p className="text-[10px] text-slate-400 mt-0.5">sara.albuquerque@email.com</p>
            <p className="text-[10px] text-slate-400 mt-0.5">📅 Caminhando há 142 dias no propósito</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full pt-1">
            <button className="py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white transition cursor-pointer">
              ✏️ Editar Perfil
            </button>
            <button className="py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white transition cursor-pointer">
              🔒 Alterar Senha
            </button>
          </div>
        </div>

        {/* Geral & Hábitos */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Geral & Hábitos</h2>
          
          <div className="space-y-2">
            {/* Armazenamento em Cache */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white">Armazenamento em Cache</h3>
                <p className="text-[10px] text-slate-400">42.8 MB ocupados com mídia off-line</p>
              </div>
              <button className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer">
                Liberar
              </button>
            </div>

            {/* Registro de Histórico */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <div>
                <h3 className="text-xs font-bold text-white">Registro de Histórico</h3>
                <p className="text-[10px] text-slate-400">48 devocionais lidos • 19 anotações</p>
              </div>
              <span className="text-slate-500">›</span>
            </div>

            {/* Tamanho da Fonte */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold text-white">Tamanho da Fonte de Leitura</h3>
                  <p className="text-[10px] text-slate-400">Conforto visual nas Escrituras ({tamanhoFonte}px)</p>
                </div>
                <span className="text-xs font-bold text-amber-400">Médio</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] text-slate-400 font-bold">A-</span>
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  value={tamanhoFonte} 
                  onChange={(e) => setTamanhoFonte(e.target.value)}
                  className="w-full accent-amber-400 cursor-pointer" 
                />
                <span className="text-xs text-slate-400 font-bold">A+</span>
              </div>
            </div>

            {/* Lembrete Diário da Palavra */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white">Lembrete Diário da Palavra</h3>
                <p className="text-[10px] text-slate-400">Momento de quietude pela manhã</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-amber-400">06:30</span>
                <button 
                  onClick={() => setNotificacaoAtiva(!notificacaoAtiva)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${notificacaoAtiva ? 'bg-amber-400 justify-end' : 'bg-slate-800 justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Institucional & Ministério */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institucional & Ministério</h2>
          
          <div className="space-y-2">
            {/* Sobre Nós */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">⛪</span>
                <h3 className="text-xs font-bold text-white">Sobre Nós • Ministério & Criadora Raquel Fortunato</h3>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                O Conexão Viva nasceu sob a direção de Raquel Fortunato com o propósito inegociável de despertar corações para um relacionamento íntimo, diário e transformador com Deus através de práticas espirituais bíblicas.
              </p>
            </div>

            {/* Termos de Uso */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <h3 className="text-xs font-bold text-white">Termos de Uso</h3>
              <span className="text-slate-500">›</span>
            </div>

            {/* Política de Privacidade */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <h3 className="text-xs font-bold text-white">Política de Privacidade</h3>
              <span className="text-slate-500">›</span>
            </div>

            {/* Versão do Aplicativo */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white">Versão do Aplicativo</h3>
                <p className="text-[10px] text-slate-400">Compilação estável e segura</p>
              </div>
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">v2.4.0 (Build 118)</span>
            </div>
          </div>
        </div>

        {/* Zona de Perigo / Ações da Conta */}
        <div className="space-y-2 pt-1">
          <button className="w-full py-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-inner">
            <span>🚪</span> Sair da Conta
          </button>
          <button className="w-full py-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 rounded-2xl text-xs font-bold text-red-400 flex items-center justify-center gap-2 transition cursor-pointer shadow-inner">
            <span>⚠️</span> Excluir Minha Conta Permanentemente
          </button>
        </div>

        {/* Menu de Navegação Interna Consistente */}
        <div className="pt-4 border-t border-slate-800">
          <p className="text-[11px] text-amber-400 font-semibold mb-2 text-center tracking-wide">MENU DE NAVEGAÇÃO</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
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
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-medium transition cursor-pointer text-center">
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