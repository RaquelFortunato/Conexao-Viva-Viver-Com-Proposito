import React, { useState } from 'react';

export default function AccountSettingsScreen() {
  const [cacheStatus, setCacheStatus] = useState("42.8 MB ocupados com mídia off-line");
  const [isCleaning, setIsCleaning] = useState(false);
  const [fontSizeLabel, setFontSizeLabel] = useState("Médio (16px)");
  const [dailyReminder, setDailyReminder] = useState(true);

  const handleClearCache = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setIsCleaning(false);
      setCacheStatus("0.0 MB ocupados (Tudo em ordem)");
    }, 900);
  };

  const handleFontSizeChange = (e) => {
    const labels = {
      '1': 'Compacto (14px)',
      '2': 'Médio (16px)',
      '3': 'Expandido (19px)'
    };
    setFontSizeLabel(labels[e.target.value] || 'Médio (16px)');
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Fixo Topo */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <img 
              alt="Logo Conexão Viva" 
              className="h-8 w-auto object-contain flex-shrink-0" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XFl-KQE3U0xdqVUeO8uSuBMeglP10yE2tk2nwpMyJKa3BxXY2HYizp3m0F5PsraNqUl4eeyNjNeFulRUZ_RB2F_2bHUUYiZLmMmmavombY28bSeA3pyzpJVkCBhMGHHWj7BNgg0y2PnFZrVs_kDW-Gy63jc3Pfte4La5xBlQVbjXEFvoV57bjbO8d1yFzyCuGOwmnnngQURjO5eGGTT0Wq0sNDFgPQE0AN0m14ids3O6xy8DRzmEMKwg" 
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary truncate leading-tight tracking-wide uppercase">Conexão Viva</span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">Configurações da Conta</h1>
            </div>
          </div>
          <div className="flex items-center gap-space-xs flex-shrink-0">
            <a className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors" href="#">
              <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VdrMEmNvKZ5Bx9ep4HCkhq4eS92ijyXVRmjMx90BBisLKz4CCHoP5Lj78MZzDSUUkNXMrOKSOTcl6GGqWi4FWSLSPJDm4lzU04gmt0Ts59UTccIkVKmc4bdYTn3-K5b22MxO07jc8XxWtwP97A6knN1-sbstwif6wAKczKKe6y-EuJdmqd5t3HRQWtRQ6X-WmAS_vSs6aICAac85jBXNqDJazEJvYpujrWTo4ZMLL5Fp-OI9W0L-bZ0A" />
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface px-margin">
        <div className="flex flex-col w-full gap-space-lg pb-8">
          
          {/* Card de Perfil */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
            <div className="flex items-center gap-space-md relative z-10">
              <div className="relative flex-shrink-0">
                <img className="w-16 h-16 rounded-full object-cover shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxfcwpBRGfwYEf14P3htUtZ7_Kcu0GEqlvolzAVRU8BzwL0uG9EdCH69Sc-mEQOTS5PR3WhSGuKVcDKjwA8TCJmbiB01I1EMKpg_h_qZS4Z8YVWUMHv9pfVQpDcq6DueZNZApHz0BXVCR6o4bzf1e2krlzo0axZWE1Dp5KowARU-dMfeJRo83PWAMiOrqSDbq5QbIHobzkyUefg4w_cGz0-CYiMBp1caA1VkUt5g" alt="Sara Albuquerque" />
                <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Sara Albuquerque</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 font-caption text-caption text-primary">
                    <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                    Membro Conexão Viva
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">sara.albuquerque@email.com</p>
                <span className="font-caption text-caption text-secondary mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">calendar_month</span>
                  Caminhando há 142 dias no propósito
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-space-sm mt-space-md pt-space-sm">
              <button className="flex items-center justify-center gap-space-xs h-11 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors active:scale-[0.98]" type="button">
                <span className="material-symbols-outlined text-[18px] text-primary">edit</span>
                Editar Perfil
              </button>
              <button className="flex items-center justify-center gap-space-xs h-11 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors active:scale-[0.98]" type="button">
                <span className="material-symbols-outlined text-[18px] text-secondary">lock_reset</span>
                Alterar Senha
              </button>
            </div>
          </div>

          {/* Seção Geral & Hábitos */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-space-xs">
              <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider">Geral & Hábitos</span>
              <span className="font-caption text-caption text-on-surface-variant">Preferências do App</span>
            </div>
            
            <div className="flex flex-col rounded-xl bg-surface-container overflow-hidden shadow-sm">
              {/* Cache */}
              <div className="flex items-center justify-between p-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[22px]">cleaning_services</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface">Armazenamento em Cache</span>
                    <span className="font-caption text-caption text-on-surface-variant">{cacheStatus}</span>
                  </div>
                </div>
                <button 
                  onClick={handleClearCache}
                  disabled={isCleaning}
                  className="flex items-center gap-1 rounded-full bg-primary-container px-3 py-1.5 font-label-md text-label-md text-on-primary-container transition-transform active:scale-95 shadow-sm hover:brightness-110" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                  <span>{isCleaning ? "Limpando..." : "Liberar 42.8 MB"}</span>
                </button>
              </div>

              <div className="h-[1px] bg-surface-container-highest mx-space-md opacity-40"></div>

              {/* Histórico */}
              <a className="flex items-center justify-between p-space-md hover:bg-surface-container-high/60 transition-colors" href="#">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-tertiary">
                    <span className="material-symbols-outlined text-[22px]">history_edu</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface">Registros e Histórico</span>
                    <span className="font-caption text-caption text-on-surface-variant truncate">48 devocionais lidos • 19 anotações guardadas</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="font-caption text-caption text-primary">Ver todos</span>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </div>
              </a>

              <div className="h-[1px] bg-surface-container-highest mx-space-md opacity-40"></div>

              {/* Tamanho da Fonte */}
              <div className="flex flex-col p-space-md gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-md">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-secondary">
                      <span className="material-symbols-outlined text-[22px]">format_size</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface">Tamanho da Fonte de Leitura</span>
                      <span className="font-caption text-caption text-on-surface-variant">Conforto visual nas Escrituras</span>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">{fontSizeLabel}</span>
                </div>
                <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg">
                  <span className="font-label-md text-label-md text-on-surface-variant px-2">A-</span>
                  <input 
                    className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
                    max="3" min="1" type="range" defaultValue="2" 
                    onChange={handleFontSizeChange}
                  />
                  <span className="font-headline-sm text-headline-sm text-on-surface px-2">A+</span>
                </div>
              </div>

              <div className="h-[1px] bg-surface-container-highest mx-space-md opacity-40"></div>

              {/* Lembrete Diário */}
              <div className="flex items-center justify-between p-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[22px]">alarm</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface">Lembrete Diário da Palavra</span>
                    <span className="font-caption text-caption text-on-surface-variant">Momento de quietude pela manhã</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <button className="flex items-center gap-1 rounded-md bg-surface-container-high px-2.5 py-1 text-on-surface font-label-md text-label-md hover:bg-surface-bright" type="button">
                    <span>06:30</span>
                    <span className="material-symbols-outlined text-[14px] text-primary">edit</span>
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      checked={dailyReminder} 
                      onChange={() => setDailyReminder(!dailyReminder)} 
                      className="sr-only peer" 
                      type="checkbox" 
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Seção Institucional */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-space-xs">
              <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider">Institucional & Ministério</span>
              <span className="font-caption text-caption text-on-surface-variant">Transparência</span>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-sm">
              <div className="flex items-start gap-space-md">
                <img className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxNGwt_N_aQUzTb9YhwmPkCU4OyYbvMV8a3mPODIsRHf30ObQ2gOJEDofjJbYI1j1RryCf5U2oDLe6kxrUq8-SS-gzrJfzfnjMpvQRN766NVnAN0RZHMGepKVZfUG2boFKMua0BD4fSQiGOCUUcC_TbqcYAV2zeq9V0HZTGjFxZGgsumd3WO9amUZoUuQumGmbuZeQPb_BnVe1h0edAJAHIoNUWUcmHEUvMpeuaw" alt="Raquel Fortunato" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Sobre Nós</h3>
                    <span className="material-symbols-outlined text-[18px] text-secondary">church</span>
                  </div>
                  <span className="font-caption text-caption text-primary font-semibold">Ministério & Criadora Raquel Fortunato</span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                    O <strong className="text-on-surface">Conexão Viva</strong> nasceu sob a direção de Raquel Fortunato com o propósito inegociável de despertar corações para um relacionamento íntimo, diário e transformador com Deus através de práticas espirituais bíblicas.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-xl bg-surface-container overflow-hidden shadow-sm">
              <a className="flex items-center justify-between p-space-md hover:bg-surface-container-high/60 transition-colors" href="#">
                <div className="flex items-center gap-space-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">gavel</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface">Termos de Uso</span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_forward_ios</span>
              </a>
              <div className="h-[1px] bg-surface-container-highest mx-space-md opacity-40"></div>
              <a className="flex items-center justify-between p-space-md hover:bg-surface-container-high/60 transition-colors" href="#">
                <div className="flex items-center gap-space-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">privacy_tip</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface">Política de Privacidade</span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_forward_ios</span>
              </a>
              <div className="h-[1px] bg-surface-container-highest mx-space-md opacity-40"></div>
              <div className="flex items-center justify-between p-space-md bg-surface-container-low/50">
                <div className="flex items-center gap-space-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">info</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface">Versão do Aplicativo</span>
                    <span className="font-caption text-caption text-on-surface-variant">Compilação estável e segura</span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-tertiary bg-tertiary/10 px-2.5 py-1 rounded-md">v2.4.0 (Build 118)</span>
              </div>
            </div>
          </div>

          {/* Botões de Ação de Conta */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <button className="w-full h-12 flex items-center justify-center gap-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors active:scale-[0.99] shadow-sm" type="button">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">logout</span>
              Sair da Conta
            </button>
            <button className="w-full py-2.5 flex items-center justify-center gap-1.5 text-error/80 hover:text-error font-caption text-caption transition-colors" type="button">
              <span className="material-symbols-outlined text-[16px]">person_remove</span>
              Excluir Minha Conta Permanentemente
            </button>
          </div>

        </div>
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-low/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.35)]">
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
          <a className="flex flex-col items-center justify-center flex-1 h-12 gap-0.5 text-primary-container font-semibold transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span className="font-label-md text-label-md text-[11px] leading-none text-primary-container font-semibold">Configurações</span>
          </a>
        </div>
      </nav>
    </div>
  );
}