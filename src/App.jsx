import React, { useState } from 'react';
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
      case 'planos':
        return <PlanoDeLeitura onNavigate={setPaginaAtual} />;
      case 'configuracao':
        return <Configuracao onNavigate={setPaginaAtual} />;
      case 'admin':
        return <PainelAdministrativo onNavigate={setPaginaAtual} />;
      case 'jejum':
        return <JejumDaniel onNavigate={setPaginaAtual} />;
      case 'rotina':
        return <RotinaPrimeiroAmor onNavigate={setPaginaAtual} />;
      case 'desafioceleste':
        return <DesafioCeleste onNavigate={setPaginaAtual} />;
      case 'cantor-cristao':
        return <CantorCristao onNavigate={setPaginaAtual} />;
      case 'harpa':
        return <HarpaCrista onNavigate={setPaginaAtual} />;
      default:
        return <Home onNavigate={setPaginaAtual} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 font-sans flex flex-col justify-center items-center">
      <div className="w-full flex-1 flex justify-center items-center">
        {renderizarTela()}
      </div>
    </div>
  );
}