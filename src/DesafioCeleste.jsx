import React, { useState } from 'react';
import { desafiosCelestes } from "./data/DesafioCelesteData.js";

export default function DesafioCeleste({ onNavigate }) {
  const [desafiosConcluidos, setDesafiosConcluidos] = useState({});

  const alternarConcluido = (id) => {
    setDesafiosConcluidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center relative">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Desafio Celeste</span>
              <span className="text-amber-400 text-xs font-normal">• 21 Dias</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Jornada de Fé</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('explorar')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold text-xs transition cursor-pointer border border-slate-700"
          >
            Voltar
          </button>
        </div>

        {/* Descrição */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2">
          <h2 className="text-sm font-bold text-amber-400">Fortaleça sua caminhada diária</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Complete os desafios diários de oração, leitura e atos de amor para transformar sua rotina espiritual.
          </p>
        </div>

        {/* Lista de Dias / Desafios */}
        <div className="space-y-3">
          {desafiosCelestes && desafiosCelestes.length > 0 ? (
            desafiosCelestes.map((item, index) => {
              const id = item.id || index;
              const concluido = !!desafiosConcluidos[id];

              return (
                <div 
                  key={id}
                  onClick={() => alternarConcluido(id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                    concluido 
                      ? 'bg-amber-500/10 border-amber-500/40 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                      Dia {item.dia || index + 1}
                    </span>
                    <h3 className="text-xs font-bold text-white">{item.titulo || item.tarefa}</h3>
                    <p className="text-[11px] text-slate-400">{item.descricao || item.detalhes}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition ${
                    concluido ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold text-xs' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {concluido ? '✓' : ''}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-400 text-center py-4">Nenhum desafio encontrado.</p>
          )}
        </div>

        {/* Menu de Navegação Inferior */}
        <div className="pt-4 border-t border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Home
            </button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Bíblia
            </button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-medium transition cursor-pointer text-center">
              Explorar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}