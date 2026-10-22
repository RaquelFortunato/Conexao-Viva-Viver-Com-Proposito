import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from './data/supabase';
import BIBLE_VERSIONS from './data/BibleData';

const LIVROS_BIBLIA = [
  // Antigo Testamento
  { id: 'gn', nome: 'Gênesis', testamento: 'VT', capitulos: 50 },
  { id: 'ex', nome: 'Êxodo', testamento: 'VT', capitulos: 40 },
  { id: 'lv', nome: 'Levítico', testamento: 'VT', capitulos: 27 },
  { id: 'nm', nome: 'Números', testamento: 'VT', capitulos: 36 },
  { id: 'dt', nome: 'Deuteronômio', testamento: 'VT', capitulos: 34 },
  { id: 'js', nome: 'Josué', testamento: 'VT', capitulos: 24 },
  { id: 'jz', nome: 'Juízes', testamento: 'VT', capitulos: 21 },
  { id: 'rt', nome: 'Rute', testamento: 'VT', capitulos: 4 },
  { id: '1sm', nome: '1 Samuel', testamento: 'VT', capitulos: 31 },
  { id: '2sm', nome: '2 Samuel', testamento: 'VT', capitulos: 24 },
  { id: '1rs', nome: '1 Reis', testamento: 'VT', capitulos: 22 },
  { id: '2rs', nome: '2 Reis', testamento: 'VT', capitulos: 25 },
  { id: '1cr', nome: '1 Crônicas', testamento: 'VT', capitulos: 29 },
  { id: '2cr', nome: '2 Crônicas', testamento: 'VT', capitulos: 36 },
  { id: 'ed', nome: 'Esdras', testamento: 'VT', capitulos: 10 },
  { id: 'ne', nome: 'Neemias', testamento: 'VT', capitulos: 13 },
  { id: 'et', nome: 'Ester', testamento: 'VT', capitulos: 10 },
  { id: 'job', nome: 'Jó', testamento: 'VT', capitulos: 42 },
  { id: 'sl', nome: 'Salmos', testamento: 'VT', capitulos: 150 },
  { id: 'pv', nome: 'Provérbios', testamento: 'VT', capitulos: 31 },
  { id: 'ec', nome: 'Eclesiastes', testamento: 'VT', capitulos: 12 },
  { id: 'ct', nome: 'Cantares', testamento: 'VT', capitulos: 8 },
  { id: 'is', nome: 'Isaías', testamento: 'VT', capitulos: 66 },
  { id: 'jr', nome: 'Jeremias', testamento: 'VT', capitulos: 52 },
  { id: 'lm', nome: 'Lamentações', testamento: 'VT', capitulos: 5 },
  { id: 'ez', nome: 'Ezequiel', testamento: 'VT', capitulos: 48 },
  { id: 'dn', nome: 'Daniel', testamento: 'VT', capitulos: 12 },
  { id: 'os', nome: 'Oséias', testamento: 'VT', capitulos: 14 },
  { id: 'jl', nome: 'Joel', testamento: 'VT', capitulos: 3 },
  { id: 'am', nome: 'Amós', testamento: 'VT', capitulos: 9 },
  { id: 'ob', nome: 'Obadias', testamento: 'VT', capitulos: 1 },
  { id: 'jn', nome: 'Jonas', testamento: 'VT', capitulos: 4 },
  { id: 'mq', nome: 'Miqueias', testamento: 'VT', capitulos: 7 },
  { id: 'na', nome: 'Naum', testamento: 'VT', capitulos: 3 },
  { id: 'hc', nome: 'Habacuque', testamento: 'VT', capitulos: 3 },
  { id: 'sf', nome: 'Sofonias', testamento: 'VT', capitulos: 3 },
  { id: 'ag', nome: 'Ageu', testamento: 'VT', capitulos: 2 },
  { id: 'zc', nome: 'Zacarias', testamento: 'VT', capitulos: 14 },
  { id: 'ml', nome: 'Malaquias', testamento: 'VT', capitulos: 4 },
  
  // Novo Testamento
  { id: 'mt', nome: 'Mateus', testamento: 'NT', capitulos: 28 },
  { id: 'mc', nome: 'Marcos', testamento: 'NT', capitulos: 16 },
  { id: 'lc', nome: 'Lucas', testamento: 'NT', capitulos: 24 },
  { id: 'jo', nome: 'João', testamento: 'NT', capitulos: 21 },
  { id: 'at', nome: 'Atos', testamento: 'NT', capitulos: 28 },
  { id: 'rm', nome: 'Romanos', testamento: 'NT', capitulos: 16 },
  { id: '1co', nome: '1 Coríntios', testamento: 'NT', capitulos: 16 },
  { id: '2co', nome: '2 Coríntios', testamento: 'NT', capitulos: 13 },
  { id: 'gl', nome: 'Gálatas', testamento: 'NT', capitulos: 6 },
  { id: 'ef', nome: 'Efésios', testamento: 'NT', capitulos: 6 },
  { id: 'fp', nome: 'Filipenses', testamento: 'NT', capitulos: 4 },
  { id: 'cl', nome: 'Colossenses', testamento: 'NT', capitulos: 4 },
  { id: '1ts', nome: '1 Tessalonicenses', testamento: 'NT', capitulos: 5 },
  { id: '2ts', nome: '2 Tessalonicenses', testamento: 'NT', capitulos: 3 },
  { id: '1tm', nome: '1 Timóteo', testamento: 'NT', capitulos: 6 },
  { id: '2tm', nome: '2 Timóteo', testamento: 'NT', capitulos: 4 },
  { id: 'tt', nome: 'Tito', testamento: 'NT', capitulos: 3 },
  { id: 'fm', nome: 'Filemom', testamento: 'NT', capitulos: 1 },
  { id: 'hb', nome: 'Hebreus', testamento: 'NT', capitulos: 13 },
  { id: 'tg', nome: 'Tiago', testamento: 'NT', capitulos: 5 },
  { id: '1pe', nome: '1 Pedro', testamento: 'NT', capitulos: 5 },
  { id: '2pe', nome: '2 Pedro', testamento: 'NT', capitulos: 3 },
  { id: '1jo', nome: '1 João', testamento: 'NT', capitulos: 5 },
  { id: '2jo', nome: '2 João', testamento: 'NT', capitulos: 1 },
  { id: '3jo', nome: '3 João', testamento: 'NT', capitulos: 1 },
  { id: 'jd', nome: 'Judas', testamento: 'NT', capitulos: 1 },
  { id: 'ap', nome: 'Apocalipse', testamento: 'NT', capitulos: 22 }
];

