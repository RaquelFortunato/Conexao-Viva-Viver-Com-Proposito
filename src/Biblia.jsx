import React, { useState } from 'react';

export default function Biblia({ onNavigate }) {
  const [versao, setVersao] = useState('NVI Nova Versão Int.');
  const [livroAtual, setLivroAtual] = useState('João');
  const [capituloAtual, setCapituloAtual] = useState(15);
  const [testamento, setTestamento] = useState('Novo'); // 'Novo' ou 'Antigo'

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-5">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Bíblia</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm shadow">
            RF
          </div>
        </div>

        {/* 1. Caixa de Busca de Versículo / Palavra / Livro */}
        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-slate-400 w-full">
            <span className="text-amber-400 text-lg">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar versículo, palavra ou livro..." 
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition text-xs cursor-pointer">
            ⚙️
          </button>
        </div>

        {/* 2. Seletor de Versão e Atalho de Leitura */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex flex-col justify-center">
            <span className="text-[10px] text-slate-400">Versão</span>
            <select 
              value={versao} 
              onChange={(e) => setVersao(e.target.value)}
              className="bg-transparent text-xs text-amber-400 font-semibold focus:outline-none cursor-pointer mt-1"
            >
              <option value="NVI Nova Versão Int." className="bg-slate-900 text-white">NVI Nova Versão Int.</option>
              <option value="ACF Almeida Corrigida" className="bg-slate-900 text-white">ACF Almeida Corrigida</option>
              <option value="ARC Almeida Revista" className="bg-slate-900 text-white">ARC Almeida Revista</option>
            </select>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl shadow-inner flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Progresso</span>
              <span className="text-xs font-bold text-white">Continuar: Sl 23</span>
            </div>
            <button className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-xs">📖</button>
          </div>
        </div>

        {/* 3. Abas de Testamento */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
          <button 
            onClick={() => setTestamento('Novo')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
              testamento === 'Novo' 
                ? 'bg-amber-400 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Novo Testamento</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${testamento === 'Novo' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>27</span>
          </button>
          <button 
            onClick={() => setTestamento('Antigo')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
              testamento === 'Antigo' 
                ? 'bg-amber-400 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Antigo Testamento</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${testamento === 'Antigo' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>39</span>
          </button>
        </div>

        {/* 4. Seleção de Livro e Capítulo Ativo */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <h2 className="text-sm font-bold text-white">{livroAtual}</h2>
              <span className="text-xs text-amber-400 font-semibold">{capituloAtual}</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full">Evangelhos</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <button className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">‹ Livro Anterior</button>
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-white font-medium">Cap. {capituloAtual}</span>
            <button className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">Próximo Livro ›</button>
          </div>
        </div>

        {/* 5. Bloco de Leitura do Texto Bíblico */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/60 text-slate-400">
            <span>{livroAtual} Capítulo {capituloAtual}</span>
            <button className="text-amber-400 hover:underline flex items-center gap-1">🔊 Áudio Disponível</button>
          </div>

          <div className="space-y-3 text-slate-300 leading-relaxed">
            <p><span className="text-amber-400 font-bold mr-1.5">1</span> "Eu sou a videira verdadeira, e meu Pai é o agricultor."</p>
            <p><span className="text-amber-400 font-bold mr-1.5">2</span> Todo ramo que, estando em mim, não dá fruto, ele corta; e todo que dá fruto ele poda, para que produza ainda mais fruto.</p>
            <p><span className="text-amber-400 font-bold mr-1.5">3</span> Vorês já estão limpos, pela palavra que tenho falado a vocês.</p>
            <p><span className="text-amber-400 font-bold mr-1.5">4</span> Permaneçam em mim, e eu permanecerei em vocês. Nenhum ramo pode dar fruto por si mesmo, se não permanecer na videira. Vocês também não podem dar fruto, se não permanecerem em mim.</p>
            
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-amber-300 italic text-center">
              "Eu sou a videira; vocês são os ramos. Se alguém permanecer em mim e eu nele, esse dará muito fruto; pois sem mim vocês não podem fazer coisa alguma." (Versículo 5)
            </div>
          </div>
        </div>

        {/* 6. Menu de Navegação Interna (Home, Bíblia, Planos, Explorar, Configurações, Admin) */}
        <div className="pt-4 border-t border-slate-800">
          <p className="text-[11px] text-amber-400 font-semibold mb-2 text-center tracking-wide">MENU DE NAVEGAÇÃO</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onNavigate && onNavigate('home')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Home
            </button>
            <button onClick={() => onNavigate && onNavigate('biblia')} className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-medium transition cursor-pointer text-center">
              Bíblia
            </button>
            <button onClick={() => onNavigate && onNavigate('planos')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
              Planos
            </button>
            <button onClick={() => onNavigate && onNavigate('explorar')} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium transition cursor-pointer text-center">
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
    </div>
  );
}