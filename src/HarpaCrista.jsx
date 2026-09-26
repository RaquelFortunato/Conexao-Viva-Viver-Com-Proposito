import React, { useState } from 'react';
import hinosData from './data/harpa_crista.json';

export default function HarpaCrista({ onNavigate }) {
  const [busca, setBusca] = useState('');
  const [hinoSelecionado, setHinoSelecionado] = useState(null);

  const listaHinos = Array.isArray(hinosData) ? hinosData : (hinosData.hinos || hinosData.songs || []);

  const hinosFiltrados = listaHinos.filter((hino) => {
    const numero = String(hino.numero || hino.id || '');
    const titulo = (hino.titulo || hino.title || hino.name || '').toLowerCase();
    const termo = busca.toLowerCase();
    return titulo.includes(termo) || numero.includes(termo);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <button 
            onClick={() => {
              if (hinoSelecionado) {
                setHinoSelecionado(null);
              } else if (onNavigate) {
                onNavigate('explorar');
              }
            }}
            className="text-amber-400 font-semibold text-sm px-3 py-1 bg-slate-800 rounded-lg"
          >
            ← Voltar
          </button>
          <h1 className="text-base font-bold text-amber-400">Harpa Cristã</h1>
          <div className="w-16"></div>
        </div>

        {hinoSelecionado ? (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-center border-b border-slate-800 pb-4">
              <span className="text-xs text-amber-400 uppercase tracking-widest">Hino {hinoSelecionado.numero || hinoSelecionado.id}</span>
              <h2 className="text-lg font-bold text-white mt-1">{hinoSelecionado.titulo || hinoSelecionado.title}</h2>
            </div>
            <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed font-sans">
              {hinoSelecionado.letra || hinoSelecionado.lyrics || "Letra não encontrada."}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <input 
              type="text"
              placeholder="Pesquisar por número ou nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />

            <div className="space-y-2">
              {hinosFiltrados.map((hino, index) => (
                <div 
                  key={index}
                  onClick={() => setHinoSelecionado(hino)}
                  className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:border-amber-500/40 transition"
                >
                  <div className="flex items-center space-x-3">
                    <span className="bg-slate-800 text-amber-400 font-bold text-xs px-2.5 py-1.5 rounded-lg">
                      {hino.numero || hino.id || (index + 1)}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {hino.titulo || hino.title || hino.name}
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs">Ver →</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}