import React, { useState } from 'react';

export default function AdminDashboardScreen() {
  const [activeTab, setActiveTab] = useState('conteudos');
  const [dailyQuote, setDailyQuote] = useState("O propósito de Deus na sua vida não depende das circunstâncias, mas da fidelidade dEle.");
  const [dailyReflection, setDailyReflection] = useState("Caminhar com fé significa dar o primeiro passo mesmo sem ver toda a escada.");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSaveContent = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("Conteúdos atualizados com sucesso!");
      setTimeout(() => setToastMessage(""), 3000);
    }, 800);
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Notificação Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-4 py-2 rounded-xl shadow-lg font-label-md text-label-md animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header Fixo Topo (Painel Admin) */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe border-b border-surface-container-highest">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary truncate leading-tight tracking-wide uppercase">Painel de Gestão</span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">Raquel Fortunato</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-space-xs flex-shrink-0">
            <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-caption text-caption text-on-surface font-semibold">Admin Ativo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-surface px-margin gap-space-lg">
        
        {/* Cards de Métricas Rápidas */}
        <div className="grid grid-cols-3 gap-space-xs">
          <div className="flex flex-col p-3 rounded-xl bg-surface-container shadow-sm border border-surface-container-highest/50">
            <span className="font-caption text-caption text-on-surface-variant">Usuários Ativos</span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1">1.482</span>
            <span className="font-caption text-[10px] text-secondary mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> +12% este mês
            </span>
          </div>
          
          <div className="flex flex-col p-3 rounded-xl bg-surface-container shadow-sm border border-surface-container-highest/50">
            <span className="font-caption text-caption text-on-surface-variant">Devocionais</span>
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold mt-1">365</span>
            <span className="font-caption text-[10px] text-on-surface-variant mt-0.5">Ano completo</span>
          </div>

          <div className="flex flex-col p-3 rounded-xl bg-surface-container shadow-sm border border-surface-container-highest/50">
            <span className="font-caption text-caption text-on-surface-variant">Sugestões</span>
            <span className="font-headline-sm text-headline-sm text-secondary font-bold mt-1">24</span>
            <span className="font-caption text-[10px] text-secondary mt-0.5">Pendentes mod.</span>
          </div>
        </div>

        {/* Abas de Navegação do Admin */}
        <div className="flex bg-surface-container p-1 rounded-xl shadow-sm">
          <button 
            onClick={() => setActiveTab('conteudos')}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${activeTab === 'conteudos' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            Conteúdos Diários
          </button>
          <button 
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${activeTab === 'config' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
            Marca & Ajustes
          </button>
        </div>

        {/* Conteúdo da Aba: Gestão de Conteúdos Diários */}
        {activeTab === 'conteudos' && (
          <form onSubmit={handleSaveContent} className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Publicar / Atualizar Dia</h2>
              <span className="font-caption text-caption text-primary">Data alvo: Hoje</span>
            </div>

            {/* Citação do Dia */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">format_quote</span>
                Citação do Dia
              </label>
              <textarea 
                value={dailyQuote}
                onChange={(e) => setDailyQuote(e.target.value)}
                rows="2"
                className="w-full rounded-xl bg-surface-container p-3 text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none transition-colors resize-none shadow-inner"
                placeholder="Digite a citação inspiracional..."
              />
            </div>

            {/* Reflexão Bíblica */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
                Reflexão / Mensagem Principal
              </label>
              <textarea 
                value={dailyReflection}
                onChange={(e) => setDailyReflection(e.target.value)}
                rows="4"
                className="w-full rounded-xl bg-surface-container p-3 text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none transition-colors resize-none shadow-inner"
                placeholder="Digite a reflexão devocional..."
              />
            </div>

            {/* Bloco de Módulos Extras (Áudio / Louvor) */}
            <div className="flex flex-col rounded-xl bg-surface-container p-space-md gap-space-sm border border-surface-container-highest/60">
              <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-tertiary">library_music</span>
                Mídia e Áudio Vinculados
              </span>
              <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">headphones</span>
                  <span className="font-label-md text-label-md text-on-surface">Playlist do Dia (Áudio Devocional)</span>
                </div>
                <button type="button" className="text-primary font-label-md text-label-md hover:underline">Alterar</button>
              </div>
            </div>

            {/* Botão de Publicação */}
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full h-12 flex items-center justify-center gap-space-sm rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:brightness-105 transition-all active:scale-[0.99] mt-2"
            >
              <span className="material-symbols-outlined text-[20px]">publish</span>
              {isSaving ? "Salvando Alterações..." : "Publicar para a Comunidade"}
            </button>
          </form>
        )}

        {/* Conteúdo da Aba: Configurações & Marca */}
        {activeTab === 'config' && (
          <div className="flex flex-col gap-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Personalização da Marca</h2>

            <div className="flex flex-col rounded-xl bg-surface-container p-space-md gap-space-md border border-surface-container-highest/60">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface">Logotipo Oficial</span>
                  <span className="font-caption text-caption text-on-surface-variant">Exibido no topo do app</span>
                </div>
                <button type="button" className="px-3 py-1.5 rounded-lg bg-surface-container-high font-label-md text-label-md text-primary hover:bg-surface-bright transition-colors">
                  Trocar Imagem
                </button>
              </div>

              <div className="h-[1px] bg-surface-container-highest opacity-40"></div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface">Foto da Responsável</span>
                  <span className="font-caption text-caption text-on-surface-variant">Raquel Fortunato</span>
                </div>
                <button type="button" className="px-3 py-1.5 rounded-lg bg-surface-container-high font-label-md text-label-md text-primary hover:bg-surface-bright transition-colors">
                  Atualizar Foto
                </button>
              </div>

              <div className="h-[1px] bg-surface-container-highest opacity-40"></div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface">Senha do Painel Admin</span>
                  <span className="font-caption text-caption text-on-surface-variant">Segurança de acesso restrito</span>
                </div>
                <button type="button" className="px-3 py-1.5 rounded-lg bg-error-container text-on-error-container font-label-md text-label-md hover:brightness-95 transition-colors">
                  Modificar Senha
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Navegação Inferior (Fixando a aba Admin ativa) */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-low/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.35)] border-t border-surface-container-highest">
        <div className="flex justify-around items-center h-16 px-space-xs">
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Home</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Bíblia</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Planos</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">explore</span>
            <span className="font-label-md text-label-md text-[11px] leading-none">Explorar</span>
          </a>
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-primary font-semibold transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            <span className="font-label-md text-label-md text-[11px] leading-none text-primary font-semibold">Admin</span>
          </a>
        </div>
      </nav>
    </div>
  );
}