import React, { useState } from 'react';

export default function AuthScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(isLoginMode ? "Login realizado com sucesso!" : "Conta criada com sucesso!");
    }, 1000);
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col justify-between antialiased selection:bg-primary-container selection:text-on-primary-container relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Topo / Cabeçalho */}
      <header className="pt-safe px-margin pt-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px]">flare</span>
          </div>
          <span className="font-label-md text-label-md tracking-wider text-primary uppercase">Conexão Viva</span>
        </div>
        <button 
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="font-label-md text-label-md text-secondary hover:underline"
        >
          {isLoginMode ? "Criar conta" : "Já tenho conta"}
        </button>
      </header>

      {/* Conteúdo Principal (Formulário) */}
      <main className="flex-1 flex flex-col justify-center px-margin z-10 max-w-md w-full mx-auto py-8">
        <div className="mb-6">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
            {isLoginMode ? "Bem-vindo(a) de volta!" : "Comece sua jornada"}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {isLoginMode 
              ? "Entre para continuar seu propósito diário com a Palavra." 
              : "Cadastre-se para acompanhar devocionais, planos e muito mais."}
          </p>
        </div>

        {/* Alternador de Abas */}
        <div className="flex bg-surface-container p-1 rounded-xl mb-6 shadow-sm">
          <button 
            type="button"
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all ${isLoginMode ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Entrar
          </button>
          <button 
            type="button"
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all ${!isLoginMode ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Cadastrar
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginMode && (
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">Nome Completo</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome" 
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">E-mail</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 material-symbols-outlined text-on-surface-variant text-[20px]">mail</span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com" 
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md text-on-surface">Senha</label>
              {isLoginMode && (
                <a href="#" className="font-caption text-caption text-primary hover:underline">Esqueceu a senha?</a>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 material-symbols-outlined text-on-surface-variant text-[20px]">lock</span>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta" 
                className="w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none transition-colors"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:brightness-105 transition-all active:scale-[0.99] mt-2"
          >
            <span>{isLoading ? "Processando..." : (isLoginMode ? "Entrar na Conta" : "Criar Minha Conta")}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>
      </main>

      {/* Rodapé informativo */}
      <footer className="pb-safe px-margin pb-6 text-center z-10">
        <p className="font-caption text-caption text-on-surface-variant">
          Ao continuar, você concorda com nossos <a href="#" className="text-primary hover:underline">Termos de Uso</a>.
        </p>
      </footer>
    </div>
  );
}