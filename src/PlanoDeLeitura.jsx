import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase';
import { PLANOS_LEITURA } from './data/PlanosData';

export default function PlanoDeLeitura({ onNavigate, userName }) {
  const [abaAtivaPlano, setAbaAtivaPlano] = useState('catalogo'); // 'catalogo', 'detalhe'
  const [planoAtivo, setPlanoAtivo] = useState(null);
  const [diasConcluidos, setDiasConcluidos] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Função para calcular as iniciais do usuário dinamicamente
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
    async function carregarDadosEVerificarAdmin() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (user.email && user.email.toLowerCase() === 'raquellosnak@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          // Busca a foto de perfil no Supabase
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
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setIsAdmin(false);
      }
    }
    carregarDadosEVerificarAdmin();
  }, []);

  const toggleDia = (planoId, diaNum) => {
    setDiasConcluidos(prev => ({
      ...prev,
      [planoId]: {
        ...(prev[planoId] || {}),
        [diaNum]: !(prev[planoId]?.[diaNum])
      }
    }));
  };

  const abrirDetalhes = (plano) => {
    setPlanoAtivo(plano);
    setAbaAtivaPlano('detalhe');
  };

  // Função para convidar via WhatsApp otimizada para celular
  const handleConvidarAmigo = (plano) => {
    const textoMensagem = `Olá! 👋 Eu comecei o plano de leitura "${plano.titulo}" no aplicativo Conexão Viva e gostaria muito de convidar você para fazer essa *Leitura Conjunta* comigo! Vamos ler e nos fortalecer juntos na Palavra? 📖✨`;
    
    const urlApp = `whatsapp://send?text=${encodeURIComponent(textoMensagem)}`;
    const urlWeb = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoMensagem)}`;

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = urlApp;
    } else {
      window.open(urlWeb, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho Padronizado */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Planos de Leitura</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              iniciaisUsuario
            )}
          </div>
        </div>

        {/* Abas de Navegação interna (Catálogo vs Detalhe do Plano) */}
        {abaAtivaPlano === 'detalhe' && planoAtivo ? (
          <div className="space-y-4">
            <button 
              type="button"
              onClick={() => setAbaAtivaPlano('catalogo')}
              className="text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline cursor-pointer"
            >
              ← Voltar para todos os planos
            </button>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div>
                <h2 className="text-sm font-bold text-amber-400">{planoAtivo.titulo}</h2>
                <p className="text-[11px] text-slate-400 mt-1">{planoAtivo.descricao}</p>
              </div>

              {/* Barra de Progresso */}
              {(() => {
                const concluidosCount = planoAtivo.dias.filter(d => diasConcluidos[planoAtivo.id]?.[d.dia]).length;
                const porc = Math.round((concluidosCount / planoAtivo.totalDias) * 100) || 0;
                return (
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>Progresso</span>
                      <span>{concluidosCount} de {planoAtivo.totalDias} dias ({porc}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${porc}%` }}></div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* CARD DE OPÇÕES DE LEITURA: LEITURA CONJUNTA */}
            <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-2xl space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-base">🤝</span>
                <h3 className="text-xs font-bold text-amber-400">Modalidade de Leitura</h3>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Ler acompanhado incentiva a consistência! Você pode caminhar sozinho ou convidar um amigo para ler junto.
              </p>

              <div className="grid grid-cols-1 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleConvidarAmigo(planoAtivo)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>📱</span>
                  <span>Convidar Amigo para Leitura Conjunta</span>
                </button>
              </div>
            </div>

            {/* Lista dos Dias do Plano */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2">
              <h3 className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">Cronograma de Leitura</h3>

              <div className="text-xs space-y-2 max-h-72 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
                {planoAtivo.dias.map((item) => {
                  const concluido = !!diasConcluidos[planoAtivo.id]?.[item.dia];
                  return (
                    <div 
                      key={item.dia} 
                      onClick={() => toggleDia(planoAtivo.id, item.dia)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        concluido 
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 line-through' 
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-semibold">Dia {item.dia}: <span className="font-normal">{item.leitura}</span></span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${concluido ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        {concluido ? 'Feito' : 'Pendente'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Lembrete Diário */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-sm">🔔</span>
                <div>
                  <p className="text-xs font-bold text-white">Lembrete de Leitura</p>
                  <p className="text-[10px] text-slate-400">Ativo diário às 07:00</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg font-medium">Ligado</span>
            </div>

            {/* Lista de Planos Disponíveis */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Catálogo de Planos</h2>

              {PLANOS_LEITURA.map((plano) => (
                <div key={plano.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2 hover:border-amber-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-semibold border border-amber-500/20">{plano.totalDias} Dias</span>
                    <span className="text-xs text-slate-400">📖 Plano Bíblico</span>
                  </div>
                  <h3 className="text-xs font-bold text-white">{plano.titulo}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{plano.descricao}</p>
                  <button 
                    type="button"
                    onClick={() => abrirDetalhes(plano)}
                    className="w-full mt-2 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
                  >
                    Ver Plano e Dias
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Menu de Navegação Inteligente */}
        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button type="button" onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Home</button>
            <button type="button" onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Bíblia</button>
            <button type="button" onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Planos</button>
            <button type="button" onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Explorar</button>
            <button type="button" onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Config</button>
            {isAdmin && (
              <button type="button" onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-amber-400 hover:text-white text-[9px] font-bold cursor-pointer">Admin</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}