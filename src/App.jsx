import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase';
import Login from './login';
import Welcome from './Welcome';
import Home from './Home';
import Explorar from './Explorar';
import Biblia from './Biblia';
import Configuracao from './Configuracao';
import PlanoDeLeitura from './PlanoDeLeitura';
import PainelAdministrativo from './PainelAdministrativo';
import JejumDaniel from './JejumDaniel';
import RotinaPrimeiroAmor from './RotinaPrimeiroAmor';
import DesafioCeleste from './DesafioCeleste';
import CantorCristao from './CantorCristao';
import HarpaCrista from './HarpaCrista';

// ⬇️ NOVOS IMPORTS ADICIONADOS PARA AS TELAS DE FÁBULAS E MÚSICA
import Fabulas from './Fabulas';
import PlaylistsMusica from './PlaylistsMusica';

export default function App() {
  const [etapaAuth, setEtapaAuth] = useState('carregando');
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const definirProximaEtapaComSession = (session, nomeDefinido) => {
    if (!session?.user) {
      setUserEmail('');
      setUserName('');
      setEtapaAuth('login');
      return;
    }

    const emailUsuario = session.user.email || '';
    setUserEmail(emailUsuario);
    if (nomeDefinido) setUserName(nomeDefinido);

    if (localStorage.getItem('mostrar_welcome_novo_cadastro') === 'true') {
      setEtapaAuth('welcome');
    } else {
      setEtapaAuth('app');
    }
  };

  const carregarDadosUsuario = async (session) => {
    if (!session?.user) {
      definirProximaEtapaComSession(null, '');
      return;
    }

    let nomeUsuario =
      session.user.user_metadata?.nome ||
      session.user.user_metadata?.full_name ||
      session.user.user_metadata?.name ||
      '';

    // Define um limite de 4 segundos para não travar em "Carregando..."
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 4000));

    try {
      const perfilPromise = supabase
        .from('perfis_usuario')
        .select('nome')
        .eq('id', session.user.id)
        .maybeSingle();

      const resultado = await Promise.race([perfilPromise, timeoutPromise]);
      if (resultado && resultado.data?.nome) {
        nomeUsuario = resultado.data.nome;
      }
    } catch (e) {
      // Segue normalmente mesmo se falhar a busca do perfil
    }

    definirProximaEtapaComSession(session, nomeUsuario);
  };

  useEffect(() => {
    let ativo = true;

    // Trava de segurança geral: em até 5 segundos nunca fica preso em "carregando"
    const travaSeguranca = setTimeout(() => {
      if (!ativo) return;
      setEtapaAuth((atual) => (atual === 'carregando' ? 'login' : atual));
    }, 5000);

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!ativo) return;
        carregarDadosUsuario(session);
      })
      .catch(() => {
        if (!ativo) return;
        setEtapaAuth('login');
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return;
      if (session) {
        carregarDadosUsuario(session);
      } else {
        setUserEmail('');
        setUserName('');
        setEtapaAuth('login');
      }
    });

    return () => {
      ativo = false;
      clearTimeout(travaSeguranca);
      subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = (emailDigitado, nomeDigitado, isCadastro) => {
    if (emailDigitado) setUserEmail(emailDigitado);
    if (nomeDigitado) setUserName(nomeDigitado);

    if (isCadastro || localStorage.getItem('mostrar_welcome_novo_cadastro') === 'true') {
      localStorage.setItem('mostrar_welcome_novo_cadastro', 'true');
      setEtapaAuth('welcome');
    } else {
      setEtapaAuth('app');
      setPaginaAtual('home');
    }
  };

  const handleWelcomeContinue = () => {
    localStorage.removeItem('mostrar_welcome_novo_cadastro');
    setEtapaAuth('app');
    setPaginaAtual('home');
  };

  const handleLogout = async () => {
    localStorage.removeItem('mostrar_welcome_novo_cadastro');
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUserEmail('');
    setUserName('');
    setPaginaAtual('home');
    setEtapaAuth('login');
  };

  console.log("Etapa Auth:", etapaAuth, "| Página Atual:", paginaAtual, "| Usuário:", userName);

  if (etapaAuth === 'carregando') {
    return (
      <div className="w-full min-h-screen bg-slate-950 text-amber-400 font-sans flex justify-center items-center text-sm">
        Carregando...
      </div>
    );
  }

  if (etapaAuth === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (etapaAuth === 'welcome') {
    return <Welcome onContinue={handleWelcomeContinue} />;
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 font-sans flex flex-col justify-center items-center">
      <div className="w-full flex-1 flex justify-center items-center">
        {paginaAtual === 'home' && <Home onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}

        {/* Repassando o userEmail e userName para o Explorar */}
        {paginaAtual === 'explorar' && <Explorar onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}

        {/* Repassando o userEmail e userName para a Bíblia */}
        {paginaAtual === 'biblia' && <Biblia onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}

        {/* Repassando o userEmail e userName para os Planos de Leitura */}
        {paginaAtual === 'planos' && <PlanoDeLeitura onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}

        {(paginaAtual === 'config' || paginaAtual === 'configuracao') && (
          <Configuracao
            onNavigate={setPaginaAtual}
            userEmail={userEmail}
            userName={userName}
            onLogout={handleLogout}
          />
        )}

        {paginaAtual === 'admin' && <PainelAdministrativo onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
        {paginaAtual === 'jejum' && <JejumDaniel onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
        {paginaAtual === 'rotina' && <RotinaPrimeiroAmor onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
        {paginaAtual === 'desafioceleste' && <DesafioCeleste onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
        {paginaAtual === 'cantor-cristao' && <CantorCristao onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}

        {/* ⬇️ ROTAS DA HARPA CRISTÃ (Mantive como estava antes) */}
        {(paginaAtual === 'HarpaCrista' || paginaAtual === 'harpa') && (
          <HarpaCrista onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />
        )}

        {/* ⬇️ NOVAS ROTAS ADICIONADAS AQUI */}
        {/* Rota para Fábulas */}
        {paginaAtual === 'fabulas' && (
          <Fabulas onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />
        )}

        {/* Rota para Playlists de Música */}
        {paginaAtual === 'player-musica' && (
          <PlaylistsMusica onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />
        )}

        {/* Lista de todas as páginas válidas para evitar fallback para Home se estiver em uma delas */}
        {![
          'home', 'explorar', 'biblia', 'planos', 'config', 'configuracao',
          'admin', 'jejum', 'rotina', 'desafioceleste', 'cantor-cristao',
          'HarpaCrista', 'harpa',
          'fabulas',       // <-- Adicionado aqui
          'player-musica'  // <-- Adicionado aqui
        ].includes(paginaAtual) && <Home onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
      </div>
    </div>
  );
}