export default function Biblia({ onNavigate, userName }) {
  const [versaoId, setVersaoId] = useState('nvi');
  const [testamento, setTestamento] = useState('VT');
  const [livro, setLivro] = useState(LIVROS_BIBLIA.find(l => l.id === 'sl'));
  const [capitulo, setCapitulo] = useState(23);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para calcular as iniciais do usuário
  const getIniciais = (nome) => {
    if (!nome) return 'RF';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const iniciaisUsuario = getIniciais(userName || 'Raquel Fortunato');

  useEffect(() => {
    async function carregarPerfilEAdmin() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (user.email && user.email.toLowerCase() === 'raquellosnak@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          const { data: perfilData, error: perfilError } = await supabase
            .from('perfis_usuario')
            .select('foto_url, foto_perfil')
            .eq('id', user.id)
            .single();

          if (perfilData && !perfilError) {
            if (perfilData.foto_url || perfilData.foto_perfil) {
              setFotoPerfil(perfilData.foto_url || perfilData.foto_perfil);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil na Bíblia:", error);
      }
    }
    carregarPerfilEAdmin();
  }, []);

  const livrosFiltrados = useMemo(() => {
    return LIVROS_BIBLIA.filter(l => l.testamento === testamento);
  }, [testamento]);

  const versiculosAtuais = useMemo(() => {
    const versaoObj = BIBLE_VERSIONS.find(v => v.id === versaoId);
    if (!versaoObj || !versaoObj.data) return [];

    const livroObj = versaoObj.data.find(b => {
      const bAbbrev = (b.abbrev || b.sigla || '').toLowerCase();
      const bName = (b.name || b.nome || '').toLowerCase();
      const targetId = livro.id.toLowerCase();
      const targetName = livro.nome.toLowerCase();

      return bAbbrev === targetId || bName === targetName || bName.includes(targetName);
    });

    if (!livroObj) return [];

    const capitulosData = livroObj.chapters || livroObj.capitulos;
    if (!capitulosData) return [];

    const capituloArray = capitulosData[capitulo - 1];
    if (!capituloArray) return [];

    return capituloArray.map((item, index) => {
      if (typeof item === 'string') {
        return { numero: index + 1, texto: item };
      }
      return {
        numero: item.number || item.numero || index + 1,
        texto: item.text || item.texto || item
      };
    });
  }, [versaoId, livro, capitulo]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-4">
        
        {/* Cabeçalho com o nome do app e a foto ou iniciais do perfil */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold text-white">Conexão Viva <span className="text-amber-400 font-normal">• Viver com Propósito</span></h1>
            <p className="text-[11px] text-slate-400">Bíblia Sagrada</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm shadow-md">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              iniciaisUsuario
            )}
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl space-y-2">
          <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Versão da Bíblia</label>
          <select 
            value={versaoId}
            onChange={(e) => setVersaoId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-xs text-white font-semibold rounded-xl p-2.5 focus:outline-none cursor-pointer"
          >
            {BIBLE_VERSIONS.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
          <button 
            onClick={() => {
              setTestamento('VT');
              const primeiroVT = LIVROS_BIBLIA.find(l => l.testamento === 'VT');
              setLivro(primeiroVT);
              setCapitulo(1);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              testamento === 'VT' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Antigo Testamento
          </button>
          <button 
            onClick={() => {
              setTestamento('NT');
              const primeiroNT = LIVROS_BIBLIA.find(l => l.testamento === 'NT');
              setLivro(primeiroNT);
              setCapitulo(1);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              testamento === 'NT' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Novo Testamento
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Livro</label>
            <select 
              value={livro.id}
              onChange={(e) => {
                const l = LIVROS_BIBLIA.find(item => item.id === e.target.value);
                setLivro(l);
                setCapitulo(1);
              }}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2 focus:outline-none cursor-pointer"
            >
              {livrosFiltrados.map(l => (
                <option key={l.id} value={l.id}>{l.nome}</option>
              ))}
            </select>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Capítulo</label>
            <select 
              value={capitulo}
              onChange={(e) => setCapitulo(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2 focus:outline-none cursor-pointer"
            >
              {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>Cap. {num}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-amber-400">
              {livro.nome} {capitulo}
            </h2>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{versaoId}</span>
          </div>

          {/* Área de texto dos versículos com a barra branca OCULTA */}
          <div className="text-xs text-slate-300 leading-relaxed space-y-2 font-serif max-h-64 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-1">
            {versiculosAtuais.length > 0 ? (
              versiculosAtuais.map((v) => (
                <p key={v.numero}>
                  <sup className="text-amber-400 font-sans font-bold mr-1">{v.numero}</sup>
                  {v.texto}
                </p>
              ))
            ) : (
              <p className="text-center text-slate-500 py-6">Nenhum versículo encontrado para esta seleção.</p>
            )}
          </div>
        </div>

        {/* Menu de Navegação Integrado */}
        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button type="button" onClick={() => onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Home</button>
            <button type="button" onClick={() => onNavigate('biblia')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Bíblia</button>
            <button type="button" onClick={() => onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Planos</button>
            <button type="button" onClick={() => onNavigate('explorar')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Explorar</button>
            <button type="button" onClick={() => onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-[9px] font-medium cursor-pointer">Config</button>
            {isAdmin && (
              <button type="button" onClick={() => onNavigate('admin')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-amber-400 hover:text-white text-[9px] font-bold cursor-pointer">Admin</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}