import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase'; 

export default function Explorar({ onNavigate, userName }) {
  const [modalAtivo, setModalAtivo] = useState(null); 
  const [tipoVisualizacao, setTipoVisualizacao] = useState(null); // 'fabulas' ou 'musicas'
  
  // Estados para armazenar os dados vindos do banco
  const [listaFabulas, setListaFabulas] = useState([]);
  const [listaMusicas, setListaMusicas] = useState([]);
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [fabulaSelecionada, setFabulaSelecionada] = useState(null);

  const getIniciais = (nome) => {
    if (!nome) return 'RF';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const iniciaisUsuario = getIniciais(userName || 'Raquel Fortunato');

  // --- BUSCA AUTOMÁTICA DOS DADOS DO SUPABASE ---
  useEffect(() => {
    async function carregarConteudos() {
      setCarregandoDados(true);
      
      // Busca Fábulas
      const { data: fabulasData, error: errFabulas } = await supabase
        .from('fabulas')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (!errFabulas && fabulasData) {
        setListaFabulas(fabulasData);
      } else {
        console.error("Erro fábulas:", errFabulas);
      }

      // Busca Músicas
      const { data: musicasData, error: errMusicas } = await supabase
        .from('playlists_musicas')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (!errMusicas && musicasData) {
        setListaMusicas(musicasData);
      } else {
        console.error("Erro músicas:", errMusicas);
      }

      setCarregandoDados(false);
    }

    carregarConteudos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center relative">
      
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Explorar</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            {iniciaisUsuario}
          </div>
        </div>

        {/* SE ESTIVER VENDO A LISTA DE FÁBULAS */}
        {tipoVisualizacao === 'fabulas' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-400">📖 Fábulas & Ensinamentos</h2>
              <button 
                onClick={() => { setTipoVisualizacao(null); setFabulaSelecionada(null); }}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1 rounded-xl cursor-pointer"
              >
                ← Voltar
              </button>
            </div>

            {fabulaSelecionada ? (
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-amber-400">{fabulaSelecionada.titulo}</h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{fabulaSelecionada.conteudo}</p>
                <button 
                  onClick={() => setFabulaSelecionada(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Ver Outras Histórias
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {listaFabulas.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">Nenhuma fábula encontrada.</p>
                ) : (
                  listaFabulas.map((fabula) => (
                    <div 
                      key={fabula.id}
                      onClick={() => setFabulaSelecionada(fabula)}
                      className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl hover:border-amber-500/40 transition cursor-pointer"
                    >
                      <h3 className="text-xs font-bold text-white">{fabula.titulo}</h3>
                      <p className="text-[10px] text-slate-400 truncate mt-1">{fabula.conteudo}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : tipoVisualizacao === 'musicas' ? (
          /* SE ESTIVER VENDO A LISTA DE MÚSICAS */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-400">🎧 Playlists de Músicas</h2>
              <button 
                onClick={() => setTipoVisualizacao(null)}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1 rounded-xl cursor-pointer"
              >
                ← Voltar
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {listaMusicas.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Nenhuma música encontrada.</p>
              ) : (
                listaMusicas.map((musica) => (
                  <div 
                    key={musica.id}
                    className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl space-y-2"
                  >
                    <h3 className="text-xs font-bold text-white">{musica.nome_playlist}</h3>
                    {musica.descricao && <p className="text-[10px] text-slate-400">{musica.descricao}</p>}
                    
                    {musica.audio_url && (
                      <audio controls className="w-full h-8 mt-2">
                        <source src={musica.audio_url} type="audio/mp3" />
                        Seu navegador não suporta elemento de áudio.
                      </audio>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* TELA NORMAL COMPLETA DE EXPLORAR */
          <>
            {/* 1. Jornadas & Hábitos Diários */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Jornadas Espirituais</h2>
              <div className="grid grid-cols-2 gap-2">
                <div 
                  onClick={() => onNavigate && onNavigate('jejum')}
                  className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer"
                >
                  <span className="text-amber-400 text-base">🌾</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Desintoxicação</p>
                  <h3 className="text-xs font-bold text-white">Jejum de Daniel</h3>
                  <p className="text-[10px] text-slate-400 leading-tight">Guia espiritual e cronograma de 21 dias.</p>
                </div>
                <div 
                  onClick={() => onNavigate && onNavigate('rotina')}
                  className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer"
                >
                  <span className="text-amber-400 text-base">☀️</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Devoção</p>
                  <h3 className="text-xs font-bold text-white">Rotina Primeiro Amor</h3>
                  <p className="text-[10px] text-slate-400 leading-tight">Restaure sua intimidade matinal.</p>
                </div>
              </div>
            </div>

            {/* 2. Desafios */}
            <div 
              onClick={() => onNavigate && onNavigate('desafioceleste')}
              className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg p-2 bg-slate-900 rounded-xl border border-slate-800">🎯</span>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Meta Semanal</p>
                  <h3 className="text-xs font-bold text-white">Desafio Celeste</h3>
                  <p className="text-[10px] text-slate-400">Oração constante e atos de bondade.</p>
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </div>

            {/* 3. Conteúdo Educativo & Musical (AGORA CONECTADO AO SUPABASE!) */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Estudo & Louvor</h2>
              
              <div className="space-y-2">
                <div 
                  onClick={() => setTipoVisualizacao('fabulas')}
                  className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">📖</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Fábulas & Ensinamentos</h3>
                      <p className="text-[10px] text-slate-400">
                        {carregandoDados ? "Carregando..." : `${listaFabulas.length} histórias prontas`}
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div 
                  onClick={() => setTipoVisualizacao('musicas')}
                  className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">🎧</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Playlists de Músicas</h3>
                      <p className="text-[10px] text-slate-400">
                         {carregandoDados ? "Buscando áudios..." : `${listaMusicas.length} faixas carregadas`}
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>
              </div>
            </div>

            {/* 4. Acervo Hinoário */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acervo Hinoário</h2>
                <span className="text-[10px] text-amber-400 font-semibold">Completo</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div onClick={() => onNavigate && onNavigate('HarpaCrista')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-sm">🎶</span>
                  <h3 className="text-xs font-bold text-white">Harpa Cristã</h3>
                  <p className="text-[10px] text-slate-400">640 Hinos Clássicos</p>
                </div>
                <div onClick={() => onNavigate && onNavigate('cantor-cristao')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-sm">🎵</span>
                  <h3 className="text-xs font-bold text-white">Cantor Cristão</h3>
                  <p className="text-[10px] text-slate-400">577 Canções Preciosas</p>
                </div>
              </div>
            </div>

            {/* 5. Mural de Oração */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">Mural de Oração</h2>
                </div>
                <button 
                  onClick={() => setModalAtivo('pedido')}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer"
                >
                  + Pedir Oração
                </button>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">MG • Maria das Graças</span>
                  <span>Há 12 min</span>
                </div>
                <p className="text-[11px] text-slate-300 italic">"Peço orações pela cura e restauração da saúde do meu irmão Lucas no hospital."</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                  <span className="font-semibold text-slate-400">🤍 Quero Orar (42)</span>
                  <span className="text-slate-500">Notificação ativa</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Menu de Navegação Inferior */}
        <div className="pt-3 border-t border-slate-800">
          <div className="grid grid-cols-5 gap-1 text-center">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer">Home</button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer">Bíblia</button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer">Planos</button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Explorar</button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer">Config</button>
          </div>
        </div>

      </div>

      {/* MODAL DE PEDIDO DE ORAÇÃO */}
      {modalAtivo === 'pedido' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <span className="text-3xl">🙏</span>
            <h3 className="text-base font-bold text-amber-400">Compartilhe seu Pedido</h3>
            <textarea 
              placeholder="Escreva aqui o motivo da sua oração..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 h-24 resize-none"
            ></textarea>
            <div className="flex gap-2">
              <button 
                onClick={() => { alert('Pedido enviado para a comunidade!'); setModalAtivo(null); }}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Enviar
              </button>
              <button 
                onClick={() => setModalAtivo(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}