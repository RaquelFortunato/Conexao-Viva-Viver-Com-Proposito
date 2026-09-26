import React, { useState } from 'react';
import Home from './Home';
import Explorar from './Explorar';
import Biblia from './Biblia';
import Configuracao from './Configuracao';
import JejumDaniel from './JejumDaniel';
import RotinaPrimeiroAmor from './RotinaPrimeiroAmor';
import DesafioCeleste from './DesafioCeleste';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  const renderizarTela = () => {
    switch (paginaAtual) {
      case 'home':
        return <Home onNavigate={setPaginaAtual} />;
      case 'explorar':
        return <Explorar onNavigate={setPaginaAtual} />;
      case 'biblia':
        return <Biblia onNavigate={setPaginaAtual} />;
      case 'configuracao':
        return <Configuracao onNavigate={setPaginaAtual} />;
      case 'jejum':
        return <JejumDaniel onNavigate={setPaginaAtual} />;
      case 'rotina':
        return <RotinaPrimeiroAmor onNavigate={setPaginaAtual} />;
      case 'desafioceleste':
        return <DesafioCeleste onNavigate={setPaginaAtual} />;
      default:
        return <Home onNavigate={setPaginaAtual} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 font-sans">
      {renderizarTela()}
    </div>
  );
}