// src/data/BibleData.js

import ACF from './biblias/ACF (1).json';
import ARA from './biblias/ARA (1).json';
import ARC from './biblias/ARC (1).json';
import AS21 from './biblias/AS21 (1).json';
import JFAA from './biblias/JFAA (1).json';
import KJA from './biblias/KJA (1).json';
import KJF from './biblias/KJF (1).json';
import NAA from './biblias/NAA (1).json';
import NBV from './biblias/NBV (1).json';
import NTLH from './biblias/NTLH (1).json';
import NVI from './biblias/NVI (1).json';
import NVT from './biblias/NVT (1).json';
import ALM1911 from './biblias/ALM1911 (1).json';
import TB from './biblias/TB (1).json';
import BLIVRE from './biblias/BLIVRE (1).json';
import OL from './biblias/OL (1).json';
import MENS from './biblias/MENS (1).json';
import VFL from './biblias/VFL (1).json';

export const BIBLE_VERSIONS = [
  { id: 'acf', name: 'Almeida Corrigida e Fiel', data: ACF },
  { id: 'ara', name: 'Almeida Revista e Atualizada', data: ARA },
  { id: 'arc', name: 'Almeida Revista e Corrigida', data: ARC },
  { id: 'as21', name: 'Almeida Século 21', data: AS21 },
  { id: 'jfaa', name: 'Almeida Atualizada', data: JFAA },
  { id: 'kja', name: 'King James Atualizada', data: KJA },
  { id: 'kjf', name: 'King James Fiel', data: KJF },
  { id: 'naa', name: 'Nova Almeida Atualizada', data: NAA },
  { id: 'nbv', name: 'Nova Bíblia Viva', data: NBV },
  { id: 'ntlh', name: 'Nova Tradução na Linguagem de Hoje', data: NTLH },
  { id: 'nvi', name: 'Nova Versão Internacional', data: NVI },
  { id: 'nvt', name: 'Nova Versão Transformadora', data: NVT },
  { id: 'alm1911', name: 'Almeida 1911', data: ALM1911 },
  { id: 'tb', name: 'Tradução Brasileira', data: TB },
  { id: 'blivre', name: 'Bíblia Livre', data: BLIVRE },
  { id: 'ol', name: 'O Livro', data: OL },
  { id: 'mens', name: 'A Mensagem', data: MENS },
  { id: 'vfl', name: 'Versão Fácil de Ler', data: VFL },
];

export function getVerse(versionId, bookAbbrev, chapter, verse) {
  const version = BIBLE_VERSIONS.find(v => v.id === versionId);
  if (!version) return null;
  
  const book = version.data.find(b => b.abbrev === bookAbbrev);
  if (!book) return null;
  
  const chap = book.chapters[chapter - 1];
  if (!chap) return null;
  
  return chap[verse - 1] || null;
}

export default BIBLE_VERSIONS;