import React, { useState } from 'react';

export default function Explorar({ onNavigate }) {
  // Estados para controlar os modais e avisos interativos
  const [modalAtivo, setModalAtivo] = useState(null); // 'promessa', 'medalhas', 'diario', 'concordancia', 'pedido', 'emBreve'
  const [tituloEmBreve, setTituloEmBreve] = useState('');
  const [promessaDoDia, setPromessaDoDia] = useState('"O Senhor é o meu pastor; nada me faltará." - Salmos 23:1');
  const [orando, setOrando] = useState(false);
  const [contadorOracao, setContadorOracao] = useState(42);

  const abrirEmBreve = (nomeRecurso) => {
    setTituloEmBreve(nomeRecurso);
    setModalAtivo('emBreve');
  };

  const tirarNovaPromessa = () => {
    const promessas = [
      "\"Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.\" - Provérbios 3:5",
      "\"Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.\" - João 11:25",
      "\"O Senhor te guardará de todo o mal; ele guardará a tua alma.\" - Salmos 121:7",
      "\"Esconde-me debaixo da sombra das tuas asas.\" - Salmos 17:8",
      "\"Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano.\" - Jeremias 29:11"
    ];
    const aleatoria = promessas[Math.floor(Math.random() * promessas.length)];
    setPromessaDoDia(aleatoria);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center relative">
      
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho Padronizado */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Explorar</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            RF
          </div>
        </div>

        {/* 1. Caixinha de Promessas */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">✨ Diário da Fé</span>
            <span className="text-[10px] text-slate-400">🟡 Promessa de Hoje</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Caixinha de Promessas</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Toque para retirar sua palavra de consolo e força para hoje.</p>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-base">🎁</span>
              <div>
                <p className="text-xs font-bold text-white">Tirar Promessa</p>
                <p className="text-[10px] text-slate-400 truncate max-w-[170px]">{promessaDoDia}</p>
              </div>
            </div>
            <button 
              onClick={() => setModalAtivo('promessa')}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Abrir
            </button>
          </div>
        </div>

        {/* 2. Medalhas & Conquistas */}
        <div 
          onClick={() => setModalAtivo('medalhas')}
          className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3 hover:border-amber-500/40 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">⭐</span>
              <h2 className="text-sm font-bold text-white">Medalhas & Conquistas</h2>
            </div>
            <span className="text-[10px] font-semibold text-amber-400">Nível 8 • Discípulo Fiel</span>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Progresso da Semana</span>
              <span className="text-white font-semibold">18 / 20 Hábitos</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-[90%] rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1">
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
              <span className="text-xs">🔥</span>
              <p className="text-[10px] font-bold text-white mt-1">14 Dias</p>
              <p className="text-[9px] text-slate-400">Constância</p>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
              <span className="text-xs">🙏</span>
              <p className="text-[10px] font-bold text-white mt-1">50 Preces</p>
              <p className="text-[9px] text-slate-400">Intercessor</p>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
              <span className="text-xs">📖</span>
              <p className="text-[10px] font-bold text-white mt-1">30 Cap.</p>
              <p className="text-[9px] text-slate-400">Leitor Voraz</p>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center opacity-60">
              <span className="text-xs">🔒</span>
              <p className="text-[10px] font-bold text-white mt-1">Mestre</p>
              <p className="text-[9px] text-slate-400">Bloqueado</p>
            </div>
          </div>
        </div>

        {/* 3. Jornadas & Hábitos Diários */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Jornadas & Hábitos Diários</h2>
          <div className="grid grid-cols-2 gap-2">
            <div 
              onClick={() => onNavigate && onNavigate('jejum')}
              className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer"
            >
              <span className="text-amber-400 text-base">🌾</span>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Desintoxicação</p>
              <h3 className="text-xs font-bold text-white">Jejum de Daniel</h3>
              <p className="text-[10px] text-slate-400 leading-tight">Guia espiritual, receitas e cronograma de 21 dias.</p>
            </div>
            <div 
              onClick={() => onNavigate && onNavigate('rotina')}
              className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer"
            >
              <span className="text-amber-400 text-base">☀️</span>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Devoção</p>
              <h3 className="text-xs font-bold text-white">Rotina Primeiro Amor</h3>
              <p className="text-[10px] text-slate-400 leading-tight">Restaure sua intimidade matinal com Deus.</p>
            </div>
          </div>
        </div>

        {/* 4. Desafios (Agora direcionando para o Desafio Celeste) */}
        <div 
          onClick={() => onNavigate && onNavigate('desafioceleste')}
          className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-amber-400 text-lg p-2 bg-slate-900 rounded-xl border border-slate-800">🎯</span>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Desafios</p>
              <h3 className="text-xs font-bold text-white">Desafio Celeste</h3>
              <p className="text-[10px] text-slate-400">Metas semanais de oração e atos de bondade.</p>
            </div>
          </div>
          <span className="text-slate-500">›</span>
        </div>

        {/* 5. Estudo, Louvor & Intimidade */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Estudo, Louvor & Intimidade</h2>
          
          <div className="space-y-2">
            <div 
              onClick={() => setModalAtivo('diario')}
              className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400">🔒</span>
                <div>
                  <h3 className="text-xs font-bold text-white">Meu Diário Espiritual 🛡️</h3>
                  <p className="text-[10px] text-slate-400">Reflexões protegidas com senha ou biometria.</p>
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </div>

            <div 
              onClick={() => setModalAtivo('concordancia')}
              className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400">🔍</span>
                <div>
                  <h3 className="text-xs font-bold text-white">Concordância Bíblica</h3>
                  <p className="text-[10px] text-slate-400">Busca temática por palavras, tópicos e versículos.</p>
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </div>

            <div 
              onClick={() => abrirEmBreve('Fábulas & Ensinamentos')}
              className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400">📖</span>
                <div>
                  <h3 className="text-xs font-bold text-white">Fábulas & Ensinamentos</h3>
                  <p className="text-[10px] text-slate-400">Histórias alegóricas e parábolas contemporâneas.</p>
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </div>

            <div 
              onClick={() => abrirEmBreve('Playlists de Músicas')}
              className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400">🎧</span>
                <div>
                  <h3 className="text-xs font-bold text-white">Playlists de Músicas</h3>
                  <p className="text-[10px] text-slate-400">Sons acústicos para oração, vigília e meditação.</p>
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </div>
          </div>
        </div>

        {/* 6. Hinários Completos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hinários Completos</h2>
            <span className="text-[10px] text-amber-400 font-semibold">5 Coleções</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div onClick={() => abrirEmBreve('Harpa Cristã')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
              <span className="text-amber-400 text-sm">🎶</span>
              <h3 className="text-xs font-bold text-white">Harpa Cristã</h3>
              <p className="text-[10px] text-slate-400">640 Hinos com Cifras</p>
            </div>
            <div onClick={() => abrirEmBreve('Cantor Cristão')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
              <span className="text-amber-400 text-sm">🎵</span>
              <h3 className="text-xs font-bold text-white">Cantor Cristão</h3>
              <p className="text-[10px] text-slate-400">577 Canções Clássicas</p>
            </div>
            <div onClick={() => abrirEmBreve('Cantor para Culto')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
              <span className="text-amber-400 text-sm">⛪</span>
              <h3 className="text-xs font-bold text-white">Cantor para Culto</h3>
              <p className="text-[10px] text-slate-400">Seleção Especial</p>
            </div>
            <div onClick={() => abrirEmBreve('Hinário Evangélico')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
              <span className="text-amber-400 text-sm">📜</span>
              <h3 className="text-xs font-bold text-white">Hinário Evangélico</h3>
              <p className="text-[10px] text-slate-400">Hinos Tradicionais</p>
            </div>
            <div onClick={() => abrirEmBreve('Hinário Novo Cântico')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer col-span-2">
              <span className="text-amber-400 text-sm">✨</span>
              <h3 className="text-xs font-bold text-white">Hinário Novo Cântico</h3>
              <p className="text-[10px] text-slate-400">Louvores Contemporâneos e Clássicos</p>
            </div>
          </div>
        </div>

        {/* 7. Mural de Intercessão */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">👥</span>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Mural de Intercessão</h2>
            </div>
            <button 
              onClick={() => setModalAtivo('pedido')}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer"
            >
              + Pedir Oração
            </button>
          </div>

          {/* Pedido 1 */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="font-semibold text-slate-300">MG • Maria das Graças</span>
              <span>Há 12 min</span>
            </div>
            <p className="text-[11px] text-slate-300 italic">"Peço orações pela cura e restauração da saúde do meu irmão Lucas no hospital."</p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
              <button 
                onClick={() => {
                  setOrando(!orando);
                  setContadorOracao(prev => orando ? prev - 1 : prev + 1);
                }}
                className={`transition cursor-pointer font-semibold ${orando ? 'text-amber-400' : 'text-slate-400 hover:text-amber-400'}`}
              >
                {orando ? '❤️ Você está orando' : '🤍 Estou Orando'} ({contadorOracao})
              </button>
              <span className="text-slate-500">Notificação mútua</span>
            </div>
          </div>
        </div>

        {/* Menu de Navegação Interna Consistente */}
        <div className="pt-4 border-t border-slate-800">
          <p className="text-[11px] text-amber-400 font-semibold mb-2 text-center tracking-wide">MENU DE NAVEGAÇÃO</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Home
            </button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Bíblia
            </button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Planos
            </button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-medium transition cursor-pointer text-center">
              Explorar
            </button>
            <button onClick={() => onNavigate && onNavigate('config')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Configurações
            </button>
            <button onClick={() => onNavigate && onNavigate('admin')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Admin
            </button>
          </div>
        </div>

      </div>

      {/* MODAIS INTERATIVOS */}
      {modalAtivo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            
            {/* Modal de Caixinha de Promessas */}
            {modalAtivo === 'promessa' && (
              <>
                <span className="text-3xl">🎁</span>
                <h3 className="text-base font-bold text-amber-400">Sua Promessa de Hoje</h3>
                <p className="text-xs text-slate-300 italic bg-slate-950/60 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                  {promessaDoDia}
                </p>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={tirarNovaPromessa}
                    className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Tirar Outra
                  </button>
                  <button 
                    onClick={() => setModalAtivo(null)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </>
            )}

            {/* Modal de Medalhas */}
            {modalAtivo === 'medalhas' && (
              <>
                <span className="text-3xl">⭐</span>
                <h3 className="text-base font-bold text-amber-400">Suas Conquistas</h3>
                <p className="text-xs text-slate-300">Você está no Nível 8 com 18 hábitos cumpridos esta semana. Continue firme na fé!</p>
                <button 
                  onClick={() => setModalAtivo(null)}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Fechar
                </button>
              </>
            )}

            {/* Modal de Diário */}
            {modalAtivo === 'diario' && (
              <>
                <span className="text-3xl">🛡️</span>
                <h3 className="text-base font-bold text-amber-400">Meu Diário Espiritual</h3>
                <p className="text-xs text-slate-300">Suas anotações e reflexões diárias com Deus estão protegidas e salvas com segurança.</p>
                <button 
                  onClick={() => setModalAtivo(null)}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Entendido
                </button>
              </>
            )}

            {/* Modal de Concordância */}
            {modalAtivo === 'concordancia' && (
              <>
                <span className="text-3xl">🔍</span>
                <h3 className="text-base font-bold text-amber-400">Concordância Bíblica</h3>
                <p className="text-xs text-slate-300">Ferramenta pronta para busca temática avançada por palavras-chave e versículos.</p>
                <button 
                  onClick={() => setModalAtivo(null)}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Fechar
                </button>
              </>
            )}

            {/* Modal de Pedido de Oração */}
            {modalAtivo === 'pedido' && (
              <>
                <span className="text-3xl">👥</span>
                <h3 className="text-base font-bold text-amber-400">Novo Pedido de Oração</h3>
                <textarea 
                  placeholder="Escreva seu pedido de oração para a comunidade..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 h-24 resize-none"
                ></textarea>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { alert('Pedido enviado com sucesso!'); setModalAtivo(null); }}
                    className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Enviar Pedido
                  </button>
                  <button 
                    onClick={() => setModalAtivo(null)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}

            {/* Modal para itens que ainda vai subir */}
            {modalAtivo === 'emBreve' && (
              <>
                <span className="text-3xl">🚧</span>
                <h3 className="text-base font-bold text-amber-400">{tituloEmBreve}</h3>
                <p className="text-xs text-slate-300">Este recurso está reservado e em breve receberá todo o conteúdo que você vai enviar!</p>
                <button 
                  onClick={() => setModalAtivo(null)}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Ok, aguardando!
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}