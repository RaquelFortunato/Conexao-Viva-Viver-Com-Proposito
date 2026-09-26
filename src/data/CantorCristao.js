import React, { useState } from 'react';
import hinosData from './data/cantor_cristao.json';

export default function CantorCristao() {
  const [busca, setBusca] = useState('');
  const [hinoSelecionado, setHinoSelecionado] = useState(null);

  // Filtra os hinos pelo número do ID ou pelo título
  const hinosFiltrados = hinosData.filter(hino => 
    hino.title.toLowerCase().includes(busca.toLowerCase()) ||
    String(hino.id).includes(busca)
  );

  // Se o usuário clicou em um hino, mostra a letra completa dele
  if (hinoSelecionado) {
    return (
      <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
        <button 
          onClick={() => setHinoSelecionado(null)}
          style={{ padding: '8px 16px', marginBottom: '20px', cursor: 'pointer', borderRadius: '5px' }}
        >
          ← Voltar para a lista
        </button>
        <h2>{hinoSelecionado.id}. {hinoSelecionado.title}</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6', marginTop: '20px' }}>
          {hinoSelecionado.lyrics}
        </pre>
      </div>
    );
  }

  // Tela principal com a barra de pesquisa e a lista de hinos
  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Cantor Cristão</h2>
      <input 
        type="text" 
        placeholder="Pesquisar por número ou título..." 
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', boxSizing: 'border-box' }}
      />
      <div>
        {hinosFiltrados.map(hino => (
          <div 
            key={hino.id} 
            onClick={() => setHinoSelecionado(hino)}
            style={{ padding: '12px', borderBottom: '1px solid #444', cursor: 'pointer' }}
          >
            <strong>{hino.id}. {hino.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
