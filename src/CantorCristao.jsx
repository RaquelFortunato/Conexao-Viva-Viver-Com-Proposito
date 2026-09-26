import React, { useState, useEffect } from 'react';
import hinosData from './data/cantor_cristao.json';

export default function CantorCristao() {
  const [hinos, setHinos] = useState([]);
  const [hinoSelecionado, setHinoSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroAba, setFiltroAba] = useState('todos'); // 'todos' ou 'favoritos'
  const [favoritos, setFavoritos] = useState(() => {
    const salvo = localStorage.getItem('hinos_favoritos');
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    let listaHinos = [];
    if (Array.isArray(hinosData)) {
      listaHinos = hinosData;
    } else if (hinosData.hinos) {
      listaHinos = hinosData.hinos;
    } else if (hinosData.songs) {
      listaHinos = hinosData.songs;
    }
    setHinos(listaHinos);
  }, []);

  useEffect(() => {
    localStorage.setItem('hinos_favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (hino, e) => {
    if (e) e.stopPropagation();
    const idHino = hino.numero || hino.id || hino.titulo;
    if (favoritos.includes(idHino)) {
      setFavoritos(favoritos.filter(item => item !== idHino));
    } else {
      setFavoritos([...favoritos, idHino]);
    }
  };

  const isFavorito = (hino) => {
    const idHino = hino.numero || hino.id || hino.titulo;
    return favoritos.includes(idHino);
  };

  // Filtrar hinos com base na busca e na aba ativa
  const hinosFiltrados = hinos.filter((hino) => {
    const numero = String(hino.numero || hino.id || '');
    const titulo = (hino.titulo || hino.title || hino.name || '').toLowerCase();
    const termo = busca.toLowerCase();
    
    const correspondeBusca = titulo.includes(termo) || numero.includes(termo);
    
    if (filtroAba === 'favoritos') {
      return correspondeBusca && isFavorito(hino);
    }
    return correspondeBusca;
  });

  return (
    <div style={{ background: '#121019', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      
      {/* Topo / Header */}
      <div style={{ background: '#191523', padding: '20px', borderBottom: '1px solid #2a2438', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto' }}>
          
          {hinoSelecionado ? (
            <button 
              onClick={() => setHinoSelecionado(null)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}
            >
              ←
            </button>
          ) : (
            <div style={{ width: '24px' }}></div>
          )}

          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', letterSpacing: '0.5px' }}>
            {hinoSelecionado ? `Hino ${hinoSelecionado.numero || ''}` : 'Cantor Cristão'}
          </h1>

          {hinoSelecionado ? (
            <button 
              onClick={(e) => toggleFavorito(hinoSelecionado, e)}
              style={{ background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: isFavorito(hinoSelecionado) ? '#ff4757' : '#fff' }}
            >
              {isFavorito(hinoSelecionado) ? '♥' : '♡'}
            </button>
          ) : (
            <div style={{ width: '24px' }}></div>
          )}
        </div>

        {/* Barra de Pesquisa e Abas (Apenas na listagem) */}
        {!hinoSelecionado && (
          <div style={{ maxWidth: '800px', margin: '15px auto 0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Input de Pesquisa com Lupinha */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '15px', color: '#8c859b', fontSize: '16px' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Pesquisar hino por nome ou número..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  background: '#221c2f',
                  border: '1px solid #322b44',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Abas: Todos / Favoritos */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setFiltroAba('todos')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: filtroAba === 'todos' ? '#6c5ce7' : '#221c2f',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
              >
                Hinário
              </button>
              <button
                onClick={() => setFiltroAba('favoritos')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: filtroAba === 'favoritos' ? '#6c5ce7' : '#221c2f',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
              >
                ♥ Favoritos ({favoritos.length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div style={{ padding: '20px 15px', maxWidth: '800px', margin: '0 auto' }}>
        {hinoSelecionado ? (
          /* Visualização da Letra do Hino */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>
                {hinoSelecionado.titulo || hinoSelecionado.title || hinoSelecionado.name}
              </h2>
              <span style={{ color: '#a29bfe', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Hino {hinoSelecionado.numero || hinoSelecionado.id}
              </span>
            </div>

            <div style={{ 
              background: '#191523', 
              padding: '25px', 
              borderRadius: '16px', 
              border: '1px solid #2a2438',
              whiteSpace: 'pre-wrap', 
              lineHeight: '1.9', 
              fontSize: '16px', 
              color: '#e0dcfc' 
            }}>
              {hinoSelecionado.letra || hinoSelecionado.lyrics || hinoSelecionado.text || hinoSelecionado.content || "Letra não disponível."}
            </div>
          </div>
        ) : (
          /* Listagem dos Hinos Estilo Aplicativo */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hinosFiltrados.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#8c859b', marginTop: '40px', fontSize: '15px' }}>
                Nenhum hino encontrado.
              </div>
            ) : (
              hinosFiltrados.map((hino, index) => {
                const numero = hino.numero || hino.id || (index + 1);
                const titulo = hino.titulo || hino.title || hino.name || `Hino ${index + 1}`;
                const favorito = isFavorito(hino);

                return (
                  <div
                    key={index}
                    onClick={() => setHinoSelecionado(hino)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#191523',
                      padding: '12px 15px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      border: '1px solid #2a2438',
                      transition: 'transform 0.1s, background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#221c2f'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#191523'}
                  >
                    {/* Caixa com o número do Hino */}
                    <div style={{
                      background: '#251f33',
                      color: '#a29bfe',
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      marginRight: '15px',
                      flexShrink: 0
                    }}>
                      {numero}
                    </div>

                    {/* Nome da música */}
                    <div style={{ flex: 1, fontSize: '16px', fontWeight: '500', color: '#fff' }}>
                      {titulo}
                    </div>

                    {/* Botão de Coração / Favorito */}
                    <button
                      onClick={(e) => toggleFavorito(hino, e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: favorito ? '#ff4757' : '#6c6380',
                        padding: '8px'
                      }}
                    >
                      {favorito ? '♥' : '♡'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}