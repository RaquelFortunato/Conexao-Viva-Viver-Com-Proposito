import React, { useState } from 'react';
import Welcome from './Welcome.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Biblia from './Biblia.jsx';
import PlanoDeLeitura from './PlanoDeLeitura.jsx';
import Explorar from './Explorar.jsx';
import Configuracao from './Configuracao.jsx';
import PainelAdministrativo from './PainelAdministrativo.jsx';

export default function App() {
  const [fluxo, setFluxo] = useState('login');
  const [abaAtiva, setAbaAtiva] = useState('home');

  if (fluxo === 'login') {
    return <Login onLoginSuccess={() => setFluxo('welcome')} />;
  }

  if (fluxo === 'welcome') {
    return <Welcome onContinue={() => setFluxo('main')} />;
  }

  const renderizarTelaAtiva = () => {
    switch (abaAtiva) {
      case 'home': return <Home onNavigate={setAbaAtiva} />;
      case 'biblia': return <Biblia onNavigate={setAbaAtiva} />;
      case 'planos': return <PlanoDeLeitura onNavigate={setAbaAtiva} />;
      case 'explorar': return <Explorar onNavigate={setAbaAtiva} />;
      case 'config': return <Configuracao onNavigate={setAbaAtiva} />;
      case 'admin': return <PainelAdministrativo onNavigate={setAbaAtiva} />;
      default: return <Home onNavigate={setAbaAtiva} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', overflowY: 'auto' }}>
      {renderizarTelaAtiva()}
    </div>
  );
}