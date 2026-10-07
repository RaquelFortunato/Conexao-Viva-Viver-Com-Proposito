import React, { useState } from 'react';
// Importa o arquivo JSON que você baixou/substituiu
import hinosData from './data/harpa_crista.json';

export default function HarpaCrista({ onNavigate }) {
  const [busca, setBusca] = useState('');
  const [hinoSelecionado, setHinoSelecionado] = useState(null);

  // --- LÓGICA DE ADAPTAÇÃO DOS DADOS ---
  // Converte o objeto JSON ({ "1": {...}, "2": {...} }) em um Array ordenado
  const listaHinosOriginal = Object.entries(hinosData).map(([key, value]) => ({
    id: key,
    ...value
  })).filter(item => item.id !== "-1"); // Remove a entrada de metadados (-1) se existir

  // Ordena numericamente pelo ID
  const listaHinosOrdenada = listaHinosOriginal.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Função auxiliar para limpar as tags <br> e formatar a letra
  const formatarLetra = (texto) => {
    if (!texto) return "";
    // Substitui <br> por quebras de linha reais (\n)
    return texto.replace(/<br\s*\/?>/gi, '\n').trim();
  };

  // Filtra os hinos baseando-se na busca (Número ou Título)
  const hinosFiltrados = listaHinosOrdenada.filter((hino) => {
    // Extrai número e título do campo "hino" (ex: "1 - Chuvas de Graça")
    const partes = hino.hino ? hino.hino.split(' - ') : ['', ''];
    const numero = partes[0];
    const titulo = partes[1] || '';
    
    const termo = busca.toLowerCase();
    return titulo.toLowerCase().includes(termo) || numero.includes(termo);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 sticky top-0 z-10 shadow-lg">
          <button 
            onClick={() => {
              if (hinoSelecionado) {
                setHinoSelecionado(null); // Volta pra lista
              } else if (onNavigate) {
                onNavigate('explorar'); // Sai da tela
              }
            }}
            className="text-amber-400 font-semibold text-sm px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            ← Voltar
          </button>
          <h1 className="text-base font-bold text-amber-400 uppercase tracking-wide">Harpa Cristã</h1>
          <div className="w-16"></div> {/* Espaço vazio para centralizar o título */}
        </div>

        {/* Conteúdo Dinâmico */}
        {hinoSelecionado ? (
          // --- TELA DE LEITURA DO HINO ---
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 animate-fade-in">
            
            {/* Título e Número Grande */}
            <div className="text-center border-b border-slate-800 pb-6">
               <span className="block text-xs text-slate-500 uppercase mb-1">Hino Nº</span>
               <span className="text-4xl font-black text-amber-500 block leading-none mb-2">
                 {hinoSelecionado.id}
               </span>
               <h2 className="text-xl font-bold text-white mt-2 leading-tight">
                 {hinoSelecionado.hino ? hinoSelecionado.hino.split(' - ')[1] : "Sem Título"}
               </h2>
            </div>

            {/* Corpo da Letra */}
            <div className="space-y-6">
              
              {/* Versos */}
              {Object.keys(hinoSelecionado.verses || {}).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Versos</h3>
                  {Object.entries(hinoSelecionado.verses).map(([numVerse, textoVerse], idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <span className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-amber-400 text-[10px] font-bold border border-slate-700">
                        {numVerse}
                      </span>
                      <p className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed font-serif italic opacity-90 group-hover:opacity-100 transition">
                        {formatarLetra(textoVerse)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Coro */}
              {hinoSelecionado.coro && hinoSelecionado.coro.trim() !== "" && (
                <div className="pt-4 border-t border-dashed border-slate-700/50">
                   <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest text-center mb-3">Coro</h3>
                   <div className="bg-emerald-900/10 border border-emerald-800/30 p-4 rounded-xl relative overflow-hidden">
                     {/* Decoração sutil */}
                     <div className="absolute right-[-10px] bottom-[-10px] text-6xl opacity-5 select-none pointer-events-none">♪</div>
                     
                     <p className="whitespace-pre-wrap text-emerald-100 text-sm leading-relaxed font-medium text-center">
                       {formatarLetra(hinoSelecionado.coro)}
                     </p>
                   </div>
                </div>
              )}

            </div>
            
            {/* Botão Final */}
            <button 
              onClick={() => setHinoSelecionado(null)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition border border-slate-700"
            >
              Fechar Hino
            </button>
          </div>
        ) : (
          // --- LISTA DE PESQUISA ---
          <div className="space-y-3">
            <input 
              type="text"
              placeholder="🔍 Pesquisar por número ou nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition shadow-inner"
            />

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 custom-scrollbar">
              {hinosFiltrados.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
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
                      className="group bg-slate-900/60 hover:bg-slate-800 border border-slate-800/50 hover:border-amber-500/30 p-3 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    >
                      {/* Badge do Número */}
                      <div className="min-w-[40px] h-10 flex items-center justify-center bg-slate-800 text-amber-400 font-bold text-xs rounded-lg border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        {numero.padStart(3, '0')}
                      </div>
                      
                      {/* Título */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-200 truncate group-hover:text-white">
                          {titulo}
                        </h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                          Toque para ler
                        </p>
                      </div>

                      {/* Ícone Setinha */}
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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