import React, { useState } from 'react';
// Importa o arquivo JSON que você baixou/substituiu
import hinosData from './data/harpa_crista.json';

export default function HarpaCrista({ onNavigate }) {
  const [busca, setBusca] = useState('');
  const [hinoSelecionado, setHinoSelecionado] = useState(null);

  // --- LÓGICA DE ADAPTAÇÃO DOS DADOS ---
  const listaHinosOriginal = Object.entries(hinosData).map(([key, value]) => ({
    id: key,
    ...value
  })).filter(item => item.id !== "-1");

  // Ordena numericamente pelo ID
  const listaHinosOrdenada = listaHinosOriginal.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Função auxiliar para limpar as tags <br> e formatar a letra
  const formatarLetra = (texto) => {
    if (!texto) return "";
    return texto.replace(/<br\s*\/?>/gi, '\n').trim();
  };

  // Filtra os hinos baseando-se na busca (Número ou Título)
  const hinosFiltrados = listaHinosOrdenada.filter((hino) => {
    const partes = hino.hino ? hino.hino.split(' - ') : ['', ''];
    const numero = partes[0];
    const titulo = partes[1] || '';
    
    const termo = busca.toLowerCase();
    return titulo.toLowerCase().includes(termo) || numero.includes(termo);
  });

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white p-4 py-6 flex flex-col items-center">
      
      {/* Moldura do Aplicativo / Celular (Padronizada igual ao Cantor Cristão) */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-2xl space-y-4 mb-10">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner">
          <button 
            type="button"
            onClick={() => {
              if (hinoSelecionado) {
                setHinoSelecionado(null); // Volta pra lista
              } else if (onNavigate) {
                onNavigate('explorar'); // Sai da tela
              }
            }}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold text-[10px] transition cursor-pointer"
          >
            ← Voltar
          </button>
          <h1 className="text-xs font-bold text-white tracking-wider uppercase">
            {hinoSelecionado ? `Hino ${hinoSelecionado.id}` : 'Harpa Cristã'}
          </h1>
          <div className="w-8"></div> {/* Espaço para balancear o botão voltar */}
        </div>

        {/* Conteúdo Dinâmico */}
        {hinoSelecionado ? (
          // --- TELA DE LEITURA DO HINO ---
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
            
            {/* Título e Número */}
            <div className="text-center border-b border-slate-800 pb-3">
               <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-widest block mb-0.5">
                 Hino Nº {hinoSelecionado.id}
               </span>
               <h2 className="text-sm font-bold text-white leading-tight">
                 {hinoSelecionado.hino ? hinoSelecionado.hino.split(' - ')[1] : "Sem Título"}
               </h2>
            </div>

            {/* Corpo da Letra */}
            <div className="space-y-4 max-h-96 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
              
              {/* Versos */}
              {Object.keys(hinoSelecionado.verses || {}).length > 0 && (
                <div className="space-y-3">
                  {Object.entries(hinoSelecionado.verses).map(([numVerse, textoVerse], idx) => (
                    <div key={idx} className="relative pl-6">
                      <span className="absolute left-0 top-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-slate-800 text-amber-400 text-[9px] font-bold border border-slate-700">
                        {numVerse}
                      </span>
                      <p className="whitespace-pre-wrap text-slate-200 text-[11px] leading-relaxed font-sans italic opacity-90">
                        {formatarLetra(textoVerse)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Coro */}
              {hinoSelecionado.coro && hinoSelecionado.coro.trim() !== "" && (
                <div className="pt-3 border-t border-dashed border-slate-700/50">
                   <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest text-center mb-1.5">Coro</h3>
                   <div className="bg-emerald-900/10 border border-emerald-800/30 p-3 rounded-xl relative overflow-hidden">
                     <p className="whitespace-pre-wrap text-emerald-100 text-[11px] leading-relaxed font-medium text-center">
                       {formatarLetra(hinoSelecionado.coro)}
                     </p>
                   </div>
                </div>
              )}

            </div>
            
            {/* Botão Fechar */}
            <button 
              type="button"
              onClick={() => setHinoSelecionado(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition border border-slate-700 cursor-pointer"
            >
              Fechar Hino
            </button>
          </div>
        ) : (
          // --- LISTA DE PESQUISA E HINOS ---
          <div className="space-y-3">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 text-xs">🔍</span>
              <input 
                type="text"
                placeholder="Pesquisar por número ou nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full py-2.5 pl-9 pr-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-[11px] outline-none focus:border-amber-500/50 transition shadow-inner"
              />
            </div>

            <div className="space-y-1.5 max-h-[420px] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
              {hinosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-[11px]">
                  Nenhum hino encontrado para "{busca}"
                </div>
              ) : (
                hinosFiltrados.map((hino) => {
                  const partes = hino.hino ? hino.hino.split(' - ') : ['?', '?'];
                  const numero = partes[0];
                  const titulo = partes[1];
                  
                  return (
                    <div 
                      key={hino.id}
                      onClick={() => setHinoSelecionado(hino)}
                      className="flex items-center justify-between bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 p-2.5 rounded-xl cursor-pointer transition shadow-inner"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 shadow">
                          {numero.padStart(3, '0')}
                        </div>
                        <div className="text-[11px] font-medium text-white truncate">
                          {titulo}
                        </div>
                      </div>

                      <span className="text-slate-600 text-xs">›</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}