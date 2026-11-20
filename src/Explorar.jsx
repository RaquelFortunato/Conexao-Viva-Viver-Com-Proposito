import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase';

const APK_DOWNLOAD_URL =
  'https://github.com/RaquelFortunato/Conexao-Viva-Viver-Com-Proposito/releases/download/v1.0.40/app-conexao-viva-viver-com-proposito.apk';

const LISTA_FILMES_RECOMENDADOS = [
  {
    id: 1,
    titulo: 'Mais que Vencedores',
    capa: '',
    corCapa: 'from-amber-700/80 via-slate-900 to-slate-950',
    sinopse: 'Um treinador de basquete precisa assumir a equipe de corrida cross-country com apenas uma atleta. Juntos, eles enfrentam limites físicos e emocionais e descobrem um novo propósito e identidade.'
  },
  {
    id: 2,
    titulo: 'O Céu é de Verdade',
    capa: '',
    corCapa: 'from-sky-700/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado em uma história real, acompanha um menino que passa por uma cirurgia de emergência e compartilha experiências profundas que transformam a fé de sua família e de toda a comunidade.'
  },
  {
    id: 3,
    titulo: 'Deus Não Está Morto',
    capa: '',
    corCapa: 'from-amber-600/80 via-slate-900 to-slate-950',
    sinopse: 'Um estudante universitário tem sua fé desafiada por um professor de filosofia e decide defender suas convicções em uma série de debates diante de toda a turma.'
  },
  {
    id: 4,
    titulo: 'Deus Não Está Morto 2',
    capa: '',
    corCapa: 'from-blue-700/80 via-slate-900 to-slate-950',
    sinopse: 'Uma professora de história enfrenta um processo judicial após responder a uma pergunta de uma aluna sobre Jesus em sala de aula, colocando em pauta coragem e liberdade de crença.'
  },
  {
    id: 5,
    titulo: 'Deus Não Está Morto 3: Luz na Escuridão',
    capa: '',
    corCapa: 'from-orange-700/80 via-slate-900 to-slate-950',
    sinopse: 'Após um incêndio atingir uma igreja dentro de um campus universitário, conflitos e disputas testam o perdão, a unidade e a postura diante das adversidades.'
  },
  {
    id: 6,
    titulo: 'O Peregrino',
    capa: '',
    corCapa: 'from-emerald-700/80 via-slate-900 to-slate-950',
    sinopse: 'Adaptação do clássico de John Bunyan que acompanha a jornada alegórica de Cristão rumo à Cidade Celestial, enfrentando tentações, medos e escolhas decisivas pelo caminho.'
  },
  {
    id: 7,
    titulo: 'Milagres no Paraíso',
    capa: '',
    corCapa: 'from-purple-700/80 via-slate-900 to-slate-950',
    sinopse: 'Inspirado em fatos reais, mostra a luta incansável de uma mãe pela cura da filha com uma doença grave, até que um acontecimento extraordinário muda completamente a história da família.'
  },
  {
    id: 8,
    titulo: 'Você Acredita?',
    capa: '',
    corCapa: 'from-rose-700/80 via-slate-900 to-slate-950',
    sinopse: 'Diferentes pessoas têm suas vidas entrelaçadas em meio a crises, perdas e dilemas, sendo confrontadas a viver na prática aquilo que afirmam crer.'
  },
  {
    id: 9,
    titulo: 'Quarto de Guerra',
    capa: '',
    corCapa: 'from-amber-700/80 via-slate-900 to-slate-950',
    sinopse: 'Com o casamento em crise, uma esposa aprende com uma senhora sábia o poder de transformar o lar e os relacionamentos por meio da oração constante e intencional.'
  },
  {
    id: 10,
    titulo: 'Amor de Redenção',
    capa: '',
    corCapa: 'from-red-800/80 via-slate-900 to-slate-950',
    sinopse: 'Ambientado na época da corrida do ouro na Califórnia, retrata uma história intensa de amor incondicional, cura interior e recomeço para quem carregava profundas feridas do passado.'
  },
  {
    id: 11,
    titulo: 'Entre a Cruz e o Punhal',
    capa: '',
    corCapa: 'from-stone-700/80 via-slate-900 to-slate-950',
    sinopse: 'História real de David Wilkerson, um pastor que deixa sua rotina tranquila para levar esperança e transformação a jovens envolvidos com gangues em Nova York.'
  },
  {
    id: 12,
    titulo: 'O Caso de Cristo',
    capa: '',
    corCapa: 'from-cyan-800/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado na trajetória real do jornalista investigativo Lee Strobel, que decide usar toda sua experiência para tentar refutar a fé cristã e acaba encontrando provas surpreendentes.'
  },
  {
    id: 13,
    titulo: 'Os Melhores Dois Anos',
    capa: '',
    corCapa: 'from-teal-700/80 via-slate-900 to-slate-950',
    sinopse: 'Acompanha jovens em missão longe de casa, vivendo desafios de convivência, superação pessoal e amadurecimento espiritual ao servir ao próximo.'
  },
  {
    id: 14,
    titulo: 'O Movimento de Jesus',
    capa: '',
    corCapa: 'from-yellow-700/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado em fatos reais dos anos 1970, retrata um grande despertar espiritual entre jovens que buscavam sentido verdadeiro, acolhimento e renovação.'
  },
  {
    id: 15,
    titulo: 'O Milagre de Tyson',
    capa: '',
    corCapa: 'from-indigo-700/80 via-slate-900 to-slate-950',
    sinopse: 'A emocionante história de um jovem com autismo que sonha em correr uma maratona e conta com a ajuda de um treinador para superar barreiras e unir sua família.'
  },
  {
    id: 16,
    titulo: '90 Minutos no Paraíso',
    capa: '',
    corCapa: 'from-sky-800/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado em uma história real, narra a recuperação difícil e milagrosa de um homem após um grave acidente de carro e o impacto de sua experiência na vida de todos ao redor.'
  },
  {
    id: 17,
    titulo: 'Desafiando Gigantes',
    capa: '',
    corCapa: 'from-amber-800/80 via-slate-900 to-slate-950',
    sinopse: 'Um treinador de futebol americano enfrenta derrotas seguidas e problemas pessoais até decidir mudar sua visão, inspirando seus jogadores a darem o melhor com fé e coragem.'
  },
  {
    id: 18,
    titulo: 'Marca de Vida',
    capa: '',
    corCapa: 'from-emerald-800/80 via-slate-900 to-slate-950',
    sinopse: 'Ao completar 18 anos, um jovem adotado decide conhecer sua história de origem, embarcando em uma jornada emocionante sobre valor da vida, perdão e gratidão.'
  },
  {
    id: 19,
    titulo: 'A Forja',
    capa: '',
    corCapa: 'from-orange-800/80 via-slate-900 to-slate-950',
    sinopse: 'Um jovem sem rumo após terminar o ensino médio recebe o apoio de um mentor que o desafia a assumir responsabilidades, fortalecer o caráter e descobrir seu propósito.'
  },
  {
    id: 20,
    titulo: 'À Prova de Fogo',
    capa: '',
    corCapa: 'from-red-700/80 via-slate-900 to-slate-950',
    sinopse: 'Um capitão dos bombeiros, heroico no trabalho mas distante em casa, aceita um desafio de 40 dias para tentar resgatar seu casamento antes que seja tarde demais.'
  },
  {
    id: 21,
    titulo: 'Inferno em Chamas',
    capa: '',
    corCapa: 'from-amber-700/80 via-slate-900 to-slate-950',
    sinopse: 'Uma história marcante de coragem, entrega e confiança diante de perigos extremos, mostrando como a fé sustenta o coração nos momentos mais difíceis.'
  },
  {
    id: 22,
    titulo: 'Onde Estiver o Seu Coração',
    capa: '',
    corCapa: 'from-pink-800/80 via-slate-900 to-slate-950',
    sinopse: 'Drama sensível sobre laços familiares, recomeços e a descoberta do que realmente tem valor eterno quando tudo ao redor parece mudar.'
  },
  {
    id: 23,
    titulo: 'Não Temas',
    capa: '',
    corCapa: 'from-blue-800/80 via-slate-900 to-slate-950',
    sinopse: 'Retrata a luta contra o medo e a insegurança, mostrando como a confiança e a esperança ajudam a atravessar tempestades inesperadas.'
  },
  {
    id: 24,
    titulo: 'Renascido',
    capa: '',
    corCapa: 'from-violet-800/80 via-slate-900 to-slate-950',
    sinopse: 'A jornada de transformação interior de alguém que encontra uma nova chance de recomeçar, deixando para trás erros e dores do passado.'
  },
  {
    id: 25,
    titulo: 'Novo Coração',
    capa: '',
    corCapa: 'from-rose-800/80 via-slate-900 to-slate-950',
    sinopse: 'Um drama emocionante sobre reconciliação, empatia e a capacidade de amar novamente mesmo após grandes decepções.'
  },
  {
    id: 26,
    titulo: 'Ponto de Decisão',
    capa: '',
    corCapa: 'from-slate-700 via-slate-900 to-slate-950',
    sinopse: 'Diante de encruzilhadas decisivas, personagens precisam escolher entre o caminho mais fácil e aquilo que realmente honra seus princípios.'
  },
  {
    id: 27,
    titulo: 'Eu Só Posso Imaginar',
    capa: '',
    corCapa: 'from-indigo-800/80 via-slate-900 to-slate-950',
    sinopse: 'Inspirado na história real por trás de uma das canções mais conhecidas do mundo, mostra a difícil relação entre pai e filho e o poder restaurador do perdão.'
  },
  {
    id: 28,
    titulo: 'Milagre Azul',
    capa: '',
    corCapa: 'from-cyan-700/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado em fatos reais, acompanha um grupo de crianças de um orfanato e seu tutor que participam de um torneio de pesca para tentar salvar o lar onde vivem.'
  },
  {
    id: 29,
    titulo: 'A Colheita da Fé',
    capa: '',
    corCapa: 'from-lime-800/80 via-slate-900 to-slate-950',
    sinopse: 'Uma história inspiradora sobre perseverança, trabalho honesto e confiança no tempo certo para colher os frutos daquilo que se planta com amor.'
  },
  {
    id: 30,
    titulo: 'Carta para Deus',
    capa: '',
    corCapa: 'from-sky-700/80 via-slate-900 to-slate-950',
    sinopse: 'Um garoto que enfrenta o câncer escreve cartas sinceras para Deus todos os dias, e suas palavras acabam tocando profundamente um carteiro em crise.'
  },
  {
    id: 31,
    titulo: 'Corajosos',
    capa: '',
    corCapa: 'from-blue-900/80 via-slate-900 to-slate-950',
    sinopse: 'Quatro policiais enfrentam os perigos das ruas todos os dias, mas após uma tragédia percebem que seu maior desafio é serem pais presentes e íntegros dentro de casa.'
  },
  {
    id: 32,
    titulo: 'O Refúgio',
    capa: '',
    corCapa: 'from-teal-800/80 via-slate-900 to-slate-950',
    sinopse: 'Uma narrativa acolhedora sobre encontrar abrigo, paz e direção nos momentos em que o mundo parece agitado demais.'
  },
  {
    id: 33,
    titulo: 'Fé para o Impossível',
    capa: '',
    corCapa: 'from-amber-700/80 via-slate-900 to-slate-950',
    sinopse: 'Inspirado em acontecimentos reais, retrata a união de uma família e de amigos em oração diante de uma situação médica gravíssima.'
  },
  {
    id: 34,
    titulo: 'A Retenção',
    capa: '',
    corCapa: 'from-zinc-700/80 via-slate-900 to-slate-950',
    sinopse: 'Um drama envolvente sobre escolhas morais, pressão e a busca por justiça e verdade em meio a circunstâncias difíceis.'
  },
  {
    id: 35,
    titulo: 'A História Real de Bonhoeffer',
    capa: '',
    corCapa: 'from-stone-800/80 via-slate-900 to-slate-950',
    sinopse: 'Cinebiografia baseada na vida de Dietrich Bonhoeffer, pastor e teólogo alemão que teve a coragem de resistir ao regime nazista em defesa da verdade e do próximo.'
  },
  {
    id: 36,
    titulo: 'Cabrini',
    capa: '',
    corCapa: 'from-purple-800/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado na vida de Francesca Cabrini, missionária que enfrenta preconceito e barreiras sociais em Nova York para garantir moradia, saúde e dignidade a crianças órfãs e imigrantes.'
  },
  {
    id: 37,
    titulo: 'Uma Vida de Esperança',
    capa: '',
    corCapa: 'from-emerald-700/80 via-slate-900 to-slate-950',
    sinopse: 'Uma história tocante que lembra como gestos simples de solidariedade e fé podem reacender a esperança em meio às provas da vida.'
  },
  {
    id: 38,
    titulo: 'A Visão',
    capa: '',
    corCapa: 'from-indigo-700/80 via-slate-900 to-slate-950',
    sinopse: 'Aborda a importância de enxergar além das circunstâncias imediatas, mantendo o foco no propósito e nos valores que realmente edificam.'
  },
  {
    id: 39,
    titulo: 'Som da Esperança',
    capa: '',
    corCapa: 'from-amber-600/80 via-slate-900 to-slate-950',
    sinopse: 'Inspirado em fatos reais, mostra como uma comunidade inteira se mobiliza com amor e coragem para acolher crianças que precisavam de um lar.'
  },
  {
    id: 40,
    titulo: 'Som da Liberdade',
    capa: '',
    corCapa: 'from-yellow-800/80 via-slate-900 to-slate-950',
    sinopse: 'Baseado em uma história real, acompanha um ex-agente federal que arrisca a própria vida em uma missão para resgatar crianças vítimas de tráfico humano.'
  },
  {
    id: 41,
    titulo: 'Se Eu Fosse Você',
    capa: '',
    corCapa: 'from-amber-700/80 via-slate-900 to-slate-950',
    sinopse: 'Uma história envolvente sobre empatia, convivência e a chance de enxergar a vida e os sentimentos do outro a partir de um novo ponto de vista.'
  }
];

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  let linkLimpo = url.replace('ww.youtube.com', 'www.youtube.com');
  let videoId = '';
  if (linkLimpo.includes('watch?v=')) {
    videoId = linkLimpo.split('watch?v=')[1]?.split('&')[0];
  } else if (linkLimpo.includes('youtu.be/')) {
    videoId = linkLimpo.split('youtu.be/')[1]?.split('?')[0];
  } else if (linkLimpo.includes('/embed/')) {
    videoId = linkLimpo.split('/embed/')[1]?.split('?')[0];
  } else if (linkLimpo.includes('/shorts/')) {
    videoId = linkLimpo.split('/shorts/')[1]?.split('?')[0];
  }
  // Parâmetros blindados contra legendas automáticas: cc_load_policy=0 e iv_load_policy=3
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&cc_load_policy=0&iv_load_policy=3&hl=pt` : '';
}

function CapaFilme({ filme, grande = false }) {
  const [erroImagem, setErroImagem] = useState(false);

  if (filme.capa && !erroImagem) {
    return (
      <img
        src={filme.capa}
        alt={filme.titulo}
        onError={() => setErroImagem(true)}
        className={grande
          ? 'w-36 h-52 object-cover rounded-2xl border border-amber-500/40 shadow-xl mx-auto'
          : 'w-16 h-24 object-cover rounded-xl border border-slate-700 shrink-0 shadow-md'
        }
      />
    );
  }

  return (
    <div
      className={grande
        ? `w-36 h-52 rounded-2xl border border-amber-500/40 bg-gradient-to-b ${filme.corCapa || 'from-amber-700/80 via-slate-900 to-slate-950'} p-3 flex flex-col justify-between items-center text-center shadow-xl mx-auto`
        : `w-16 h-24 rounded-xl border border-slate-700 bg-gradient-to-b ${filme.corCapa || 'from-amber-700/80 via-slate-900 to-slate-950'} p-1.5 flex flex-col justify-between items-center text-center shrink-0 shadow-md`
      }
    >
      <span className={grande ? 'text-xs text-amber-300/90 font-semibold tracking-widest uppercase' : 'text-[8px] text-amber-300/90 font-bold uppercase tracking-wider'}>
        🎬 Filme
      </span>
      <span className={grande ? 'text-xs font-bold text-white leading-snug line-clamp-4' : 'text-[9px] font-bold text-white leading-tight line-clamp-3'}>
        {filme.titulo}
      </span>
      <span className={grande ? 'text-[10px] text-amber-400/80' : 'text-[8px] text-amber-400/80'}>
        ★★★
      </span>
    </div>
  );
}

export default function Explorar({ onNavigate, userName }) {
  const [modalAtivo, setModalAtivo] = useState(null);
  const [tipoVisualizacao, setTipoVisualizacao] = useState(null);

  const [listaFabulas, setListaFabulas] = useState([]);
  const [listaMusicas, setListaMusicas] = useState([]);
  const [listaReflexoes, setListaReflexoes] = useState([]);
  const [listaMensagens, setListaMensagens] = useState([]);
  const [listaLouvores, setListaLouvores] = useState([]);

  const [listaPedidosOração, setListaPedidosOração] = useState([]);
  const [novoPedidoTexto, setNovoPedidoTexto] = useState('');
  const [feedbackTexto, setFeedbackTexto] = useState('');

  const [carregandoDados, setCarregandoDados] = useState(false);
  const [fabulaSelecionada, setFabulaSelecionada] = useState(null);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [buscaFilme, setBuscaFilme] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const getIniciais = (nome) => {
    if (!nome) return 'RF';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const iniciaisUsuario = getIniciais(userName || 'Visitante');

  useEffect(() => {
    async function carregarConteudosEVerificarAdmin() {
      setCarregandoDados(true);

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
      } catch (err) {
        console.error('Erro ao verificar admin ou perfil:', err);
      }

      const { data: fabulasData } = await supabase.from('fabulas').select('*').order('id', { ascending: false });
      if (fabulasData) setListaFabulas(fabulasData);

      const { data: musicasData } = await supabase.from('playlists_musicas').select('*').order('id', { ascending: false });
      if (musicasData) setListaMusicas(musicasData);

      const { data: refData } = await supabase.from('reflexao_dia').select('*').order('created_at', { ascending: false });
      if (refData) setListaReflexoes(refData);

      const { data: msgData } = await supabase.from('mensagem_dia').select('*').order('created_at', { ascending: false });
      if (msgData) setListaMensagens(msgData);

      const { data: louvorData } = await supabase.from('louvor_dia').select('*').order('created_at', { ascending: false });
      if (louvorData) setListaLouvores(louvorData);

      const { data: oracaoData } = await supabase.from('pedidos_oracao').select('*').order('created_at', { ascending: false });
      if (oracaoData && oracaoData.length > 0) {
        setListaPedidosOração(oracaoData);
      } else {
        setListaPedidosOração([]);
      }

      setCarregandoDados(false);
    }

    carregarConteudosEVerificarAdmin();
  }, []);

  const handleEnviarPedidoOracao = async () => {
    if (!novoPedidoTexto.trim()) {
      alert('Por favor, escreva o seu pedido de oração.');
      return;
    }

    const novoItem = {
      nome_usuario: userName || 'Membro Conexão Viva',
      iniciais: iniciaisUsuario,
      conteudo: novoPedidoTexto.trim(),
      oracoes_count: 0,
      created_at: new Date().toISOString()
    };

    try {
      const { data, error } = await supabase.from('pedidos_oracao').insert([novoItem]).select();
      if (!error && data) {
        setListaPedidosOração([data[0], ...listaPedidosOração]);
      } else {
        setListaPedidosOração([novoItem, ...listaPedidosOração]);
      }
    } catch (err) {
      setListaPedidosOração([novoItem, ...listaPedidosOração]);
    }

    setNovoPedidoTexto('');
    setModalAtivo(null);
    alert('🙏 Pedido de oração enviado com sucesso para o mural!');
  };

  const handleEnviarFeedback = async () => {
    if (!feedbackTexto.trim()) {
      alert('Por favor, escreva sua sugestão ou feedback.');
      return;
    }

    try {
      await supabase.from('feedbacks').insert([{
        usuario: userName || 'Anônimo',
        mensagem: feedbackTexto.trim(),
        created_at: new Date().toISOString()
      }]);
    } catch (e) {}

    setFeedbackTexto('');
    setModalAtivo(null);
    alert('✨ Muito obrigado! Sua sugestão foi enviada com sucesso.');
  };

  const handleCompartilharApp = () => {
    const texto = `🌟 Olá! Conheça o *Conexão Viva - Viver com Propósito*, um aplicativo incrível para fortalecer sua fé, ler a Palavra, acompanhar planos bíblicos, hinos e muito mais! 📖✨\n\nBaixe agora e venha caminhar conosco: ${APK_DOWNLOAD_URL}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(urlWhatsApp, '_blank');
  };

  const isHorizontalVideo = tipoVisualizacao === 'videos_mensagem' || tipoVisualizacao === 'videos_louvor';

  const filmesFiltrados = LISTA_FILMES_RECOMENDADOS.filter((filme) =>
    filme.titulo.toLowerCase().includes(buscaFilme.toLowerCase()) ||
    filme.sinopse.toLowerCase().includes(buscaFilme.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white p-3 sm:p-4 py-6 flex flex-col items-center relative">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-4 sm:p-5 rounded-3xl shadow-2xl space-y-5 overflow-hidden">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner">
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
              <span>Conexão Viva</span>
              <span className="text-amber-400 text-xs font-normal">• Viver com Propósito</span>
            </h1>
            <p className="text-base font-bold text-amber-400 mt-0.5">Explorar</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm shadow shrink-0">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              iniciaisUsuario
            )}
          </div>
        </div>

        {/* FILMES RECOMENDADOS */}
        {tipoVisualizacao === 'filmes' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">🎬 Filmes Recomendados</h2>
              <button
                type="button"
                onClick={() => { setTipoVisualizacao(null); setFilmeSelecionado(null); setBuscaFilme(''); }}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl cursor-pointer transition shrink-0"
              >
                ← Voltar
              </button>
            </div>

            {filmeSelecionado ? (
              <div className="bg-slate-950/80 border border-slate-700 p-5 rounded-2xl space-y-4 shadow-lg text-center">
                <CapaFilme filme={filmeSelecionado} grande />
                <h3 className="text-lg font-bold text-white leading-tight break-words">{filmeSelecionado.titulo}</h3>
                <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl text-left">
                  <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1.5">Sinopse</p>
                  <p className="text-sm text-slate-200 leading-relaxed break-words">
                    {filmeSelecionado.sinopse}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFilmeSelecionado(null)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl cursor-pointer transition border border-slate-700"
                >
                  Ver Outros Filmes
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={buscaFilme}
                  onChange={(e) => setBuscaFilme(e.target.value)}
                  placeholder="Buscar filme pelo nome ou tema..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                <div className="space-y-3 max-h-[65vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-0.5">
                  {filmesFiltrados.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">Nenhum filme encontrado para essa busca.</p>
                  ) : (
                    filmesFiltrados.map((filme) => (
                      <div
                        key={filme.id}
                        onClick={() => setFilmeSelecionado(filme)}
                        className="group bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl hover:border-amber-500/50 hover:bg-slate-900 transition cursor-pointer shadow-sm flex items-start gap-3.5 min-w-0"
                      >
                        <CapaFilme filme={filme} />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition break-words leading-snug">
                              {filme.titulo}
                            </h3>
                            <span className="text-amber-500/40 group-hover:text-amber-500 transition shrink-0">›</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 break-words">
                            {filme.sinopse}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        ) : tipoVisualizacao === 'fabulas' ? (
          /* FÁBULAS */
          <div className="space-y-3 min-w-0">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2 shrink-0">📖 Histórias</h2>
              <button
                type="button"
                onClick={() => { setTipoVisualizacao(null); setFabulaSelecionada(null); }}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-2 rounded-xl cursor-pointer transition shrink-0"
              >
                ← Voltar à Lista
              </button>
            </div>

            {fabulaSelecionada ? (
              <div className="bg-slate-950/80 border border-slate-700 p-4 sm:p-5 rounded-2xl space-y-4 shadow-lg min-w-0">
                <h3 className="text-lg font-bold text-white leading-snug break-words">{fabulaSelecionada.titulo}</h3>
                <div className="max-h-[60vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-0.5">
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line font-serif italic opacity-90 break-words">
                    {fabulaSelecionada.conteudo}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFabulaSelecionada(null)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-sm font-bold rounded-xl cursor-pointer transition border border-slate-700"
                >
                  Ler Outra História
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-0.5">
                {listaFabulas.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">Nenhuma fábula encontrada.</p>
                ) : (
                  listaFabulas.map((fabula) => (
                    <div
                      key={fabula.id}
                      onClick={() => setFabulaSelecionada(fabula)}
                      className="group bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl hover:border-amber-500/50 hover:bg-slate-900 transition cursor-pointer shadow-sm min-w-0"
                    >
                      <div className="flex items-start justify-between gap-2 min-w-0">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition break-words leading-snug flex-1 min-w-0">
                          {fabula.titulo}
                        </h3>
                        <span className="text-amber-500/30 group-hover:text-amber-500 transition shrink-0 pt-0.5">›</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-1 min-w-0">{fabula.conteudo}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : tipoVisualizacao === 'musicas' ? (
          /* MÚSICAS */
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">🎧 Playlists</h2>
              <button
                type="button"
                onClick={() => setTipoVisualizacao(null)}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl cursor-pointer transition shrink-0"
              >
                ← Voltar à Lista
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-0.5">
              {listaMusicas.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">Nenhuma música encontrada.</p>
              ) : (
                listaMusicas.map((musica) => (
                  <div
                    key={musica.id}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-lg min-w-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 shrink-0">♪</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white break-words leading-snug">{musica.nome_playlist}</h3>
                        {musica.descricao && <p className="text-[10px] text-slate-400 break-words">{musica.descricao}</p>}
                      </div>
                    </div>
                    {musica.audio_url && (
                      <div className="pt-1">
                        <audio controls className="w-full h-10 rounded-lg opacity-90">
                          <source src={musica.audio_url} type="audio/mp3" />
                        </audio>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : tipoVisualizacao === 'videos_reflexao' || tipoVisualizacao === 'videos_mensagem' || tipoVisualizacao === 'videos_louvor' ? (
          /* VÍDEOS (MENSAGENS / REFLEXÕES / LOUVORES) */
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
                {tipoVisualizacao === 'videos_reflexao' && '📖 Reflexões'}
                {tipoVisualizacao === 'videos_mensagem' && '🕊️ Mensagens'}
                {tipoVisualizacao === 'videos_louvor' && '🎶 Louvores'}
              </h2>
              <button
                type="button"
                onClick={() => setTipoVisualizacao(null)}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl cursor-pointer transition shrink-0"
              >
                ← Voltar
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-0.5">
              {(tipoVisualizacao === 'videos_reflexao' ? listaReflexoes :
                tipoVisualizacao === 'videos_mensagem' ? listaMensagens : listaLouvores).length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">Nenhum vídeo encontrado.</p>
              ) : (
                (tipoVisualizacao === 'videos_reflexao' ? listaReflexoes :
                  tipoVisualizacao === 'videos_mensagem' ? listaMensagens : listaLouvores).map((item) => (
                  <div key={item.id} className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-inner min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-bold text-white break-words">{item.titulo || (tipoVisualizacao === 'videos_reflexao' ? 'Reflexão' : tipoVisualizacao === 'videos_mensagem' ? 'Mensagem' : 'Louvor')}</h3>
                      <span className="text-[10px] text-slate-400 shrink-0">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    {item.link && (
                      <div className="flex justify-center w-full">
                        <div
                          style={isHorizontalVideo
                            ? { width: '100%', aspectRatio: '16 / 9' }
                            : { width: '14rem', height: '24rem' }
                          }
                          className="rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-lg max-w-full"
                        >
                          <iframe
                            style={{ width: '100%', height: '100%' }}
                            className="border-0 block"
                            src={getYouTubeEmbedUrl(item.link)}
                            title="Vídeo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* TELA EXPLORAR PRINCIPAL */
          <>
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Jornadas Espirituais</h2>
              <div className="grid grid-cols-2 gap-2">
                <div onClick={() => onNavigate && onNavigate('jejum')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-base">🌾</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Desintoxicação</p>
                  <h3 className="text-xs font-bold text-white">Jejum de Daniel</h3>
                  <p className="text-[10px] text-slate-400 leading-tight">Guia espiritual e cronograma de 21 dias.</p>
                </div>
                <div onClick={() => onNavigate && onNavigate('rotina')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1.5 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-base">☀️</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Devoção</p>
                  <h3 className="text-xs font-bold text-white">Rotina Primeiro Amor</h3>
                  <p className="text-[10px] text-slate-400 leading-tight">Restaure sua intimidade matinal.</p>
                </div>
              </div>
            </div>

            <div onClick={() => onNavigate && onNavigate('desafioceleste')} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-amber-400 text-lg p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0">🎯</span>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Meta Semanal</p>
                  <h3 className="text-xs font-bold text-white">Desafio Celeste</h3>
                  <p className="text-[10px] text-slate-400">Oração constante e atos de bondade.</p>
                </div>
              </div>
              <span className="text-slate-500 shrink-0">›</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Vídeos & Mensagens</h2>
              <div className="grid grid-cols-1 gap-2">
                <div onClick={() => setTipoVisualizacao('videos_reflexao')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-base">📖</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Reflexões</h3>
                      <p className="text-[10px] text-slate-400">{listaReflexoes.length} vídeos salvos</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('videos_mensagem')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-base">🕊️</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Mensagens</h3>
                      <p className="text-[10px] text-slate-400">{listaMensagens.length} vídeos salvos</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('videos_louvor')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-base">🎶</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Louvores</h3>
                      <p className="text-[10px] text-slate-400">{listaLouvores.length} vídeos salvos</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Estudo & Leitura</h2>
              <div className="space-y-2">
                <div onClick={() => setTipoVisualizacao('fabulas')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">📜</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Fábulas & Ensinamentos</h3>
                      <p className="text-[10px] text-slate-400">{listaFabulas.length} histórias prontas</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('musicas')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">🎧</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Playlists de Músicas (Áudio)</h3>
                      <p className="text-[10px] text-slate-400">{listaMusicas.length} faixas carregadas</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>

                <div onClick={() => setTipoVisualizacao('filmes')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner flex items-center justify-between hover:border-amber-500/40 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">🎬</span>
                    <div>
                      <h3 className="text-xs font-bold text-white">Filmes Recomendados</h3>
                      <p className="text-[10px] text-slate-400">{LISTA_FILMES_RECOMENDADOS.length} filmes selecionados</p>
                    </div>
                  </div>
                  <span className="text-slate-500">›</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acervo Hinoário</h2>
                <span className="text-[10px] text-amber-400 font-semibold">Completo</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div onClick={() => onNavigate && onNavigate('HarpaCrista')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-sm">🎶</span>
                  <h3 className="text-xs font-bold text-white">Harpa Cristã</h3>
                  <p className="text-[10px] text-slate-400">640 Hinos Clássicos</p>
                </div>
                <div onClick={() => onNavigate && onNavigate('cantor-cristao')} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl shadow-inner space-y-1 hover:border-amber-500/40 transition cursor-pointer">
                  <span className="text-amber-400 text-sm">🎵</span>
                  <h3 className="text-xs font-bold text-white">Cantor Cristão</h3>
                  <p className="text-[10px] text-slate-400">577 Canções Preciosas</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCompartilharApp}
                className="bg-emerald-600/25 border border-emerald-500/40 hover:bg-emerald-600/35 p-3 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 shadow-inner"
              >
                <span className="text-lg">📱</span>
                <span className="text-xs font-bold text-emerald-300">Compartilhar App</span>
                <span className="text-[9px] text-emerald-400/80">Convide amigos via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setModalAtivo('feedback')}
                className="bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 p-3 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 shadow-inner"
              >
                <span className="text-lg">💬</span>
                <span className="text-xs font-bold text-amber-400">Feedback & Sugestões</span>
                <span className="text-[9px] text-slate-400">Ajude-nos a melhorar</span>
              </button>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">Mural de Oração</h2>
                <button
                  type="button"
                  onClick={() => setModalAtivo('pedido')}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-[10px] transition cursor-pointer"
                >
                  + Pedir Oração
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-0.5">
                {listaPedidosOração.length === 0 ? (
                  <p className="text-[11px] text-slate-400 text-center py-4">Nenhum pedido no mural ainda. Seja o primeiro a pedir oração!</p>
                ) : (
                  listaPedidosOração.map((item, index) => (
                    <div key={item.id || index} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 min-w-0">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 gap-2">
                        <span className="font-semibold text-slate-300 truncate">{item.iniciais || 'MC'} • {item.nome_usuario || 'Membro'}</span>
                        <span className="shrink-0">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Hoje'}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic break-words">"{item.conteudo}"</p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                        <span className="font-semibold text-amber-400 cursor-pointer hover:underline">🤍 Quero Orar ({item.oracoes_count || 0})</span>
                        <span className="text-slate-500">Ativo</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        <div className="pt-3 border-t border-slate-800">
          <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} gap-1 text-center`}>
            <button type="button" onClick={() => onNavigate && onNavigate('home')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Home</button>
            <button type="button" onClick={() => onNavigate && onNavigate('biblia')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Bíblia</button>
            <button type="button" onClick={() => onNavigate && onNavigate('planos')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Planos</button>
            <button type="button" onClick={() => onNavigate && onNavigate('explorar')} className="p-2 bg-amber-500 text-slate-950 rounded-xl text-[9px] font-bold shadow-lg cursor-pointer">Explorar</button>
            <button type="button" onClick={() => onNavigate && onNavigate('config')} className="p-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-[9px] cursor-pointer hover:text-white transition">Config</button>

            {isAdmin && (
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('admin')}
                className="p-2 bg-slate-950/60 border border-amber-500/30 rounded-xl text-amber-400 text-[9px] font-bold cursor-pointer hover:bg-amber-500 hover:text-slate-950 transition shadow-inner"
              >
                Admin
              </button>
            )}
          </div>
        </div>

      </div>

      {modalAtivo === 'pedido' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <span className="text-3xl">🙏</span>
            <h3 className="text-base font-bold text-amber-400">Compartilhe seu Pedido</h3>
            <textarea
              value={novoPedidoTexto}
              onChange={(e) => setNovoPedidoTexto(e.target.value)}
              placeholder="Escreva aqui o motivo da sua oração..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 h-24 resize-none"
            ></textarea>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEnviarPedidoOracao}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={() => setModalAtivo(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalAtivo === 'feedback' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <span className="text-3xl">💬</span>
            <h3 className="text-base font-bold text-amber-400">Feedback & Sugestões</h3>
            <p className="text-[11px] text-slate-400">Sua opinião é fundamental para melhorarmos o Conexão Viva!</p>
            <textarea
              value={feedbackTexto}
              onChange={(e) => setFeedbackTexto(e.target.value)}
              placeholder="Digite sua sugestão, elogio ou relato de erro..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 h-24 resize-none"
            ></textarea>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEnviarFeedback}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Enviar Sugestão
              </button>
              <button
                type="button"
                onClick={() => setModalAtivo(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}