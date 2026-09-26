import React, { useState } from 'react';
import { fasesJejum, diasJejum } from './data/JejumData';

export default function JejumDaniel({ onNavigate }) {
  const [diaSelecionado, setDiaSelecionado] = useState(diasJejum[0]);
  const [concluidos, setConcluidos] = useState({});

  const toggleConcluido = (diaNum) => {
    setConcluidos(prev => ({
      ...prev,
      [diaNum]: !prev[diaNum]
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
            <p className="text-base font-bold text-amber-400 mt-0.5">Jejum de Daniel (21 Dias)</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('explorar')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Voltar
          </button>
        </div>

        {/* Resumo das Fases */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Fases da Jornada</h2>
          <div className="space-y-2">
            {fasesJejum.map((fase) => (
              <div key={fase.fase} className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                    Fase {fase.fase} (Dias {fase.diasRange[0]} a {fase.diasRange[1]})
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white mt-1">{fase.titulo}</h3>
                <p className="text-[10px] text-slate-400">{fase.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhe do Dia Selecionado */}
        <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Dia {diaSelecionado.dia}: {diaSelecionado.titulo}
            </span>
            <button 
              onClick={() => toggleConcluido(diaSelecionado.dia)}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer ${
                concluidos[diaSelecionado.dia] 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {concluidos[diaSelecionado.dia] ? '✓ Concluído' : 'Marcar Concluído'}
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-amber-400 font-bold uppercase">Versículo</p>
              <p className="text-slate-200 italic mt-0.5">{diaSelecionado.versiculo}</p>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-amber-400 font-bold uppercase">Meditação</p>
              <p className="text-slate-300 mt-0.5">{diaSelecionado.meditacao}</p>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-amber-400 font-bold uppercase">Oração</p>
              <p className="text-slate-300 mt-0.5">{diaSelecionado.oracao}</p>
            </div>
          </div>
        </div>

        {/* Lista de Dias (Seletor) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Selecione o Dia</h2>
          <div className="grid grid-cols-7 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {diasJejum.map((item) => {
              const isSelected = diaSelecionado.dia === item.dia;
              const isDone = concluidos[item.dia];
              return (
                <button
                  key={item.dia}
                  onClick={() => setDiaSelecionado(item)}
                  className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer flex flex-col items-center justify-center border ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' 
                      : isDone
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{item.dia}</span>
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