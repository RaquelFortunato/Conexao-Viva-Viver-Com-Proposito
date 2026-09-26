import React, { useState } from 'react';
import { rotinaPrimeiroAmor } from './data/RotinaData';

export default function RotinaPrimeiroAmor({ onNavigate }) {
  const [tarefaSelecionada, setTarefaSelecionada] = useState(rotinaPrimeiroAmor[0]);
  const [concluidas, setConcluidas] = useState({});

  const toggleConcluida = (id) => {
    setConcluidas(prev => ({
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
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Rotina do Primeiro Amor</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('explorar')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Voltar
          </button>
        </div>

        {/* Detalhe da Tarefa Selecionada */}
        <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {tarefaSelecionada.titulo}
            </span>
            <button 
              onClick={() => toggleConcluida(tarefaSelecionada.id)}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer ${
                concluidas[tarefaSelecionada.id] 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {concluidas[tarefaSelecionada.id] ? '✓ Concluída' : 'Marcar Concluída'}
            </button>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
            <p className="text-[10px] text-amber-400 font-bold uppercase mb-1">Orientações da Tarefa</p>
            <p className="text-xs text-slate-300 leading-relaxed">{tarefaSelecionada.descricao}</p>
          </div>
        </div>

        {/* Lista de Tarefas (Seletor de 1 a 20) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Tarefas (1 a 20)</h2>
          <div className="grid grid-cols-5 gap-2 max-h-52 overflow-y-auto pr-1">
            {rotinaPrimeiroAmor.map((item) => {
              const isSelected = tarefaSelecionada.id === item.id;
              const isDone = concluidas[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => setTarefaSelecionada(item)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex flex-col items-center justify-center border ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' 
                      : isDone
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>T{item.id}</span>
                  {isDone && !isSelected && <span className="text-[8px] text-emerald-400">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}