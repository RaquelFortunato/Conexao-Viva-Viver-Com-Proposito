import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  // Começa como 'true' para abrir direto na tela de Cadastro/Primeiro Acesso que você desenhou
  const [isCadastro, setIsCadastro] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-slate-900/95 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md my-auto">
        
        {/* Ícone / Logo no topo */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="text-slate-950 font-bold text-xl">✝</span>
          </div>
        </div>

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-white">Conexão Viva</h1>
          <p className="text-amber-400 text-xs font-semibold tracking-widest mt-0.5">VIVER COM PROPÓSITO</p>
          
          <div className="mt-3">
            <span className="inline-block bg-slate-800 text-amber-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-700">
              {isCadastro ? '✨ Primeiro Acesso • Cadastro' : '🔑 Área de Acesso'}
            </span>
          </div>

          <h2 className="text-lg font-bold mt-3 text-slate-100">
            {isCadastro ? 'Junte-se ao Conexão Viva - Viver com Propósito' : 'Bem-vindo(a) de volta!'}
          </h2>
          
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            {isCadastro 
              ? 'Inicie sua jornada diária de oração, reflexão, paz e fortalecimento da fé.' 
              : 'Entre para continuar seu propósito diário com a Palavra.'}
          </p>
        </div>

        {/* Abas Entrar / Cadastrar */}
        <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => setIsCadastro(false)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              !isCadastro ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Já tenho conta / Entrar
          </button>
          <button
            type="button"
            onClick={() => setIsCadastro(true)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              isCadastro ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cadastrar / Criar conta
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isCadastro && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                required={isCadastro}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {isCadastro ? 'E-mail de Acesso' : 'E-mail'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">
                {isCadastro ? 'Criar Senha' : 'Senha'}
              </label>
              {!isCadastro && (
                <a href="#esqueci" onClick={(e) => { e.preventDefault(); alert('Instruções enviadas para o seu e-mail.'); }} className="text-xs text-amber-400 hover:underline">
                  Esqueci minha senha
                </a>
              )}
            </div>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder={isCadastro ? "Crie uma senha segura" : "Sua senha secreta"}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {isCadastro && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Senha</label>
                <input
                  type="password"
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  placeholder="Repita a senha"
                  required={isCadastro}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Código de Confirmação</label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Digite o código enviado"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Enviaremos um código de 6 dígitos para o seu e-mail para validar seu acesso com total segurança.</p>
              </div>
            </>
          )}

          {/* Botão de Ação */}
          <button
            type="submit"
            className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isCadastro ? 'Criar Conta e Continuar' : 'Entrar na Conta'}</span>
            <span className="text-base">→</span>
          </button>
        </form>

        {/* Rodapé e Termos */}
        <div className="mt-6 text-center space-y-2 border-t border-slate-800/60 pt-4">
          <p className="text-[11px] text-slate-400 font-medium">
            🔒 Ambiente seguro, privado, dados protegidos.
          </p>
          <p className="text-[10px] text-slate-500">
            Ao continuar, você concorda com nossos <span className="underline cursor-pointer text-slate-400">Termos de Uso</span>.
          </p>
        </div>

      </div>
    </div>
  );
}