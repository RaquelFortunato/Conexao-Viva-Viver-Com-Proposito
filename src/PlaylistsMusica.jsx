import React, { useState, useRef, useEffect } from 'react';
import { supabase } from './data/supabase'; // Ajuste o caminho se necessário

export default function PlaylistsMusica({ onNavigate }) {
  const [listaMusicas, setListaMusicas] = useState([]);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const audioRef = useRef(null);

  // Busca as músicas ao abrir
  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from('playlists_musicas')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (!error && data) {
        setListaMusicas(data);
      } else {
        console.error("Erro:", error?.message);
      }
    }
    carregar();
  }, []);

  // Selecionar música para tocar
  const tocarMusica = (musica) => {
    if (musicaAtual?.id === musica.id) {
      // Se já está tocando essa música, pausa/despausa
      togglePlayPause();
    } else {
      // Nova música
      setMusicaAtual(musica);
      setTocando(true);
      setTimeout(() => {
        if(audioRef.current) {
          audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
        }
      }, 100);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (tocando) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setTocando(!tocando);
  };

  // Atualiza barra de progresso
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgresso(audioRef.current.currentTime);
      setDuracao(audioRef.current.duration || 0);
    }
  };

  // Formata tempo MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* Cabeçalho Fixo */}
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 sticky top-0 z-10 shadow-lg">
          <button 
            onClick={() => onNavigate && onNavigate('explorar')}
            className="text-amber-400 font-semibold text-sm px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            ← Voltar
          </button>
          <h1 className="text-base font-bold text-amber-400 uppercase tracking-wide">Playlists de Músicas</h1>
          <div className="w-16"></div>
        </div>

        {/* Player Principal (Visível apenas se tiver música selecionada) */}
        {musicaAtual && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4 relative overflow-hidden">
            {/* Efeito Sonoro Visual (Opcional) */}
            <div className={`absolute inset-0 bg-amber-500/5 blur-3xl transition-opacity duration-1000 ${tocando ? 'opacity-100' : 'opacity-0'}`}></div>
            
            <div className="relative z-10 flex items-center gap-4">
              {/* Capa Placeholder */}
              <div className="w-20 h-20 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                <span className="text-3xl">🎵</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate">{musicaAtual.nome_playlist}</h3>
                <p className="text-xs text-slate-400 truncate">{musicaAtual.descricao || "Faixa Especial"}</p>
                
                {/* Barra de Progresso Customizada */}
                <div className="mt-3 space-y-1">
                  <input 
                    type="range" 
                    min="0" 
                    max={duracao || 100} 
                    value={progresso}
                    onChange={(e) => {
                      const time = parseFloat(e.target.value);
                      if(audioRef.current) {
                        audioRef.current.currentTime = time;
                        setProgresso(time);
                      }
                    }}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{formatTime(progresso)}</span>
                    <span>{formatTime(duracao)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles de Reprodução */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <button 
                onClick={() => { /* Lógica de anterior se implementarmos playlist completa */ }}
                className="text-slate-400 hover:text-white transition"
              >
                ⏮
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="w-14 h-14 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
              >
                {tocando ? '⏸' : '▶'}
              </button>
              
              <button 
                onClick={() => { /* Lógica de próxima */ }}
                className="text-slate-400 hover:text-white transition"
              >
                ⏭
              </button>
            </div>
          </div>
        )}

        {/* Elemento de Áudio Oculto (Real) */}
        <audio 
          ref={audioRef}
          src={musicaAtual?.audio_url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setTocando(false)}
          preload="metadata"
        />

        {/* Lista de Músicas Disponíveis */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Todas as Faixas</h2>
          
          <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-1 custom-scrollbar">
            {listaMusicas.map((musica) => (
              <div 
                key={musica.id}
                onClick={() => tocarMusica(musica)}
                className={`group bg-slate-900/60 hover:bg-slate-800 border p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-200 ${
                  musicaAtual?.id === musica.id 
                    ? 'border-amber-500/50 bg-amber-900/10' 
                    : 'border-slate-800/50 hover:border-amber-500/30'
                }`}
              >
                {/* Ícone de Status */}
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg border transition-colors ${
                  musicaAtual?.id === musica.id 
                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-amber-400 group-hover:border-amber-500/30'
                }`}>
                  {musicaAtual?.id === musica.id && tocando ? '♪' : '▶'}
                </div>
                
                {/* Info da Música */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${
                    musicaAtual?.id === musica.id ? 'text-amber-400' : 'text-white'
                  }`}>
                    {musica.nome_playlist}
                  </h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                    {musica.descricao || "Faixa Instrumental/Vocal"}
                  </p>
                </div>

                {/* Duração Estimada (Placeholder) */}
                <span className="text-[10px] text-slate-600 font-mono">--:--</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}