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
  }
  // Parâmetros blindados contra legendas automáticas: cc_load_policy=0 e iv_load_policy=3
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&cc_load_policy=0&iv_load_policy=3&hl=pt` : '';
}

export default function Home({ onNavigate, userName }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Estados para os conteúdos diários vindos do Supabase
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

        // Carrega a Citação do Dia mais recente
        const { data: citData } = await supabase
          .from('citacao_dia')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (citData && citData.length > 0) setCitacaoHoje(citData[0]);

        // Carrega a Reflexão do Dia mais recente
        const { data: refData } = await supabase
          .from('reflexao_dia')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (refData && refData.length > 0) setReflexaoHoje(refData[0]);

        // Carrega a Oração do Dia mais recente
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
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
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

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold tracking-wider">
            <span>🟡 DEVOCIONAL DE HOJE</span>
            <span className="text-slate-400 font-normal">Hoje</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Paz e Renovação Interior</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Conecte seu coração ao propósito divino para a sua jornada hoje.
            </p>
          </div>
        </div>

        {/* CITAÇÃO DO DIA */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">💬 CITAÇÃO DIÁRIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {citacaoHoje ? 'Publicado' : 'Aguardando conteúdo'}
            </span>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center text-slate-200 text-xs italic">
            {citacaoHoje ? `"${citacaoHoje.conteudo}"` : '"Citação do dia..."'}
          </div>
        </div>

        {/* REFLEXÃO DO DIA */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">🌿 REFLEXÃO DO DIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {reflexaoHoje ? 'Vídeo Disponível' : 'Aguardando vídeo'}
            </span>
          </div>
          {reflexaoHoje && getYouTubeEmbedUrl(reflexaoHoje.link) ? (
            <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-800">
              <iframe
                src={getYouTubeEmbedUrl(reflexaoHoje.link)}
                title="Reflexão do Dia"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="h-28 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
              Nenhum vídeo enviado ainda
            </div>
          )}
        </div>

        {/* ORAÇÃO DO DIA */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider">🙏 ORAÇÃO DO DIA</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {oracaoHoje ? 'Vídeo Disponível' : 'Aguardando vídeo'}
            </span>
          </div>
          {oracaoHoje && getYouTubeEmbedUrl(oracaoHoje.link) ? (
            <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-800">
              <iframe
                src={getYouTubeEmbedUrl(oracaoHoje.link)}
                title="Oração do Dia"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="h-20 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
              Nenhum vídeo enviado ainda
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Home</button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Bíblia</button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Planos</button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Explorar</button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Config</button>
            {isAdmin && (
              <button onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-amber-400 hover:text-white text-[9px] font-bold cursor-pointer">Admin</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}