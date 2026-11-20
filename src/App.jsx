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

  // Verifica se o usuário já está logado ao abrir o aplicativo
  useEffect(() => {
    let montado = true;

    async function verificarSessaoSalva() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user && montado) {
          const emailSalvo = session.user.email || localStorage.getItem('cv_user_email') || '';
          const nomeSalvo =
            session.user.user_metadata?.nome ||
            session.user.user_metadata?.name ||
            session.user.user_metadata?.full_name ||
            localStorage.getItem('cv_user_name') ||
            '';

          setUserEmail(emailSalvo);
          setUserName(nomeSalvo);
          setEtapaAuth('app');
          return;
        }

        // Fallback caso a sessão esteja salva localmente
        const emailLocal = localStorage.getItem('cv_user_email');
        if (emailLocal && montado) {
          setUserEmail(emailLocal);
          setUserName(localStorage.getItem('cv_user_name') || '');
          setEtapaAuth('app');
          return;
        }

        if (montado) {
          setEtapaAuth('login');
        }
      } catch (err) {
        console.error('Erro ao verificar sessão salva:', err);
        if (montado) {
          setEtapaAuth('login');
        }
      }
    }

    verificarSessaoSalva();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && montado) {
        localStorage.removeItem('cv_user_email');
        localStorage.removeItem('cv_user_name');
        setUserEmail('');
        setUserName('');
        setEtapaAuth('login');
      } else if (session?.user && montado) {
        const email = session.user.email || '';
        const nome =
          session.user.user_metadata?.nome ||
          session.user.user_metadata?.name ||
          session.user.user_metadata?.full_name ||
          localStorage.getItem('cv_user_name') ||
          '';
        if (email) {
          setUserEmail(email);
          localStorage.setItem('cv_user_email', email);
        }
        if (nome) {
          setUserName(nome);
          localStorage.setItem('cv_user_name', nome);
        }
      }
    });

    return () => {
      montado = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = (emailDigitado, nomeDigitado, isCadastro) => {
    if (emailDigitado) {
      setUserEmail(emailDigitado);
      localStorage.setItem('cv_user_email', emailDigitado);
    }
    if (nomeDigitado) {
      setUserName(nomeDigitado);
      localStorage.setItem('cv_user_name', nomeDigitado);
    }

    if (isCadastro) {
      setEtapaAuth('welcome');
    } else {
      setEtapaAuth('app');
      setPaginaAtual('home');
    }
  };

  const handleWelcomeContinue = () => {
    setEtapaAuth('app');
    setPaginaAtual('home');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Erro ao sair:', e);
    }
    localStorage.removeItem('cv_user_email');
    localStorage.removeItem('cv_user_name');
    setUserEmail('');
    setUserName('');
    setPaginaAtual('home');
    setEtapaAuth('login');
  };

  console.log("Etapa Auth:", etapaAuth, "| Página Atual:", paginaAtual, "| Usuário:", userName);

  if (etapaAuth === 'carregando') {
    return (
      <div className="w-full min-h-screen bg-slate-950 font-sans flex flex-col justify-center items-center text-amber-400 text-xs font-bold">
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