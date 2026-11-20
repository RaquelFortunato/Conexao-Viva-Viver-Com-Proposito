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
  // Começa direto em 'login' para nunca travar na tela "Carregando..."
  const [etapaAuth, setEtapaAuth] = useState('login');
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const buscarNomeEmSegundoPlano = async (session) => {
    if (!session?.user) return;
    try {
      const { data: perfil } = await supabase
        .from('perfis_usuario')
        .select('nome')
        .eq('id', session.user.id)
        .maybeSingle();

      if (perfil?.nome) {
        setUserName(perfil.nome);
      }
    } catch (e) {}
  };

  const aplicarSessaoImediata = (session) => {
    if (!session?.user) {
      setUserEmail('');
      setUserName('');
      setEtapaAuth('login');
      return;
    }

    const emailUsuario = session.user.email || '';
    const nomeInicial =
      session.user.user_metadata?.nome ||
      session.user.user_metadata?.full_name ||
      session.user.user_metadata?.name ||
      '';

    setUserEmail(emailUsuario);
    if (nomeInicial) setUserName(nomeInicial);

    if (localStorage.getItem('mostrar_welcome_novo_cadastro') === 'true') {
      setEtapaAuth('welcome');
    } else {
      setEtapaAuth('app');
    }

    buscarNomeEmSegundoPlano(session);
  };

  useEffect(() => {
    let ativo = true;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!ativo) return;
        if (session) {
          aplicarSessaoImediata(session);
        }
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
        aplicarSessaoImediata(session);
      } else {
        setUserEmail('');
        setUserName('');
        setEtapaAuth('login');
      }
    });

    return () => {
      ativo = false;
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
        {paginaAtual === 'explorar' && <Explorar onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
        {paginaAtual === 'biblia' && <Biblia onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
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
        {(paginaAtual === 'HarpaCrista' || paginaAtual === 'harpa') && (
          <HarpaCrista onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />
        )}
        {paginaAtual === 'fabulas' && (
          <Fabulas onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />
        )}
        {paginaAtual === 'player-musica' && (
          <PlaylistsMusica onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />
        )}
        {![
          'home', 'explorar', 'biblia', 'planos', 'config', 'configuracao',
          'admin', 'jejum', 'rotina', 'desafioceleste', 'cantor-cristao',
          'HarpaCrista', 'harpa',
          'fabulas',
          'player-musica'
        ].includes(paginaAtual) && <Home onNavigate={setPaginaAtual} userEmail={userEmail} userName={userName} />}
      </div>
    </div>
  );
}