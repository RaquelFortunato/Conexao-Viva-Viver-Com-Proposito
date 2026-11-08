import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase';

export default function Admin({ onNavigate }) {
  const [citacao, setCitacao] = useState('');
  const [fabula, setFabula] = useState('');
  const [filtroMensagens, setFiltroMensagens] = useState('nao_lidas');
  
  // Estados para armazenar as URLs do YouTube dos vídeos diários
  const [videoReflexao, setVideoReflexao] = useState('');
  const [videoMensagem, setVideoMensagem] = useState('');
  const [videoOracao, setVideoOracao] = useState('');
  const [videoLouvor, setVideoLouvor] = useState('');

  const [audioPlaylist, setAudioPlaylist] = useState(null);
  const [logoApp, setLogoApp] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const [modalNovaFerramentaAberta, setModalNovaFerramentaAberta] = useState(false);
  const [nomeNovaFerramenta, setNomeNovaFerramenta] = useState('');

  // Estados para gerenciar e excluir itens antigos/com erro
  const [listaCitacoes, setListaCitacoes] = useState([]);
  const [listaReflexoes, setListaReflexoes] = useState([]);
  const [listaMensagens, setListaMensagens] = useState([]);
  const [listaOracoes, setListaOracoes] = useState([]);
  const [listaLouvores, setListaLouvores] = useState([]);
  const [listaFabulas, setListaFabulas] = useState([]);
  const [listaMusicas, setListaMusicas] = useState([]);

  // Carrega listas para gerenciamento/exclusão
  const carregarAcervosAdmin = async () => {
    try {
      const { data: citData } = await supabase.from('citacao_dia').select('*').order('created_at', { ascending: false });
      if (citData) setListaCitacoes(citData);

      const { data: refData } = await supabase.from('reflexao_dia').select('*').order('created_at', { ascending: false });
      if (refData) setListaReflexoes(refData);

      const { data: msgData } = await supabase.from('mensagem_dia').select('*').order('created_at', { ascending: false });
      if (msgData) setListaMensagens(msgData);

      const { data: orcData } = await supabase.from('oracao_dia').select('*').order('created_at', { ascending: false });
      if (orcData) setListaOracoes(orcData);

      const { data: louvorData } = await supabase.from('louvor_dia').select('*').order('created_at', { ascending: false });
      if (louvorData) setListaLouvores(louvorData);

      const { data: fabData } = await supabase.from('fabulas').select('*').order('id', { ascending: false });
      if (fabData) setListaFabulas(fabData);

      const { data: musData } = await supabase.from('playlists_musicas').select('*').order('id', { ascending: false });
      if (musData) setListaMusicas(musData);
    } catch (err) {
      console.error("Erro ao carregar acervos:", err);
    }
  };

  useEffect(() => {
    carregarAcervosAdmin();
  }, []);

  const handleExcluirItem = async (tabela, id) => {
    if (!window.confirm('Tem certeza que deseja excluir este item permanentemente?')) return;
    try {
      const { error } = await supabase.from(tabela).delete().eq('id', id);
      
      if (error) {
        console.error("Erro RLS/Supabase:", error);
        alert('Erro ao excluir no banco. Verifique se a política de DELETE está habilitada no Supabase.');
      } else {
        alert('Item excluído com sucesso!');
        carregarAcervosAdmin();
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir item: ' + err.message);
    }
  };

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
      const { error } = await supabase.from('citacao_dia').insert([{ conteudo: citacao }]);
      if (error) throw error;
      alert('Citação publicada com sucesso!');
      setCitacao('');
      carregarAcervosAdmin();
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
      carregarAcervosAdmin();
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
      carregarAcervosAdmin();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar áudio: ' + err.message);
    }
  };

  const handlePublicarVideoGenerico = async (urlVideo, tabelaDia) => {
    if (!urlVideo.trim()) {
      alert('Cole o link do YouTube primeiro.');
      return;
    }
    try {
      const linkFormatado = urlVideo.trim();

      const { error: errDia } = await supabase.from(tabelaDia).insert([
        {
          link: linkFormatado,
          created_at: new Date().toISOString()
        }
      ]);
      if (errDia) throw errDia;

      alert('Vídeo publicado com sucesso!');
      carregarAcervosAdmin();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar link do vídeo: ' + err.message);
    }
  };

  const handlePublicarReflexao = async () => {
    await handlePublicarVideoGenerico(videoReflexao, 'reflexao_dia');
    setVideoReflexao('');
  };

  const handlePublicarMensagem = async () => {
    await handlePublicarVideoGenerico(videoMensagem, 'mensagem_dia');
    setVideoMensagem('');
  };

  const handlePublicarOracao = async () => {
    await handlePublicarVideoGenerico(videoOracao, 'oracao_dia');
    setVideoOracao('');
  };

  const handlePublicarLouvor = async () => {
    await handlePublicarVideoGenerico(videoLouvor, 'louvor_dia');
    setVideoLouvor('');
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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            />
            <button 
              type="button"
              onClick={handlePublicarCitacao}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Citação
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>📖 Reflexão do Dia</span></h3>
              <span className="text-[10px] text-amber-400 font-medium">Link do YouTube</span>
            </div>
            <p className="text-[10px] text-slate-400">Cole o link do vídeo do YouTube</p>
            <input 
              type="url"
              value={videoReflexao}
              onChange={(e) => setVideoReflexao(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button 
              type="button"
              onClick={handlePublicarReflexao}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Reflexão
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🕊️ Mensagem</span></h3>
              <span className="text-[10px] text-amber-400 font-medium">Link do YouTube</span>
            </div>
            <p className="text-[10px] text-slate-400">Cole o link do vídeo do YouTube</p>
            <input 
              type="url"
              value={videoMensagem}
              onChange={(e) => setVideoMensagem(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button 
              type="button"
              onClick={handlePublicarMensagem}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Mensagem
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🙏 Oração do Dia</span></h3>
              <span className="text-[10px] text-amber-400 font-medium">Link do YouTube</span>
            </div>
            <p className="text-[10px] text-slate-400">Cole o link do vídeo do YouTube</p>
            <input 
              type="url"
              value={videoOracao}
              onChange={(e) => setVideoOracao(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button 
              type="button"
              onClick={handlePublicarOracao}
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer shadow"
            >
              Publicar Oração
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🎶 Louvor</span></h3>
              <span className="text-[10px] text-amber-400 font-medium">Link do YouTube</span>
            </div>
            <p className="text-[10px] text-slate-400">Cole o link do vídeo do YouTube</p>
            <input 
              type="url"
              value={videoLouvor}
              onChange={(e) => setVideoLouvor(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button 
              type="button"
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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            />
            <button 
              type="button"
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
              type="button"
              onClick={handlePublicarAudio}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Publicar Áudio
            </button>
          </div>
        </div>

        {/* --- SEÇÃO DE GERENCIAMENTO E EXCLUSÃO --- */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider px-1">Gerenciar / Excluir Registros Anteriores</h2>
          
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Citações Salvas ({listaCitacoes.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaCitacoes.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhuma citação registrada.</p>
              ) : (
                listaCitacoes.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.conteudo || 'Sem texto'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('citacao_dia', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Reflexões Salvas ({listaReflexoes.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaReflexoes.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhuma reflexão registrada.</p>
              ) : (
                listaReflexoes.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.link || 'Sem link'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('reflexao_dia', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Mensagens Salvas ({listaMensagens.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaMensagens.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhuma mensagem registrada.</p>
              ) : (
                listaMensagens.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.link || 'Sem link'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('mensagem_dia', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Orações Salvas ({listaOracoes.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaOracoes.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhuma oração registrada.</p>
              ) : (
                listaOracoes.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.link || 'Sem link'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('oracao_dia', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Louvores Salvos ({listaLouvores.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaLouvores.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhum louvor registrado.</p>
              ) : (
                listaLouvores.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.link || 'Sem link'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('louvor_dia', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Fábulas Salvas ({listaFabulas.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaFabulas.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhuma fábula registrada.</p>
              ) : (
                listaFabulas.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.titulo || 'Sem título'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('fabulas', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-2">
            <h3 className="text-xs font-bold text-white">Áudios da Playlist ({listaMusicas.length})</h3>
            <div className="max-h-36 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 pr-1">
              {listaMusicas.length === 0 ? (
                <p className="text-[10px] text-slate-400">Nenhum áudio registrado.</p>
              ) : (
                listaMusicas.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-xl text-[10px]">
                    <span className="truncate flex-1 pr-2 text-slate-300">{item.nome_playlist || 'Sem nome'}</span>
                    <button 
                      type="button"
                      onClick={() => handleExcluirItem('playlists_musicas', item.id)}
                      className="px-2 py-1 bg-red-500/25 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition font-bold cursor-pointer whitespace-nowrap"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Configurações & Marca</h2>
          
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
                type="button"
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
                type="button"
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
              type="button"
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
              <button type="button" onClick={() => setModalNovaFerramentaAberta(false)} className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer">✕ Fechar</button>
            </div>
            <input 
              type="text"
              value={nomeNovaFerramenta}
              onChange={(e) => setNomeNovaFerramenta(e.target.value)}
              placeholder="Ex: Mural de Pedidos..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <div className="flex gap-2">
              <button type="button" onClick={handleCriarNovaFerramenta} className="flex-1 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer">Salvar</button>
              <button type="button" onClick={() => setModalNovaFerramentaAberta(false)} className="px-3 py-2 bg-slate-900 text-slate-300 rounded-xl font-bold text-xs transition cursor-pointer">Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Mensagens & Sugestões</h2>
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-3">
            <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-center">
              <button type="button" onClick={() => setFiltroMensagens('nao_lidas')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'nao_lidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>Não Lidas</button>
              <button type="button" onClick={() => setFiltroMensagens('lidas')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'lidas' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>Lidas</button>
              <button type="button" onClick={() => setFiltroMensagens('escondidas')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'escondidas' ? 'bg-amber-400 text-amber-400' : 'text-slate-400'}`}>Escondidas</button>
              <button type="button" onClick={() => setFiltroMensagens('aguardando')} className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${filtroMensagens === 'aguardando' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>Aguardando</button>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center text-slate-400 text-xs">
              Nenhuma mensagem pendente no momento.
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <div className="grid grid-cols-6 gap-1 text-center">
            <button type="button" onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Home</button>
            <button type="button" onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Bíblia</button>
            <button type="button" onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Planos</button>
            <button type="button" onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Explorar</button>
            <button type="button" onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] font-medium cursor-pointer">Config</button>
            <button type="button" onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Admin</button>
          </div>
        </div>

      </div>
    </div>
  );
}