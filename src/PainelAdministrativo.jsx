import React, { useState, useEffect } from 'react';
// Importe o seu cliente do Supabase se necessário, ex: '../supabaseClient'
// import { supabase } from '../supabaseClient';

export default function Admin({ onNavigate }) {
  const [citacao, setCitacao] = useState('');
  const [fabula, setFabula] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [filtroMensagens, setFiltroMensagens] = useState('nao_lidas');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Estado para controlar a modal/ação da Nova Ferramenta
  const [modalNovaFerramentaAberta, setModalNovaFerramentaAberta] = useState(false);
  const [nomeNovaFerramenta, setNomeNovaFerramenta] = useState('');

  useEffect(() => {
    async function checkUserAdmin() {
      try {
        // Validação opcional com Supabase:
        /*
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email === 'Raquellosnak@gmail.com') {
          setIsAdmin(true);
        }
        */
        setIsAdmin(true); // Simulando acesso liberado para o painel admin
      } catch (error) {
        console.error("Erro ao verificar admin:", error);
      }
    }
    checkUserAdmin();
  }, []);

  const handleCriarNovaFerramenta = () => {
    if (!nomeNovaFerramenta.trim()) {
      alert('Por favor, digite o nome da nova ferramenta/aba.');
      return;
    }
    // Aqui você pode integrar com o seu banco ou lógica de salvamento
    alert(`Ferramenta "${nomeNovaFerramenta}" criada com sucesso!`);
    setNomeNovaFerramenta('');
    setModalNovaFerramentaAberta(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho do Painel Administrativo (Sem os números fictícios) */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner text-center space-y-1">
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Acesso Restrito & Exclusivo
          </span>
          <h1 className="text-base font-bold text-white mt-1">Gestão Administrativa</h1>
          <p className="text-xs text-slate-400">Painel de Raquel Fortunato • Conexão Viva</p>
        </div>

        {/* Conteúdos Diários */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conteúdos Diários</h2>
            <span className="text-[10px] text-amber-400 font-semibold">Ciclo de 24h</span>
          </div>
          
          {/* 1. Citação do Dia (Texto) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>💬 Citação do Dia</span>
              </h3>
              <span className="text-[10px] text-amber-400 font-medium">Texto Puro</span>
            </div>
            <p className="text-[10px] text-slate-400">Versículo chave e autor bíblico</p>
            <textarea 
              rows="3"
              value={citacao}
              onChange={(e) => setCitacao(e.target.value)}
              placeholder="Escreva a citação do dia..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
            />
            <button className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow">
              Publicar Citação
            </button>
          </div>

          {/* 2. Reflexão do Dia (Vídeo MP4) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>📖 Reflexão do Dia</span>
              </h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Vídeo devocional da palavra profunda</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">Toque para selecionar MP4 do celular</span>
              <span className="text-[9px] text-slate-400 mt-0.5">Formatos verticais 9:16 até 250MB</span>
              <input type="file" accept="video/mp4" className="hidden" />
            </label>
            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer">
              Publicar Reflexão
            </button>
          </div>

          {/* 3. Mensagem do Dia (Vídeo MP4) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🕊️ Mensagem do Dia</span>
              </h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Palavra inspiradora e encorajamento</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">Toque para selecionar MP4 do celular</span>
              <span className="text-[9px] text-slate-400 mt-0.5">Formatos verticais 9:16 até 250MB</span>
              <input type="file" accept="video/mp4" className="hidden" />
            </label>
            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer">
              Publicar Mensagem
            </button>
          </div>

          {/* 4. Oração do Dia (Vídeo MP4) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🙏 Oração do Dia</span>
              </h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Oração guiada em vídeo com Raquel</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">Toque para selecionar MP4 do celular</span>
              <span className="text-[9px] text-slate-400 mt-0.5">Formatos verticais 9:16 até 250MB</span>
              <input type="file" accept="video/mp4" className="hidden" />
            </label>
            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer">
              Publicar Oração
            </button>
          </div>

          {/* 5. Louvor do Dia (Vídeo MP4) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🎶 Louvor do Dia</span>
              </h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Clipes, hino devocional ou acústico</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">Toque para selecionar MP4 do celular</span>
              <span className="text-[9px] text-slate-400 mt-0.5">Formatos verticais 9:16 até 250MB</span>
              <input type="file" accept="video/mp4" className="hidden" />
            </label>
            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer">
              Publicar Louvor
            </button>
          </div>

          {/* 6. Fábulas & Parábolas (Texto) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>📜 Fábulas & Parábolas</span>
              </h3>
              <span className="text-[10px] text-amber-400 font-medium">Texto Puro</span>
            </div>
            <p className="text-[10px] text-slate-400">Histórias e lições espirituais com propósito</p>
            <textarea 
              rows="3"
              value={fabula}
              onChange={(e) => setFabula(e.target.value)}
              placeholder="Escreva a parábola completa e a aplicação prática..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
            />
            <button className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow">
              Publicar Fábula
            </button>
          </div>

          {/* 7. Playlist de Músicas (Áudio MP3) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🎧 Playlist de Músicas</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-medium">Áudio MP3</span>
            </div>
            <p className="text-[10px] text-slate-400">Gestão e faixas de adoração em áudio</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">🎵</span>
              <span className="text-[11px] font-semibold text-white">Toque para selecionar áudio MP3 / WAV</span>
              <span className="text-[9px] text-slate-400 mt-0.5">Áudios devocionais e faixas de adoração</span>
              <input type="file" accept="audio/mp3,audio/wav" className="hidden" />
            </label>
            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer">
              Publicar Áudio
            </button>
          </div>
        </div>

        {/* Configurações & Marca */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Configurações & Marca</h2>
          
          {/* Mudar Senha do Admin */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Mudar Senha do Admin</h3>
            <p className="text-[10px] text-slate-400">Proteção e verificação em 2 etapas (2FA)</p>
            <div className="flex gap-2">
              <input 
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Nova Senha"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer whitespace-nowrap">
                Atualizar
              </button>
            </div>
          </div>

          {/* Subir Logo */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white">Subir Logo do Aplicativo</h3>
              <p className="text-[10px] text-slate-400">SVG ou PNG alta definição</p>
            </div>
            <label className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer transition">
              Alterar Logo
              <input type="file" accept="image/png,image/svg+xml" className="hidden" />
            </label>
          </div>

          {/* Foto da Responsável */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-amber-400 bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs">
                RF
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Foto da Responsável</h3>
                <p className="text-[10px] text-slate-400">Foto oficial de Raquel Fortunato</p>
              </div>
            </div>
            <label className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer transition">
              Nova Foto
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          {/* Extras & Novas Funcionalidades (Botão agora funcional!) */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white">Extras & Novas Funcionalidades</h3>
              <p className="text-[10px] text-slate-400">Ativar/desativar módulos e criar abas</p>
            </div>
            <button 
              onClick={() => setModalNovaFerramentaAberta(true)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer shadow"
            >
              Nova Ferramenta
            </button>
          </div>
        </div>

        {/* Modal / Área interativa para Criar Nova Ferramenta */}
        {modalNovaFerramentaAberta && (
          <div className="bg-slate-950 border border-amber-500/50 p-4 rounded-2xl space-y-3 shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-amber-400">Criar Nova Aba / Ferramenta</h3>
              <button 
                onClick={() => setModalNovaFerramentaAberta(false)}
                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ Fechar
              </button>
            </div>
            <p className="text-[10px] text-slate-400">Digite o nome da nova ferramenta que deseja adicionar ao ecossistema:</p>
            <input 
              type="text"
              value={nomeNovaFerramenta}
              onChange={(e) => setNomeNovaFerramenta(e.target.value)}
              placeholder="Ex: Mural de Pedidos, Testemunhos..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <div className="flex gap-2">
              <button 
                onClick={handleCriarNovaFerramenta}
                className="flex-1 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Salvar Ferramenta
              </button>
              <button 
                onClick={() => setModalNovaFerramentaAberta(false)}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Mensagens & Sugestões */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Mensagens & Sugestões</h2>
          
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-3">
            <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-center">
              <button 
                onClick={() => setFiltroMensagens('nao_lidas')}
                className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'nao_lidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Não Lidas
              </button>
              <button 
                onClick={() => setFiltroMensagens('lidas')}
                className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'lidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Lidas
              </button>
              <button 
                onClick={() => setFiltroMensagens('escondidas')}
                className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'escondidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Escondidas
              </button>
              <button 
                onClick={() => setFiltroMensagens('aguardando')}
                className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'aguardando' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Aguardando
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center text-slate-400 text-xs">
              Nenhuma mensagem pendente no momento.
            </div>
          </div>
        </div>

        {/* Menu de Navegação Inteligente (Dinâmico para o Admin) */}
        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Home</button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Bíblia</button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Planos</button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Explorar</button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Config</button>
            {isAdmin && (
              <button onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Admin</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}