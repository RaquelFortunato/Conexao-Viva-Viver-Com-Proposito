import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase.js'; 

export default function Login({ onLoginSuccess }) {
  const [isCadastro, setIsCadastro] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carrega do cache local instantaneamente para evitar qualquer atraso ou flash
  const [customLogo, setCustomLogo] = useState(() => localStorage.getItem('app_logo_cache') || null);
  const [customBanner, setCustomBanner] = useState(() => localStorage.getItem('app_banner_cache') || null);

  useEffect(() => {
    async function fetchBrandAssets() {
      try {
        const { data, error } = await supabase
          .from('app_config')
          .select('key, value');
        
        if (!error && data) {
          const logoObj = data.find(item => item.key === 'app_logo');
          const bannerObj = data.find(item => item.key === 'app_banner');
          
          if (logoObj && logoObj.value) {
            setCustomLogo(logoObj.value);
            localStorage.setItem('app_logo_cache', logoObj.value);
          }
          if (bannerObj && bannerObj.value) {
            setCustomBanner(bannerObj.value);
            localStorage.setItem('app_banner_cache', bannerObj.value);
          }
        }
      } catch (err) {
        console.log('Usando cache local');
      }
    }
    fetchBrandAssets();
  }, []);

  const handleEsqueciSenha = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Por favor, digite o seu e-mail no campo acima primeiro.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin,
      });

      if (error) throw error;

      alert('📧 E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar e-mail de recuperação: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

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

        try {
          await supabase.from('perfis_usuario').upsert({
            id: signInData.user.id,
            nome: nome,
            email: email,
            conta_excluida: false,
            updated_at: new Date().toISOString()
          });
        } catch (errProfile) {
          console.log("Aviso ao criar perfil:", errProfile);
        }

        const userNameFromDb = signInData.user.user_metadata?.full_name || nome || email.split('@')[0];
        onLoginSuccess(email, userNameFromDb, true); 
        
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

        if (signInError) throw signInError;

        try {
          const { data: perfil } = await supabase
            .from('perfis_usuario')
            .select('conta_excluida')
            .eq('id', data.user.id)
            .maybeSingle();

          if (perfil && perfil.conta_excluida === true) {
            await supabase.auth.signOut();
            localStorage.clear();
            throw new Error("Esta conta foi excluída permanentemente. Crie uma nova conta para acessar.");
          }
        } catch (errPerfil) {
          if (errPerfil.message.includes("excluída permanentemente")) {
            throw errPerfil;
          }
        }

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
    <div className="min-h-screen bg-[#0E1525] text-white flex flex-col items-center justify-center p-0 sm:p-4 relative overflow-y-auto">
      
      {/* Brilho ambiental sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TELA INTEGRADA DE PONTA A PONTA (ESTILO NATIVO CONTÍNUO) */}
      <div className="w-full max-w-md min-h-screen sm:min-h-0 bg-[#0E1525] sm:rounded-3xl border-0 sm:border border-slate-800/80 shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md z-10 overflow-hidden my-auto flex flex-col">
        
        {/* BANNER DEITADO NO TOPO */}
        <div className="relative w-full h-36 bg-slate-900 shrink-0">
          {customBanner && (
            <img 
              src={customBanner} 
              alt="Banner Conexão Viva" 
              className="w-full h-full object-cover opacity-75"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1525] via-transparent to-transparent" />
          
          {/* Logo da bolinha sobreposta na bordinha do banner */}
          <div className="absolute -bottom-4 left-6 flex items-end gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-xl flex items-center justify-center overflow-hidden border-2 border-[#0E1525]">
              {customLogo && (
                <img 
                  src={customLogo} 
                  alt="Logo Conexão Viva" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
            </div>
          </div>
        </div>

        <div className="p-6 pt-7 flex-1 flex flex-col justify-between">
          <div>
            {/* TÍTULO E SUBTÍTULO */}
            <div className="mb-5">
              <h1 className="text-xl font-serif font-semibold text-white">Conexão Viva</h1>
              <p className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mt-0.5">VIVER COM PROPÓSITO</p>
            </div>

            {/* ABAS FLUIDAS: ENTRAR / CRIAR CONTA */}
            <div className="flex bg-[#070B14] p-1.5 rounded-2xl mb-4 border border-slate-800/80">
              <button
                type="button"
                onClick={() => { setIsCadastro(false); setError(null); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  !isCadastro 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Entrar
              </button>

              <button
                type="button"
                onClick={() => { setIsCadastro(true); setError(null); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isCadastro 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Criar Conta
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl text-center">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
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
                    className="w-full bg-[#070B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                  className="w-full bg-[#070B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    {isCadastro ? 'Criar Senha' : 'Senha'}
                  </label>
                  {!isCadastro && (
                    <button 
                      type="button" 
                      onClick={handleEsqueciSenha} 
                      className="text-xs text-amber-400 hover:underline bg-transparent border-0 cursor-pointer p-0"
                    >
                      Esqueci minha senha
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    disabled={loading}
                    className="w-full bg-[#070B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 cursor-pointer text-xs"
                  >
                    {mostrarSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {isCadastro && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Senha</label>
                  <input
                    type="text"
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    placeholder="Repita a senha"
                    required={isCadastro}
                    minLength={6}
                    disabled={loading}
                    className="w-full bg-[#070B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all shadow-[0_5px_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Processando...' : (isCadastro ? 'Criar Conta e Continuar' : 'Entrar na Conta')}
              </button>
            </form>
          </div>

          {/* RODAPÉ DO CONTEÚDO */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="font-serif italic text-slate-300 text-xs leading-relaxed">
              “Acheguem-se a Deus, e Ele se achegará a vocês.”
            </p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase mt-1">
              TIAGO 4:8
            </p>
            <div className="mt-3">
              <p className="text-[10px] text-slate-500">
                🔒 Ambiente seguro e criptografado • Supabase
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}