import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase'; 

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  let linkLimpo = url.replace('ww.youtube.com', 'www.youtube.com');
  let videoId = '';
  if (linkLimpo.includes('watch?v=')) {
    videoId = linkLimpo.split('watch?v=')[1]?.split('&')[0];
  } else if (linkLimpo.includes('youtu.be/')) {
    videoId = linkLimpo.split('youtu.be/')[1]?.split('?')[0];
  } else if (linkLimpo.includes('/embed/')) {
    videoId = linkLimpo.split('/embed/')[1]?.split('?')[0];
  } else if (linkLimpo.includes('/shorts/')) {
    videoId = linkLimpo.split('/shorts/')[1]?.split('?')[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&cc_load_policy=0&iv_load_policy=3&hl=pt` : '';
}

export default function Home({ onNavigate, userName }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const [citacaoHoje, setCitacaoHoje] = useState(null);
  const [reflexaoHoje, setReflexaoHoje] = useState(null);
  const [oracaoHoje, setOracaoHoje] = useState(null);

  const getIniciais = (nome) => {
    if (!nome) return 'RF';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const iniciaisUsuario = getIniciais(userName || 'Raquel Fortunato');

  useEffect(() => {
    async function carregarDadosHome() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (user.email && user.email.toLowerCase() === 'raquellosnak@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          const { data: perfilData, error: perfilError } = await supabase
            .from('perfis_usuario')
            .select('foto_url, foto_perfil')
            .eq('id', user.id)
            .single();

          if (perfilData && !perfilError) {
            if (perfilData.foto_url || perfilData.foto_perfil) {
              setFotoPerfil(perfilData.foto_url || perfilData.foto_perfil);
            }
          }
        }

        const { data: citData } = await supabase
          .from('citacao_dia')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (citData && citData.length > 0) setCitacaoHoje(citData[0]);

        const { data: refData } = await supabase
          .from('reflexao_dia')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (refData && refData.length > 0) setReflexaoHoje(refData[0]);

        const { data: orcData } = await supabase
          .from('oracao_dia')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (orcData && orcData.length > 0) setOracaoHoje(orcData[0]);

      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      }
    }
    carregarDadosHome();
  }, []);

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-4 py-8 flex flex-col items-center relative overflow-y-auto">
      
      {/* Brilho ambiental sutil ao fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TELA PRINCIPAL ARREDONDADA E UNIFICADA (ESTILO GOOGLE SITES) */}
      <div className="w-full max-w-md bg-[#0E1525] border border-slate-800/80 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md space-y-6 z-10 my-auto">
        
        {/* TOPO: PERFIL E SAUDAÇÃO */}
        <div className="flex items-center justify-between bg-[#070B14] border border-slate-800/60 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">• Viver com Propósito</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Tela Inicial</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              iniciaisUsuario
            )}
          </div>
        </div>

        {/* DEVOCIONAL DE HOJE (FLUIDO E LIMPO, SEM CAIXAS SEPARADAS) */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-amber-400 tracking-wider">DEVOCIONAL DE HOJE</span>
            <span className="text-slate-400 font-normal text-[10px]">Hoje</span>
          </div>
          <div className="space-y-1 px-1">
            <h2 className="text-base font-serif font-bold text-white">Paz e Renovação Interior</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conecte seu coração ao propósito divino para a sua jornada hoje.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800/50 my-2" />

        {/* CITAÇÃO DO DIA (TÍTULO FORA, TEXTO COM ACABAMENTO ELEGANTE) */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-amber-400 tracking-wider px-1">CITAÇÃO DO DIA</h3>
          <div className="bg-[#070B14] border border-slate-800/60 p-5 rounded-2xl shadow-inner">
            <p className="font-serif italic text-slate-200 text-sm leading-relaxed text-center">
              {citacaoHoje ? `"${citacaoHoje.conteudo}"` : '"Aquietai-vos e sabeis que eu sou Deus; serei exaltado entre as nações; serei exaltado sobre a terra."'}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800/50 my-2" />

        {/* REFLEXÃO DO DIA (TÍTULO ISOLADO FORA, VÍDEO VERTICAL DIRETO) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 tracking-wider px-1">REFLEXÃO DO DIA</h3>
          <div className="flex justify-center">
            <div className="w-56 h-96 rounded-2xl overflow-hidden bg-black shadow-xl flex items-center justify-center border border-slate-800/60">
              {reflexaoHoje && getYouTubeEmbedUrl(reflexaoHoje.link) ? (
                <iframe
                  src={getYouTubeEmbedUrl(reflexaoHoje.link)}
                  title="Reflexão do Dia"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-slate-500 text-xs text-center p-4">
                  Vídeo em breve
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 my-2" />

        {/* ORAÇÃO DO DIA (TÍTULO ISOLADO FORA, VÍDEO VERTICAL DIRETO) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 tracking-wider px-1">ORAÇÃO DO DIA</h3>
          <div className="flex justify-center">
            <div className="w-56 h-96 rounded-2xl overflow-hidden bg-black shadow-xl flex items-center justify-center border border-slate-800/60">
              {oracaoHoje && getYouTubeEmbedUrl(oracaoHoje.link) ? (
                <iframe
                  src={getYouTubeEmbedUrl(oracaoHoje.link)}
                  title="Oração do Dia"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-slate-500 text-xs text-center p-4">
                  Vídeo em breve
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MENU DE NAVEGAÇÃO INFERIOR */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center bg-[#070B14] p-2 rounded-2xl border border-slate-800/60`}>
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 rounded-xl text-[9px] font-bold shadow-md cursor-pointer">Home</button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-transparent border-0 text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer transition-all">Bíblia</button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-transparent border-0 text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer transition-all">Planos</button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-transparent border-0 text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer transition-all">Explorar</button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-transparent border-0 text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer transition-all">Config</button>
            {isAdmin && (
              <button onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-transparent border-0 text-amber-400 hover:text-white text-[9px] font-bold cursor-pointer transition-all">Admin</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}