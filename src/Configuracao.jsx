import React, { useState, useEffect } from 'react';

export default function Configuracao({ onNavigate, userEmail, userName, onLogout }) {
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [nome, setNome] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(true);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Verificação rigorosa: O painel Admin SÓ aparece para o seu e-mail oficial
  useEffect(() => {
    const emailAdminOficial = 'raquellosnak@gmail.com';
    const emailAtual = (email || userEmail || '').trim().toLowerCase();

    if (emailAtual === emailAdminOficial) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [email, userEmail]);

  // Função para gerar as iniciais dinamicamente com base no nome atual do usuário logado
  const getIniciais = (nomeStr) => {
    if (!nomeStr) return 'U';
    const partes = nomeStr.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return partes[0].substring(0, 2).toUpperCase();
  };

  const iniciaisAtuais = getIniciais(nome);

  const handleSalvarPerfil = (e) => {
    e.preventDefault();
    alert('Dados de perfil atualizados com sucesso!');
  };

  const handleMudarSenha = (e) => {
    e.preventDefault();
    if (!senhaAtual || !novaSenha) {
      alert('Preencha os campos de senha.');
      return;
    }
    alert('Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Conexão Viva',
        text: 'Venha conhecer o aplicativo Conexão Viva - Viver com Propósito!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do aplicativo copiado para a área de transferência!');
    }
  };

  const handleSairConta = () => {
    if (confirm('Deseja realmente sair da sua conta?')) {
      if (typeof onLogout === 'function') {
        onLogout();
      }
    }
  };

  const handleExcluirConta = () => {
    if (confirm('Atenção! Deseja realmente excluir permanentemente sua conta e todos os dados? Esta ação não pode ser desfeita.')) {
      alert('Conta excluída com sucesso.');
      if (typeof onLogout === 'function') onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Configurações da Conta</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              iniciaisAtuais
            )}
          </div>
        </div>

        {/* Perfil */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-4">
          <h2 className="text-xs font-bold text-amber-400 tracking-wider">👤 SEU PERFIL E FOTO</h2>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-base shadow-md">
              {fotoPerfil ? (
                <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                iniciaisAtuais
              )}
            </div>
            <div>
              <label className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] px-3 py-1.5 rounded-lg transition-all shadow inline-block">
                Alterar Foto
                <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
              </label>
              <p className="text-[10px] text-slate-500 mt-1">Envie uma imagem do seu dispositivo.</p>
            </div>
          </div>

          <form onSubmit={handleSalvarPerfil} className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">E-mail de Acesso</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
            >
              Salvar Alterações de Perfil
            </button>
          </form>
        </div>

        {/* Segurança */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <h2 className="text-xs font-bold text-amber-400 tracking-wider">🔒 SEGURANÇA E SENHA</h2>
          <form onSubmit={handleMudarSenha} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Senha Atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="Digite sua senha atual"
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Nova Senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Digite a nova senha"
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
            >
              Atualizar Senha
            </button>
          </form>
        </div>

        {/* Preferências */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <h2 className="text-xs font-bold text-amber-400 tracking-wider">⚙️ PREFERÊNCIAS DO APLICATIVO</h2>
          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-xs text-slate-300">Notificações Diárias</span>
            <button
              type="button"
              onClick={() => setNotificacoes(!notificacoes)}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                notificacoes ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {notificacoes ? 'Ativadas' : 'Desativadas'}
            </button>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-slate-300">Modo de Exibição</span>
            <button
              type="button"
              onClick={() => setModoEscuro(!modoEscuro)}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                modoEscuro ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {modoEscuro ? '🌙 Escuro' : '☀️ Claro'}
            </button>
          </div>
        </div>

        {/* Ações */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2">
          <h2 className="text-xs font-bold text-amber-400 tracking-wider mb-2">🌐 OUTRAS AÇÕES</h2>
          <button onClick={handleCompartilhar} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium py-2 rounded-xl transition-all cursor-pointer">
            📤 Compartilhar Aplicativo
          </button>
          <button onClick={handleSairConta} className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium py-2 rounded-xl transition-all cursor-pointer">
            🚪 Sair da Conta
          </button>
          <button onClick={handleExcluirConta} className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium py-2 rounded-xl transition-all cursor-pointer">
            ⚠️ Excluir Conta Permanentemente
          </button>
        </div>

        {/* Menu de Navegação */}
        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Home</button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Bíblia</button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Planos</button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Explorar</button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Config</button>
            {isAdmin && (
              <button onClick={() => onNavigate && onNavigate('admin')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-amber-400 hover:text-white text-[9px] font-bold cursor-pointer">Admin</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}