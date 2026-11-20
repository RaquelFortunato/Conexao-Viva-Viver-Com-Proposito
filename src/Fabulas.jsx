import React, { useState, useEffect } from 'react';
// ⬇️ CORREÇÃO FEITA AQUI: Removi as ".." porque estamos na mesma raiz do src
import { supabase } from './data/supabase'; 

export default function Fabulas({ onNavigate }) {
  const [listaFabulas, setListaFabulas] = useState([]);
  const [fabaSelecionada, setFabaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0); // Para navegar entre próximas/anteriores

  // Busca as fábulas ao abrir
  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from('fabulas')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (!error && data) {
        setListaFabulas(data);
      } else {
        console.error("Erro:", error?.message);
      }
      setCarregando(false);
    }
    carregar();
  }, []);

  // Função para selecionar uma fábula específica
  const selecionarFabula = (index) => {
    setIndiceAtual(index);
    setFabaSelecionada(listaFabulas[index]);
  };

  // Navegação Próxima/Anterior
  const proximaFabula = () => {
    if (indiceAtual < listaFabulas.length - 1) {
      selecionarFabula(indiceAtual + 1);
    }
  };

  const fabulaAnterior = () => {
    if (indiceAtual > 0) {
      selecionarFabula(indiceAtual - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* Cabeçalho Fixo */}
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 sticky top-0 z-10 shadow-lg">
          <button 
            onClick={() => {
              if (fabaSelecionada) {
                setFabaSelecionada(null); // Volta pra lista
              } else if (onNavigate) {
                onNavigate('explorar'); // Sai da tela
              }
            }}
            className="text-amber-400 font-semibold text-sm px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            ← Voltar
          </button>
          <h1 className="text-base font-bold text-amber-400 uppercase tracking-wide">Fábulas & Ensinamentos</h1>
          <div className="w-16"></div>
        </div>

        {/* Conteúdo Dinâmico */}
        {carregando ? (
          <div className="text-center py-20 text-slate-400">Carregando histórias...</div>
        ) : fabaSelecionada ? (
          // --- TELA DE LEITURA DA FÁBULA ---
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 animate-fade-in min-h-[60vh] flex flex-col justify-between">
            
            {/* Título e Índice */}
            <div className="border-b border-slate-800 pb-4">
               <span className="block text-xs text-slate-500 uppercase mb-1">História {indiceAtual + 1} de {listaFabulas.length}</span>
               <h2 className="text-xl font-bold text-white mt-2 leading-tight font-serif">
                 {fabaSelecionada.titulo || "Sem Título"}
               </h2>
            </div>

            {/* Texto da História (Estilo Livro) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <p className="whitespace-pre-wrap text-slate-200 text-base leading-relaxed font-serif italic opacity-95">
                {fabaSelecionada.conteudo || "Conteúdo indisponível."}
              </p>
            </div>

            {/* Botões de Navegação */}
            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button 
                onClick={fabulaAnterior}
                disabled={indiceAtual === 0}
                className={`flex-1 py-3 rounded-xl font-medium text-sm transition ${
                  indiceAtual === 0 
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                ← Anterior
              </button>
              
              <button 
                onClick={proximaFabula}
                disabled={indiceAtual === listaFabulas.length - 1}
                className={`flex-1 py-3 rounded-xl font-medium text-sm transition ${
                  indiceAtual === listaFabulas.length - 1
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg'
                }`}
              >
                Próxima →
              </button>
            </div>
          </div>
        ) : (
          // --- LISTA DE HISTÓRIAS DISPONÍVEIS ---
          <div className="space-y-3">
            <input 
              type="text"
              placeholder="🔍 Pesquisar por título..."
              onChange={(e) => {
                const termo = e.target.value.toLowerCase();
                const filtradas = listaFabulas.filter(f => 
                  (f.titulo || '').toLowerCase().includes(termo)
                );
                // Nota: Em produção idealizaríamos um estado separado para busca dinâmica aqui
                // Por simplicidade neste exemplo, mantemos a lista completa abaixo
              }}
              className="hidden" 
            />

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 custom-scrollbar">
              {listaFabulas.map((faba, index) => (
                <div 
                  key={faba.id}
                  onClick={() => selecionarFabula(index)}
                  className="group bg-slate-900/60 hover:bg-slate-800 border border-slate-800/50 hover:border-amber-500/30 p-4 rounded-xl flex items-start gap-4 cursor-pointer transition-all duration-200 active:scale-[0.98]"
                >
                  {/* Ícone Genérico ou Capa */}
                  <div className="mt-1 w-12 h-12 flex-shrink-0 flex items-center justify-center bg-slate-800 text-amber-400 rounded-lg border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors text-xl">
                    📖
                  </div>
                  
                  {/* Texto Resumo */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-400">
                      {faba.titulo}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                      {faba.conteudo ? faba.conteudo.substring(0, 120) + "..." : "Toque para ler esta história edificante."}
                    </p>
                  </div>

                  {/* Setinha */}
                  <svg className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-all mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}