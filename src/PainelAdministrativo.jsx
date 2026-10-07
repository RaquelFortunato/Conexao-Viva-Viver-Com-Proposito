import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Admin({ onNavigate }) {
  const [citacao, setCitacao] = useState('');
  const [fabula, setFabula] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [filtroMensagens, setFiltroMensagens] = useState('nao_lidas');
  const [isAdmin, setIsAdmin] = useState(true);
  
  const [videoReflexao, setVideoReflexao] = useState(null);
  const [videoMensagem, setVideoMensagem] = useState(null);
  const [videoOracao, setVideoOracao] = useState(null);
  const [videoLouvor, setVideoLouvor] = useState(null);
  const [audioPlaylist, setAudioPlaylist] = useState(null);
  const [logoApp, setLogoApp] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const [modalNovaFerramentaAberta, setModalNovaFerramentaAberta] = useState(false);
  const [nomeNovaFerramenta, setNomeNovaFerramenta] = useState('');

  const handleCriarNovaFerramenta = () => {
    if (!nomeNovaFerramenta.trim()) {
      alert('Por favor, digite o nome da nova ferramenta/aba.');
      return;
    }
    alert(`Ferramenta "${nomeNovaFerramenta}" criada com sucesso!`);
    setNomeNovaFerramenta('');
    setModalNovaFerramentaAberta(false);
  };

  const handlePublicarCitacao = async () => {
    if (!citacao.trim()) {
      alert('Escreva a citação antes de publicar.');
      return;
    }
    try {
      const { error } = await supabase.from('citacao_dia').insert([{ conteudo: citacao, data: new Date().toISOString() }]);
      if (error) throw error;
      alert('Citação publicada com sucesso!');
      setCitacao('');
    } catch (err) {
      console.error(err);
      alert('Erro ao publicar citação: ' + err.message);
    }
  };

  const handlePublicarFabula = async () => {
    if (!fabula.trim()) {
      alert('Escreva a fábula antes de publicar.');
      return;
    }
    try {
      const linhas = fabula.split('\n');
      const tituloExtraido = linhas[0] || 'Fábula do Dia';
      const conteudoExtraido = fabula;

      const { error } = await supabase.from('fabulas').insert([
        { titulo: tituloExtraido, conteudo: conteudoExtraido }
      ]);
      if (error) throw error;

      alert('Fábula publicada com sucesso!');
      setFabula('');
    } catch (err) {
      console.error(err);
      alert('Erro ao publicar fábula: ' + err.message);
    }
  };

  const handlePublicarAudio = async () => {
    if (!audioPlaylist) {
      alert('Selecione um ficheiro de áudio primeiro.');
      return;
    }
    try {
      const fileName = `${Date.now()}_${audioPlaylist.name}`;
      const { error: uploadError } = await supabase.storage.from('audios').upload(fileName, audioPlaylist);
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage.from('audios').getPublicUrl(fileName);
      const audioUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase.from('playlists_musicas').insert([
        { 
          nome_playlist: audioPlaylist.name.replace(/\.[^/.]+$/, ""), 
          audio_url: audioUrl,
          descricao: 'Áudio devocional adicionado via painel administrativo'
        }
      ]);
      if (dbError) throw dbError;
      
      alert('Áudio enviado e registado na playlist com sucesso!');
      setAudioPlaylist(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar áudio: ' + err.message);
    }
  };

  const handlePublicarVideoGenerico = async (file, tabela, nomeCampoVideo, tituloPadrao) => {
    if (!file) {
      alert('Selecione um vídeo MP4 primeiro.');
      return;
    }
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('audios').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('audios').getPublicUrl(fileName);
      const videoUrl = publicUrlData.publicUrl;

      const payload = {
        titulo: tituloPadrao,
        [nomeCampoVideo]: videoUrl,
        created_at: new Date().toISOString()
      };

      const { error: dbError } = await supabase.from(tabela).insert([payload]);
      if (dbError) throw dbError;

      alert('Vídeo publicado com sucesso! Já está disponível na Home e irá para o Explorar amanhã.');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar vídeo: ' + err.message);
    }
  };

  const handlePublicarReflexao = async () => {
    await handlePublicarVideoGenerico(videoReflexao, 'reflexao_dia', 'video_url', 'Reflexão do Dia');
    setVideoReflexao(null);
  };

  const handlePublicarMensagem = async () => {
    await handlePublicarVideoGenerico(videoMensagem, 'mensagem_dia', 'video_url', 'Mensagem do Dia');
    setVideoMensagem(null);
  };

  const handlePublicarOracao = async () => {
    await handlePublicarVideoGenerico(videoOracao, 'oracao_dia', 'video_url', 'Oração do Dia');
    setVideoOracao(null);
  };

  const handlePublicarLouvor = async () => {
    await handlePublicarVideoGenerico(videoLouvor, 'louvor_dia', 'video_url', 'Louvor do Dia');
    setVideoLouvor(null);
  };

  const handleAtualizarSenha = async () => {
    if (!novaSenha) {
      alert('Digite a nova senha.');
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: novaSenha });
      if (error) throw error;
      alert('Senha atualizada com sucesso!');
      setNovaSenha('');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar senha: ' + err.message);
    }
  };

  const handleSubirLogo = async () => {
    if (!logoApp) {
      alert('Selecione uma imagem para o logo primeiro.');
      return;
    }
    try {
      const fileName = `logo_${Date.now()}_${logoApp.name}`;
      const { error: uploadError } = await supabase.storage.from('foto_perfil').upload(fileName, logoApp);
      if (uploadError) throw uploadError;

      alert('Logo do aplicativo enviado com sucesso!');
      setLogoApp(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar logo: ' + err.message);
    }
  };

  const handleSubirFotoPerfil = async () => {
    if (!fotoPerfil) {
      alert('Selecione uma foto da responsável primeiro.');
      return;
    }
    try {
      const fileName = `perfil_${Date.now()}_${fotoPerfil.name}`;
      const { error: uploadError } = await supabase.storage.from('foto_perfil').upload(fileName, fotoPerfil);
      if (uploadError) throw uploadError;

      alert('Foto da responsável enviada com sucesso!');
      setFotoPerfil(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar foto: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner text-center space-y-1">
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Acesso Restrito & Exclusivo
          </span>
          <h1 className="text-base font-bold text-white mt-1">Gestão Administrativa</h1>
          <p className="text-xs text-slate-400">Painel de Raquel Fortunato • Conexão Viva</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conteúdos Diários</h2>
            <span className="text-[10px] text-amber-400 font-semibold">Ciclo de 24h</span>
          </div>
          
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>💬 Citação do Dia</span></h3>
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
            <button 
              onClick={handlePublicarCitacao}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Citação
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>📖 Reflexão do Dia</span></h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Vídeo devocional da palavra profunda</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">
                {videoReflexao ? videoReflexao.name : 'Toque para selecionar MP4 do celular'}
              </span>
              <input type="file" accept="video/mp4" onChange={(e) => setVideoReflexao(e.target.files[0])} className="hidden" />
            </label>
            <button 
              onClick={handlePublicarReflexao}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Reflexão
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🕊️ Mensagem do Dia</span></h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Palavra inspiradora e encorajamento</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">
                {videoMensagem ? videoMensagem.name : 'Toque para selecionar MP4 do celular'}
              </span>
              <input type="file" accept="video/mp4" onChange={(e) => setVideoMensagem(e.target.files[0])} className="hidden" />
            </label>
            <button 
              onClick={handlePublicarMensagem}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Mensagem
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🙏 Oração do Dia</span></h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Oração guiada em vídeo com Raquel</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">
                {videoOracao ? videoOracao.name : 'Toque para selecionar MP4 do celular'}
              </span>
              <input type="file" accept="video/mp4" onChange={(e) => setVideoOracao(e.target.files[0])} className="hidden" />
            </label>
            <button 
              onClick={handlePublicarOracao}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Oração
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🎶 Louvor do Dia</span></h3>
              <span className="text-[10px] text-blue-400 font-medium">Vídeo MP4</span>
            </div>
            <p className="text-[10px] text-slate-400">Clipes, hino devocional ou acústico</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">📹</span>
              <span className="text-[11px] font-semibold text-white">
                {videoLouvor ? videoLouvor.name : 'Toque para selecionar MP4 do celular'}
              </span>
              <input type="file" accept="video/mp4" onChange={(e) => setVideoLouvor(e.target.files[0])} className="hidden" />
            </label>
            <button 
              onClick={handlePublicarLouvor}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Louvor
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>📜 Fábulas & Parábolas</span></h3>
              <span className="text-[10px] text-amber-400 font-medium">Texto Puro</span>
            </div>
            <p className="text-[10px] text-slate-400">1ª linha = Título | Resto = Conteúdo</p>
            <textarea 
              rows="3"
              value={fabula}
              onChange={(e) => setFabula(e.target.value)}
              placeholder="Digite o título na 1ª linha e a fábula abaixo..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
            />
            <button 
              onClick={handlePublicarFabula}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Fábula
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🎧 Playlist de Músicas</span></h3>
              <span className="text-[10px] text-emerald-400 font-medium">Áudio MP3</span>
            </div>
            <p className="text-[10px] text-slate-400">Gestão e faixas de adoração em áudio</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-3 bg-slate-900/50 cursor-pointer transition text-center">
              <span className="text-amber-400 text-base mb-1">🎵</span>
              <span className="text-[11px] font-semibold text-white">
                {audioPlaylist ? audioPlaylist.name : 'Toque para selecionar áudio MP3 / WAV'}
              </span>
              <input type="file" accept="audio/mp3,audio/wav" onChange={(e) => setAudioPlaylist(e.target.files[0])} className="hidden" />
            </label>
            <button 
              onClick={handlePublicarAudio}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Publicar Áudio
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Configurações & Marca</h2>
          
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Mudar Senha do Admin</h3>
            <div className="flex gap-2">
              <input 
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Nova Senha"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button 
                onClick={handleAtualizarSenha}
                className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer whitespace-nowrap"
              >
                Atualizar
              </button>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white">Subir Logo do Aplicativo</h3>
              <label className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer transition">
                {logoApp ? 'Selecionada' : 'Alterar'}
                <input type="file" accept="image/*" onChange={(e) => setLogoApp(e.target.files[0])} className="hidden" />
              </label>
            </div>
            {logoApp && (
              <button 
                onClick={handleSubirLogo}
                className="w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Confirmar Upload do Logo
              </button>
            )}
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full border border-amber-400 bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs">RF</div>
                <div><h3 className="text-xs font-bold text-white">Foto da Responsável</h3></div>
              </div>
              <label className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer transition">
                {fotoPerfil ? 'Selecionada' : 'Nova Foto'}
                <input type="file" accept="image/*" onChange={(e) => setFotoPerfil(e.target.files[0])} className="hidden" />
              </label>
            </div>
            {fotoPerfil && (
              <button 
                onClick={handleSubirFotoPerfil}
                className="w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Confirmar Upload da Foto
              </button>
            )}
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
            <div><h3 className="text-xs font-bold text-white">Extras & Novas Ferramentas</h3></div>
            <button 
              onClick={() => setModalNovaFerramentaAberta(true)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer shadow"
            >
              Nova Ferramenta
            </button>
          </div>
        </div>

        {modalNovaFerramentaAberta && (
          <div className="bg-slate-950 border border-amber-500/50 p-4 rounded-2xl space-y-3 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-amber-400">Criar Nova Aba / Ferramenta</h3>
              <button onClick={() => setModalNovaFerramentaAberta(false)} className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer">✕ Fechar</button>
            </div>
            <input 
              type="text"
              value={nomeNovaFerramenta}
              onChange={(e) => setNomeNovaFerramenta(e.target.value)}
              placeholder="Ex: Mural de Pedidos..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <div className="flex gap-2">
              <button onClick={handleCriarNovaFerramenta} className="flex-1 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer">Salvar</button>
              <button onClick={() => setModalNovaFerramentaAberta(false)} className="px-3 py-2 bg-slate-900 text-slate-300 rounded-xl font-bold text-xs transition cursor-pointer">Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Mensagens & Sugestões</h2>
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-3">
            <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-center">
              <button onClick={() => setFiltroMensagens('nao_lidas')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'nao_lidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>Não Lidas</button>
              <button onClick={() => setFiltroMensagens('lidas')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'lidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>Lidas</button>
              <button onClick={() => setFiltroMensagens('escondidas')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'escondidas' ? 'bg-amber-400 text-amber-400' : 'text-slate-400'}`}>Escondidas</button>
              <button onClick={() => setFiltroMensagens('aguardando')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'aguardando' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>Aguardando</button>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center text-slate-400 text-xs">
              Nenhuma mensagem pendente no momento.
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <div className="grid grid-cols-6 gap-1 text-center">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Home</button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Bíblia</button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Planos</button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Explorar</button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Config</button>
            <button onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Admin</button>
          </div>
        </div>

      </div>
    </div>
  );
}