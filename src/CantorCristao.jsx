import React, { useState, useEffect } from 'react';
import hinosData from './data/cantor_cristao.json';

export default function CantorCristao({ onNavigate }) {
  const [hinos, setHinos] = useState([]);
  const [hinoSelecionado, setHinoSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroAba, setFiltroAba] = useState('todos'); // 'todos' ou 'favoritos'
  const [favoritos, setFavoritos] = useState(() => {
    const salvo = localStorage.getItem('hinos_favoritos');
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    let listaHinos = [];
    if (Array.isArray(hinosData)) {
      listaHinos = hinosData;
    } else if (hinosData.hinos) {
      listaHinos = hinosData.hinos;
    } else if (hinosData.songs) {
      listaHinos = hinosData.songs;
    }
    setHinos(listaHinos);
  }, []);

  useEffect(() => {
    localStorage.setItem('hinos_favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (hino, e) => {
    if (e) e.stopPropagation();
    const idHino = hino.numero || hino.id || hino.titulo;
    if (favoritos.includes(idHino)) {
      setFavoritos(favoritos.filter(item => item !== idHino));
    } else {
      setFavoritos([...favoritos, idHino]);
    }
  };

  const isFavorito = (hino) => {
    const idHino = hino.numero || hino.id || hino.titulo;
    return favoritos.includes(idHino);
  };

  const hinosFiltrados = hinos.filter((hino) => {
    const numero = String(hino.numero || hino.id || '');
    const titulo = (hino.titulo || hino.title || hino.name || '').toLowerCase();
    const termo = busca.toLowerCase();
    
    const correspondeBusca = titulo.includes(termo) || numero.includes(termo);
    
    if (filtroAba === 'favoritos') {
      return correspondeBusca && isFavorito(hino);
    }
    return correspondeBusca;
  });

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white p-4 py-6 flex flex-col items-center">
      
      {/* Moldura do Aplicativo / Celular (Padronizada igual às outras telas) */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-2xl space-y-4 mb-10">
        
        {/* Cabeçalho com Botão Voltar */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner">
          {hinoSelecionado ? (
            <button 
              type="button"
              onClick={() => setHinoSelecionado(null)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold text-[10px] transition cursor-pointer"
            >
              ← Voltar
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('explorar')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold text-[10px] transition cursor-pointer"
            >
              ← Voltar
            </button>
          )}

          <h1 className="text-xs font-bold text-white tracking-wider">
            {hinoSelecionado ? `Hino ${hinoSelecionado.numero || ''}` : 'Cantor Cristão'}
          </h1>

          {hinoSelecionado ? (
            <button 
              type="button"
              onClick={(e) => toggleFavorito(hinoSelecionado, e)}
              className="text-base cursor-pointer"
              style={{ color: isFavorito(hinoSelecionado) ? '#ff4757' : '#fff' }}
            >
              {isFavorito(hinoSelecionado) ? '♥' : '♡'}
            </button>
          ) : (
            <div className="w-6"></div>
          )}
        </div>

        {/* Barra de Pesquisa e Abas (Apenas na listagem geral) */}
        {!hinoSelecionado && (
          <div className="space-y-2.5">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 text-xs">🔍</span>
              <input 
                type="text" 
                placeholder="Pesquisar hino por nome ou número..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full py-2.5 pl-9 pr-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-[11px] outline-none focus:border-amber-500/50 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFiltroAba('todos')}
                className={`py-2 rounded-xl text-[10px] font-bold transition cursor-pointer ${filtroAba === 'todos' ? 'bg-amber-400 text-slate-950 shadow' : 'bg-slate-950/60 text-slate-300 border border-slate-800'}`}
              >
                Hinário
              </button>
              <button
                type="button"
                onClick={() => setFiltroAba('favoritos')}
                className={`py-2 rounded-xl text-[10px] font-bold transition cursor-pointer ${filtroAba === 'favoritos' ? 'bg-amber-400 text-slate-950 shadow' : 'bg-slate-950/60 text-slate-300 border border-slate-800'}`}
              >
                ♥ Favoritos ({favoritos.length})
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo: Letra do Hino ou Lista (BARRA LATERAL BRANCA REMOVIDA) */}
        <div className="space-y-2">
          {hinoSelecionado ? (
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
              <div className="text-center pb-2 border-b border-slate-800">
                <h2 className="text-xs font-bold text-white mb-1">
                  {hinoSelecionado.titulo || hinoSelecionado.title || hinoSelecionado.name}
                </h2>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
                  Hino {hinoSelecionado.numero || hinoSelecionado.id}
                </span>
              </div>

              <div className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap font-sans max-h-96 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
                {hinoSelecionado.letra || hinoSelecionado.lyrics || hinoSelecionado.text || hinoSelecionado.content || "Letra não disponível."}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[420px] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
              {hinosFiltrados.length === 0 ? (
                <div className="text-center text-slate-400 py-8 text-[11px]">
                  Nenhum hino encontrado.
                </div>
              ) : (
                hinosFiltrados.map((hino, index) => {
                  const numero = hino.numero || hino.id || (index + 1);
                  const titulo = hino.titulo || hino.title || hino.name || `Hino ${index + 1}`;
                  const favorito = isFavorito(hino);

                  return (
                    <div
                      key={index}
                      onClick={() => setHinoSelecionado(hino)}
                      className="flex items-center justify-between bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 p-2.5 rounded-xl cursor-pointer transition shadow-inner"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 shadow">
                          {numero}
                        </div>
                        <div className="text-[11px] font-medium text-white truncate">
                          {titulo}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleFavorito(hino, e)}
                        className="text-sm cursor-pointer p-1 shrink-0"
                        style={{ color: favorito ? '#ff4757' : '#64748b' }}
                      >
                        {favorito ? '♥' : '♡'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}