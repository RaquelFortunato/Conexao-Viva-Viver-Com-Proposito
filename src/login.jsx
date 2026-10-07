import React, { useState } from 'react';
import { supabase } from './data/supabase.js'; 
import logoImg from './assets/Whatslogo.jpeg';

export default function Login({ onLoginSuccess }) {
  const [isCadastro, setIsCadastro] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isCadastro) {
        if (senha !== confirmaSenha) {
          throw new Error("As senhas não coincidem.");
        }

        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: {
              full_name: nome,
            },
          },
        });

        if (authError) throw authError;

        if (!data.user) {
           throw new Error("Não foi possível criar a conta. Tente outro e-mail.");
        }

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

        if (signInError) throw signInError;

        const userNameFromDb = signInData.user.user_metadata?.full_name || nome || email.split('@')[0];
        
        onLoginSuccess(email, userNameFromDb, true); 
        
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

        if (signInError) throw signInError;

        const userNameFromDb = data.user.user_metadata?.full_name || email.split('@')[0];
        
        onLoginSuccess(email, userNameFromDb, false); 
      }

    } catch (err) {
      console.error(err);
      let message = err.message;
      
      if (message.includes("Invalid login credentials")) {
        message = "E-mail ou senha incorretos.";
      } else if (message.includes("Email not confirmed")) {
        message = "Verifique seu e-mail para confirmar a conta antes de entrar.";
      } else if (message.includes("User already registered")) {
        message = "Este e-mail já possui uma conta. Tente entrar.";
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-slate-900/95 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md my-auto">
        
        {/* Logotipo no topo com a sua imagem local */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden">
            <img 
              src={logoImg} 
              alt="Logo Conexão Viva" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

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

        <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setIsCadastro(false); setError(null); }}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              !isCadastro ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Já tenho conta / Entrar
          </button>
          <button
            type="button"
            onClick={() => { setIsCadastro(true); setError(null); }}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              isCadastro ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cadastrar / Criar conta
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-xs rounded-lg text-center animate-pulse">
            ❌ {error}
          </div>
        )}

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
                disabled={loading}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
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
              disabled={loading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">
                {isCadastro ? 'Criar Senha' : 'Senha'}
              </label>
              {!isCadastro && (
                <a href="#esqueci" onClick={(e) => { e.preventDefault(); alert('Funcionalidade de recuperação em breve.'); }} className="text-xs text-amber-400 hover:underline">
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
              minLength={6}
              disabled={loading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
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
                  minLength={6}
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              <span>{isCadastro ? 'Criar Conta e Continuar' : 'Entrar na Conta'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2 border-t border-slate-800/60 pt-4">
          <p className="text-[11px] text-slate-400 font-medium">
            🔒 Ambiente seguro, privado, dados protegidos pelo Supabase.
          </p>
          <p className="text-[10px] text-slate-500">
            Ao continuar, você concorda com nossos <span className="underline cursor-pointer text-slate-400">Termos de Uso</span>.
          </p>
        </div>

      </div>
    </div>
  );
}