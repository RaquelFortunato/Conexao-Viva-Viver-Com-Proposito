import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase'; 

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  let videoId = '';
  if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('/embed/')) {
    return url;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

export default function Explorar({ onNavigate, userName }) {
  const [modalAtivo, setModalAtivo] = useState(null); 
  const [tipoVisualizacao, setTipoVisualizacao] = useState(null); 
  
  const [listaFabulas, setListaFabulas] = useState([]);
  const [listaMusicas, setListaMusicas] = useState([]);
  const [listaReflexoes, setListaReflexoes] = useState([]);
  const [listaMensagens, setListaMensagens] = useState([]);
  const [listaLouvores, setListaLouvores] = useState([]);
  
  const [listaPedidosOração, setListaPedidosOração] = useState([]);
  const [novoPedidoTexto, setNovoPedidoTexto] = useState('');
  const [feedbackTexto, setFeedbackTexto] = useState('');
  
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [fabulaSelecionada, setFabulaSelecionada] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const getIniciais = (nome) => {
    if (!nome) return 'RF';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const iniciaisUsuario = getIniciais(userName || 'Visitante');

  useEffect(() => {
    async function carregarConteudosEVerificarAdmin() {
      setCarregandoDados(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email === 'Raquellosnak@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Erro ao verificar admin:", err);
        setIsAdmin(false);
      }

      const { data: fabulasData } = await supabase.from('fabulas').select('*').order('criado_em', { ascending: false });
      if (fabulasData) setListaFabulas(fabulasData);

      const { data: musicasData } = await supabase.from('playlists_musicas').select('*').order('criado_em', { ascending: false });
      if (musicasData) setListaMusicas(musicasData);

      const { data: refData } = await supabase.from('reflexao_dia').select('*').order('created_at', { ascending: false });
      if (refData) setListaReflexoes(refData);

      const { data: msgData } = await supabase.from('mensagem_dia').select('*').order('created_at', { ascending: false });
      if (msgData) setListaMensagens(msgData);

      const { data: louvorData } = await supabase.from('louvor_dia').select('*').order('created_at', { ascending: false });
      if (louvorData) setListaLouvores(louvorData);

      const { data: oracaoData } = await supabase.from('pedidos_oracao').select('*').order('created_at', { ascending: false });
      if (oracaoData && oracaoData.length > 0) {
        setListaPedidosOração(oracaoData);
      } else {
        setListaPedidosOração([]);
      }

      setCarregandoDados(false);
    }

    carregarConteudosEVerificarAdmin();
  }, []);

  const handleEnviarPedidoOracao = async () => {
    if (!novoPedidoTexto.trim()) {
      alert('Por favor, escreva o seu pedido de oração.');
      return;
    }

    const novoItem = {
      nome_usuario: userName || 'Membro Conexão Viva',
      iniciais: iniciaisUsuario,
      conteudo: novoPedidoTexto.trim(),
      oracoes_count: 0,
      created_at: new Date().toISOString()
    };

    try {
      const { data, error } = await supabase.from('pedidos_oracao').insert([novoItem]).select();
      if (!error && data) {
        setListaPedidosOração([data[0], ...listaPedidosOração]);
      } else {
        setListaPedidosOração([novoItem, ...listaPedidosOração]);
      }
    } catch (err) {
      setListaPedidosOração([novoItem, ...listaPedidosOração]);
    }

    setNovoPedidoTexto('');
    setModalAtivo(null);
    alert('🙏 Pedido de oração enviado com sucesso para o mural!');
  };

  const handleEnviarFeedback = async () => {
    if (!feedbackTexto.trim()) {
      alert('Por favor, escreva sua sugestão ou feedback.');
      return;
    }

    try {
      await supabase.from('feedbacks').insert([{
        usuario: userName || 'Anônimo',
        mensagem: feedbackTexto.trim(),
        created_at: new Date().toISOString()
      }]);
    } catch (e) {}

    setFeedbackTexto('');
    setModalAtivo(null);
    alert('✨ Muito obrigado! Sua sugestão foi enviada com sucesso.');
  };

  const handleCompartilharApp = () => {
    const texto = `🌟 Olá! Conheça o *Conexão Viva - Viver com Propósito*, um aplicativo incrível para fortalecer sua fé, ler a Palavra, acompanhar planos bíblicos, hinos e muito mais! 📖✨\n\nBaixe agora e venha caminhar conosco: ${window.location.origin}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(urlWhatsApp, '_blank');
  };

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

        {/* FÁBULAS */}
        {tipoVisualizacao === 'fabulas' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">📖 Histórias</h2>
              <button 
                type="button"
                onClick={() => { setTipoVisualizacao(null); setFabulaSelecionada(null); }}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl cursor-pointer transition"
              >
                ← Voltar à Lista
              </button>
            </div>

            {fabulaSelecionada ? (
              <div className="bg-slate-950/80 border border-slate-700 p-5 rounded-2xl space-y-4 shadow-lg">
                <h3 className="text-xl font-bold text-white leading-tight">{fabulaSelecionada.titulo}</h3>
                <div className="max-h-[60vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
                  <p className="text-base text-slate-200 leading-relaxed whitespace-pre-line font-serif italic opacity-90">
                    {fabulaSelecionada.conteudo}
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFabulaSelecionada(null)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-sm font-bold rounded-xl cursor-pointer transition border border-slate-700"
                >
                  Ler Outra História
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
                {listaFabulas.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">Nenhuma fábula encontrada.</p>
                ) : (
                  listaFabulas.map((fabula) => (
                    <div 
                      key={fabula.id}
                      onClick={() => setFabulaSelecionada(fabula)}
                      className="group bg-slate-950/60 border border-slate-800 p-4 rounded-2xl hover:border-amber-500/50 hover:bg-slate-900 transition cursor-pointer shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition line-clamp-1">{fabula.titulo}</h3>
                        <span className="text-amber-500/30 group-hover:text-amber-500 transition ml-2">›</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-1 line-clamp-2">{fabula.conteudo}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : tipoVisualizacao === 'musicas' ? (
          /* MÚSICAS */
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">🎧 Playlists</h2>
              <button 
                type="button"
                onClick={() => setTipoVisualizacao(null)}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl cursor-pointer transition"
              >
                ← Voltar à Lista
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
              {listaMusicas.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">Nenhuma música encontrada.</p>
              ) : (
                listaMusicas.map((musica) => (
                  <div 
                    key={musica.id}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400">♪</div>
                       <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{musica.nome_playlist}</h3>
                          {musica.descricao && <p className="text-[10px] text-slate-400 truncate">{musica.descricao}</p>}
                       </div>
                    </div>
                    {musica.audio_url && (
                      <div className="pt-1">
                        <audio controls className="w-full h-10 rounded-lg opacity-90">
                          <source src={musica.audio_url} type="audio/mp3" />
                        </audio>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : tipoVisualizacao === 'videos_reflexao' || tipoVisualizacao === 'videos_mensagem' || tipoVisualizacao === 'videos_louvor' ? (
          /* VÍDEOS (MENSAGENS / REFLEXÕES / LOUVORES) */
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
                {tipoVisualizacao === 'videos_reflexao' && '📖 Reflexões'}
                {tipoVisualizacao === 'videos_mensagem' && '🕊️ Mensagens'}
                {tipoVisualizacao === 'videos_louvor' && '🎶 Louvores'}
              </h2>
              <button 
                type="button"
                onClick={() => setTipoVisualizacao(null)}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl cursor-pointer transition"
              >
                ← Voltar
              </button>
            </div>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
              {(tipoVisualizacao === 'videos_reflexao' ? listaReflexoes : 
                tipoVisualizacao === 'videos_mensagem' ? listaMensagens : listaLouvores).length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">Nenhum vídeo encontrado.</p>
              ) : (
                (tipoVisualizacao === 'videos_reflexao' ? listaReflexoes : 
                 tipoVisualizacao === 'videos_mensagem' ? listaMensagens : listaLouvores).map((item) => (
                  <div key={item.id} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl space-y-2 shadow-inner">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white">{item.titulo || (tipoVisualizacao === 'videos_reflexao' ? 'Reflexão' : tipoVisualizacao === 'videos_mensagem' ? 'Mensagem' : 'Louvor')}</h3>
                      <span className="text-[10px] text-slate-400">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    {item.link && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                        <iframe
                          className="w-full h-full border-0"
                          src={getYouTubeEmbedUrl(item.link)}
                          title="Vídeo"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* TELA EXPLORAR PRINCIPAL */
          <>
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Jornadas Espirituais</h2>
              <div className="grid grid-cols-2 gap-2">
                <div onClick={() => onNavigate && onNavigate('jejum')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-base">🌾</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Desintoxicação</p>
                  <h3 className="text-xs font-bold text-white">Jejum de Daniel</h3>
                  <p className="text-[10px] text-slate-400 leading-tight">Guia espiritual e cronograma de 21 dias.</p>
                </div>
                <div onClick={() => onNavigate && onNavigate('rotina')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-base">☀️</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Devoção</p>
                  <h3 className="text-xs font-bold text-white">Rotina Primeiro Amor</h3>
                  <p className="text-[10px] text-slate-400 leading-tight">Restaure sua intimidade matinal.</p>
                </div>
              </div>
            </div>

            <div onClick={() => onNavigate && onNavigate('desafioceleste')} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
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

            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Vídeos & Mensagens</h2>
              <div className="grid grid-cols-1 gap-2">
                <div onClick={() => setTipoVisualizacao('videos_reflexao')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-base">📖</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Reflexões</h3>
                      <p className="text-[10px] text-slate-400">{listaReflexoes.length} vídeos salvos</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('videos_mensagem')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-base">🕊️</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Mensagens</h3>
                      <p className="text-[10px] text-slate-400">{listaMensagens.length} vídeos salvos</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('videos_louvor')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-base">🎶</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Louvores</h3>
                      <p className="text-[10px] text-slate-400">{listaLouvores.length} vídeos salvos</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Estudo & Leitura</h2>
              <div className="space-y-2">
                <div onClick={() => setTipoVisualizacao('fabulas')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">📜</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Fábulas & Ensinamentos</h3>
                      <p className="text-[10px] text-slate-400">{listaFabulas.length} histórias prontas</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('musicas')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">🎧</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Playlists de Músicas (Áudio)</h3>
                      <p className="text-[10px] text-slate-400">{listaMusicas.length} faixas carregadas</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>
              </div>
            </div>

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

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCompartilharApp}
                className="bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 p-3 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 shadow-inner"
              >
                <span className="text-lg">📱</span>
                <span className="text-xs font-bold text-emerald-300">Compartilhar App</span>
                <span className="text-[9px] text-emerald-400/80">Convide amigos via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setModalAtivo('feedback')}
                className="bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 p-3 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 shadow-inner"
              >
                <span className="text-lg">💬</span>
                <span className="text-xs font-bold text-amber-400">Feedback & Sugestões</span>
                <span className="text-[9px] text-slate-400">Ajude-nos a melhorar</span>
              </button>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">Mural de Oração</h2>
                <button 
                  type="button"
                  onClick={() => setModalAtivo('pedido')}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer"
                >
                  + Pedir Oração
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
                {listaPedidosOração.length === 0 ? (
                  <p className="text-[11px] text-slate-400 text-center py-4">Nenhum pedido no mural ainda. Seja o primeiro a pedir oração!</p>
                ) : (
                  listaPedidosOração.map((item, index) => (
                    <div key={item.id || index} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-300">{item.iniciais || 'MC'} • {item.nome_usuario || 'Membro'}</span>
                        <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Hoje'}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic">"{item.conteudo}"</p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                        <span className="font-semibold text-amber-400 cursor-pointer hover:underline">🤍 Quero Orar ({item.oracoes_count || 0})</span>
                        <span className="text-slate-500">Ativo</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button type="button" onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Home</button>
            <button type="button" onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Bíblia</button>
            <button type="button" onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Planos</button>
            <button type="button" onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Explorar</button>
            <button type="button" onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Config</button>
            
            {isAdmin && (
              <button 
                type="button"
                onClick={() => onNavigate && onNavigate('admin')} 
                className="p-2 bg-slate-950/60 border border-amber-500/30 rounded-xl text-amber-400 text-[9px] font-bold cursor-pointer hover:bg-amber-500 hover:text-slate-950 transition shadow-inner"
              >
                Admin
              </button>
            )}
          </div>
        </div>

      </div>

      {modalAtivo === 'pedido' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <span className="text-3xl">🙏</span>
            <h3 className="text-base font-bold text-amber-400">Compartilhe seu Pedido</h3>
            <textarea 
              value={novoPedidoTexto}
              onChange={(e) => setNovoPedidoTexto(e.target.value)}
              placeholder="Escreva aqui o motivo da sua oração..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 h-24 resize-none"
            ></textarea>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={handleEnviarPedidoOracao}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Enviar
              </button>
              <button 
                type="button"
                onClick={() => setModalAtivo(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalAtivo === 'feedback' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <span className="text-3xl">💬</span>
            <h3 className="text-base font-bold text-amber-400">Feedback & Sugestões</h3>
            <p className="text-[11px] text-slate-400">Sua opinião é fundamental para melhorarmos o Conexão Viva!</p>
            <textarea 
              value={feedbackTexto}
              onChange={(e) => setFeedbackTexto(e.target.value)}
              placeholder="Digite sua sugestão, elogio ou relato de erro..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 h-24 resize-none"
            ></textarea>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={handleEnviarFeedback}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Enviar Sugestão
              </button>
              <button 
                type="button"
                onClick={() => setModalAtivo(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}