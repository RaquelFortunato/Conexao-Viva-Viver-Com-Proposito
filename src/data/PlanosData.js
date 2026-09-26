export const PLANOS_LEITURA = [
  {
    id: 'biblia-1-ano',
    titulo: 'Bíblia Completa em 1 Ano',
    descricao: 'Leitura diária de Gênesis a Apocalipse ao longo de 365 dias.',
    totalDias: 365,
    dias: Array.from({ length: 365 }, (_, i) => ({
      dia: i + 1,
      leitura: `Leitura do dia ${i + 1} - Acompanhamento Bíblico`
    }))
  },
  {
    id: 'cronologico',
    titulo: 'Bíblia em Ordem Cronológica',
    descricao: 'Conheça os eventos da Bíblia na exata ordem em que aconteceram na história.',
    totalDias: 365,
    dias: Array.from({ length: 365 }, (_, i) => ({
      dia: i + 1,
      leitura: `Ordem Cronológica - Dia ${i + 1}`
    }))
  },
  {
    id: 'proverbios-1-mes',
    titulo: 'Livro de Provérbios em 1 Mês',
    descricao: 'Um capítulo por dia para absorver toda a sabedoria de Provérbios.',
    totalDias: 31,
    dias: Array.from({ length: 31 }, (_, i) => ({
      dia: i + 1,
      leitura: `Provérbios ${i + 1}`
    }))
  },
  {
    id: 'salmos-1-mes',
    titulo: 'Livro de Salmos em 1 Mês',
    descricao: 'Mergulhe na adoração e nos louvores dos Salmos durante 30 dias.',
    totalDias: 30,
    dias: Array.from({ length: 30 }, (_, i) => {
      const inicio = i * 5 + 1;
      const fim = Math.min(inicio + 4, 150);
      return {
        dia: i + 1,
        leitura: inicio === fim ? `Salmos ${inicio}` : `Salmos ${inicio}-${fim}`
      };
    })
  },
  {
    id: 'evangelhos-60-dias',
    titulo: 'Os Evangelhos em 60 Dias',
    descricao: 'Leia a vida e os ensinamentos de Jesus em Mateus, Marcos, Lucas e João.',
    totalDias: 60,
    dias: Array.from({ length: 60 }, (_, i) => ({
      dia: i + 1,
      leitura: `Evangelhos - Dia ${i + 1}`
    }))
  }
];