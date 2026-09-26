import React, { useState } from 'react';

export default function PlanoDeLeitura({ onNavigate }) {
  const [abaAtivaPlano, setAbaAtivaPlano] = useState('catalogo'); // 'catalogo', 'meus', 'concluidos'

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho Padronizado */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Planos de Leitura</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            RF
          </div>
        </div>

        {/* Abas Superiores de Filtro (Encontrar Planos, Meus Planos, Concluídos) */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800 text-center">
          <button 
            onClick={() => setAbaAtivaPlano('catalogo')}
            className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
              abaAtivaPlano === 'catalogo' 
                ? 'bg-amber-400 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Explorar
          </button>
          <button 
            onClick={() => setAbaAtivaPlano('meus')}
            className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
              abaAtivaPlano === 'meus' 
                ? 'bg-amber-400 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Meus Planos
          </button>
          <button 
            onClick={() => setAbaAtivaPlano('concluidos')}
            className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
              abaAtivaPlano === 'concluidos' 
                ? 'bg-amber-400 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concluídos
          </button>
        </div>

        {/* Lembrete Diário */}
        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-sm">🔔</span>
            <div>
              <p className="text-xs font-bold text-white">Lembrete de Leitura</p>
              <p className="text-[10px] text-slate-400">Ativo diário às 07:00</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg font-medium">Ligado</span>
        </div>

        {/* Lista de Planos Disponíveis */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Catálogo de Planos</h2>

          {/* Plano 1 */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2 hover:border-amber-500/40 transition">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-semibold border border-amber-500/20">365 Dias</span>
              <span className="text-xs text-slate-400">📖 Bíblia Completa</span>
            </div>
            <h3 className="text-xs font-bold text-white">Ler a Bíblia completa em um ano</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Leitura contínua de Gênesis a Apocalipse para edificar sua vida diariamente.</p>
            <button className="w-full mt-2 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow">
              Iniciar Plano
            </button>
          </div>

          {/* Plano 2 */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2 hover:border-amber-500/40 transition">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-semibold border border-amber-500/20">365 Dias</span>
              <span className="text-xs text-slate-400">⏳ Histórico</span>
            </div>
            <h3 className="text-xs font-bold text-white">Ler a Bíblia completa em ordem cronológica</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Entenda os fatos bíblicos na exata ordem em que aconteceram na história.</p>
            <button className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl font-bold text-xs transition cursor-pointer">
              Ver Detalhes
            </button>
          </div>

          {/* Plano 3 */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2 hover:border-amber-500/40 transition">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-semibold border border-amber-500/20">31 Dias</span>
              <span className="text-xs text-slate-400">💡 Sabedoria</span>
            </div>
            <h3 className="text-xs font-bold text-white">Ler o livro de Provérbios em um mês</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Um capítulo por dia para guiar suas decisões e desenvolver sabedoria prática.</p>
            <button className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl font-bold text-xs transition cursor-pointer">
              Ver Detalhes
            </button>
          </div>

          {/* Plano 4 */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2 hover:border-amber-500/40 transition">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-semibold border border-amber-500/20">60 Dias</span>
              <span className="text-xs text-slate-400">🕊️ Vida de Jesus</span>
            </div>
            <h3 className="text-xs font-bold text-white">Ler os Evangelhos em dois meses</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Mergulhe na vida, ensinamentos, morte e ressurreição de Cristo nos quatro evangelhos.</p>
            <button className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl font-bold text-xs transition cursor-pointer">
              Ver Detalhes
            </button>
          </div>

          {/* Plano 5 */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2 hover:border-amber-500/40 transition">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-semibold border border-amber-500/20">30 Dias</span>
              <span className="text-xs text-slate-400">🎵 Louvor & Poesia</span>
            </div>
            <h3 className="text-xs font-bold text-white">Ler o livro de Salmos em um mês</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Encontre consolo, gratidão e adoração profunda através dos cânticos de Davi e outros.</p>
            <button className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl font-bold text-xs transition cursor-pointer">
              Ver Detalhes
            </button>
          </div>
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
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-medium transition cursor-pointer text-center">
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