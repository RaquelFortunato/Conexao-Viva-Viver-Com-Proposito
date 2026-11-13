import React, { useState } from 'react';
import { fasesJejum, diasJejum } from './data/JejumData';

export default function JejumDaniel({ onNavigate }) {
  const [diaSelecionado, setDiaSelecionado] = useState(diasJejum[0]);
  const [concluidos, setConcluidos] = useState({});
  const [anotacoes, setAnotacoes] = useState({});
  const [editandoAnotacao, setEditandoAnotacao] = useState(false);
  const [textoAnotacaoTemp, setTextoAnotacaoTemp] = useState('');
  
  const [faseAtivaFiltro, setFaseAtivaFiltro] = useState(null);

  const toggleConcluido = (diaNum) => {
    setConcluidos(prev => ({
      ...prev,
      [diaNum]: !prev[diaNum]
    }));
  };

  const totalConcluidos = Object.values(concluidos).filter(Boolean).length;
  const progressoPorcentagem = Math.round((totalConcluidos / 21) * 100);

  const faseAtualDoDia = fasesJejum.find(
    f => diaSelecionado.dia >= f.diasRange[0] && diaSelecionado.dia <= f.diasRange[1]
  );

  return (
    <div className="min-h-screen bg-[#0E1525] text-white flex flex-col items-center justify-start p-0 sm:p-4 relative overflow-y-auto">
      
      {/* Brilho ambiental sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TELA INTEGRADA DE PONTA A PONTA */}
      <div className="w-full max-w-md min-h-screen sm:min-h-0 bg-[#0E1525] sm:rounded-3xl border-0 sm:border border-slate-800/80 shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md z-10 overflow-hidden flex flex-col my-auto">
        
        {/* TOPO / CABEÇALHO */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate && onNavigate('explorar')}
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition cursor-pointer"
            >
              ←
            </button>
            <div>
              <h1 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Conexão Viva</span>
                <span className="text-amber-400 font-normal">• Sessão de Propósito</span>
              </h1>
              <p className="text-[10px] text-slate-400">Jejum de Daniel (21 Dias)</p>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl">
            <span className="text-[10px] font-bold text-amber-400">{totalConcluidos} concluídos</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-5">

          {/* TÍTULO E PROGRESSO */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Ícone de Chama Dourada em SVG */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  DIA {diaSelecionado.dia < 10 ? `0${diaSelecionado.dia}` : diaSelecionado.dia} DE 21
                </span>
                <h2 className="text-xl font-serif font-semibold text-white mt-0.5">Jejum de Daniel</h2>
              </div>
            </div>
            <p className="text-xs text-slate-400">21 Dias de Purificação Espiritual e Intimidade Divina</p>

            {/* Barra de Progresso */}
            <div className="bg-[#070B14] p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Progresso da Aliança</span>
                <span className="text-amber-400 font-bold">{progressoPorcentagem}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressoPorcentagem}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-0.5">
                <span>Início: 1º dia da jornada</span>
                <span>Meta: Finalizar os 21 dias</span>
              </div>
            </div>
          </div>

          {/* TRÊS FASES DA PURIFICAÇÃO */}
          <div className="space-y-2">
            <div className="px-1">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>✨ Três Fases da Purificação</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {fasesJejum.map((fase) => {
                const isSelectedFase = faseAtivaFiltro === fase.fase;
                const isActiveDayInFase = faseAtualDoDia && faseAtualDoDia.fase === fase.fase;
                
                return (
                  <div 
                    key={fase.fase} 
                    onClick={() => {
                      setFaseAtivaFiltro(fase.fase);
                      const primeiroDiaDaFase = diasJejum.find(d => d.dia === fase.diasRange[0]);
                      if (primeiroDiaDaFase) {
                        setDiaSelecionado(primeiroDiaDaFase);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                      isSelectedFase || isActiveDayInFase
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/5' 
                        : 'bg-[#070B14] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        isSelectedFase || isActiveDayInFase ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Fase {fase.fase} • Dias {fase.diasRange[0]} a {fase.diasRange[1]}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5">{fase.titulo}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {fase.descricao}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CALENDÁRIO DO JEJUM */}
          <div className="space-y-2">
            <div className="px-1 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md text-slate-950 font-bold text-xs">
                📅
              </div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                CALENDÁRIO DO JEJUM
              </h3>
            </div>

            <div className="grid grid-cols-7 gap-1.5 bg-[#070B14] p-3 rounded-2xl border border-slate-800/80">
              {diasJejum.map((item) => {
                const isSelected = diaSelecionado.dia === item.dia;
                const isDone = concluidos[item.dia];
                
                const faseDaCurrentItem = fasesJejum.find(f => item.dia >= f.diasRange[0] && item.dia <= f.diasRange[1]);
                const isInSelectedPhase = faseDaCurrentItem && faseDaCurrentItem.fase === faseAtivaFiltro;

                return (
                  <button
                    key={item.dia}
                    onClick={() => {
                      setDiaSelecionado(item);
                      if (faseDaCurrentItem) {
                        setFaseAtivaFiltro(faseDaCurrentItem.fase);
                      }
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex flex-col items-center justify-center border ${
                      isSelected 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-300 shadow-md scale-105 z-10' 
                        : isInSelectedPhase
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : isDone
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.dia < 10 ? `0${item.dia}` : item.dia}</span>
                    {isDone && !isSelected && <span className="text-[8px] text-emerald-400 mt-0.5">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DETALHE DO DIA SELECIONADO */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-semibold text-amber-400">
                Dia {diaSelecionado.dia < 10 ? `0${diaSelecionado.dia}` : diaSelecionado.dia}: {diaSelecionado.titulo}
              </h3>
            </div>

            {/* Versículo Âncora (Livro/Pena) */}
            <div className="bg-[#070B14] border border-slate-800/80 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md text-slate-950 text-xs font-bold">
                  📖
                </div>
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  VERSÍCULO ÂNCORA
                </span>
              </div>
              <p className="text-xs text-slate-200 italic leading-relaxed pl-9">"{diaSelecionado.versiculo}"</p>
            </div>

            {/* Meditação (Chama) */}
            <div className="bg-[#070B14] border border-slate-800/80 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md text-slate-950 text-xs font-bold">
                  🔥
                </div>
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  MEDITAÇÃO
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-9">{diaSelecionado.meditacao}</p>
            </div>

            {/* Oração do Dia (Homem Ajoelhado / Oração) */}
            <div className="bg-[#070B14] border border-slate-800/80 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md text-slate-950 text-xs font-bold">
                  🙏
                </div>
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  ORAÇÃO DO DIA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-9">{diaSelecionado.oracao}</p>
            </div>

            {/* Anotação do Meu Espírito (Bloco de Notas) */}
            <div className="bg-[#070B14] border border-slate-800/80 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md text-slate-950 text-xs font-bold">
                    ✍️
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                    ANOTAÇÃO DO MEU ESPÍRITO
                  </span>
                </div>
                <span className="text-[9px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full">Privado</span>
              </div>
              
              {editandoAnotacao ? (
                <div className="space-y-2 pt-1">
                  <textarea
                    value={textoAnotacaoTemp !== '' ? textoAnotacaoTemp : (anotacoes[diaSelecionado.dia] || '')}
                    onChange={(e) => setTextoAnotacaoTemp(e.target.value)}
                    placeholder="Escreva o que Deus falou ao seu coração hoje..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditandoAnotacao(false)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setAnotacoes(prev => ({ ...prev, [diaSelecionado.dia]: textoAnotacaoTemp }));
                        setEditandoAnotacao(false);
                      }}
                      className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-bold rounded-lg transition"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => {
                    setTextoAnotacaoTemp(anotacoes[diaSelecionado.dia] || '');
                    setEditandoAnotacao(true);
                  }}
                  className="cursor-pointer group pt-1"
                >
                  <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/50 group-hover:border-amber-500/30 transition pl-9">
                    {anotacoes[diaSelecionado.dia] || '"Toque aqui para registrar o seu diário ou revelação espiritual recebida hoje..."'}
                  </p>
                  <p className="text-[10px] text-amber-400 font-semibold mt-1 text-right">
                    {anotacoes[diaSelecionado.dia] ? 'Editar diário do dia →' : 'Escrever anotação →'}
                  </p>
                </div>
              )}
            </div>

            {/* BOTÃO DE CONCLUIR DIA */}
            <button
              onClick={() => toggleConcluido(diaSelecionado.dia)}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                concluidos[diaSelecionado.dia]
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-slate-950 hover:from-amber-400 hover:to-amber-200 shadow-[0_5px_20px_rgba(245,158,11,0.3)]'
              }`}
            >
              <span>{concluidos[diaSelecionado.dia] ? '✓ Dia Concluído com Sucesso' : `Consagrar e Concluir Dia ${diaSelecionado.dia < 10 ? `0${diaSelecionado.dia}` : diaSelecionado.dia}`}</span>
            </button>
          </div>

          {/* RODAPÉ */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-1 pb-2">
            <p className="font-serif italic text-slate-400 text-xs">
              “Aquele que começou a boa obra em vocês há de completá-la até o grande dia.”
            </p>
            <p className="text-[9px] font-bold tracking-[0.2em] text-amber-400 uppercase">
              FILIPENSES 1:6 • FOGO CONTÍNUO
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}