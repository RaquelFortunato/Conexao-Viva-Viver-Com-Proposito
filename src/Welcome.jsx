import React, { useState, useEffect } from 'react';
import { supabase } from './data/supabase.js';
import logoImg from './assets/Whatslogo.jpeg';
import fotoPerfil from './assets/Whatsadministradora.jpeg';

export default function Welcome({ onContinue }) {
  // Estados para buscar as imagens de marca (logo, banner e foto do responsável) do Supabase
  const [customLogo, setCustomLogo] = useState(null);
  const [customBanner, setCustomBanner] = useState(null);
  const [customFoto, setCustomFoto] = useState(null);

  useEffect(() => {
    async function fetchBrandAssets() {
      try {
        const { data, error } = await supabase
          .from('app_config')
          .select('key, value');
        
        if (!error && data) {
          const logoObj = data.find(item => item.key === 'app_logo');
          const bannerObj = data.find(item => item.key === 'app_banner');
          const fotoObj = data.find(item => item.key === 'foto_responsavel');
          
          if (logoObj && logoObj.value) setCustomLogo(logoObj.value);
          if (bannerObj && bannerObj.value) setCustomBanner(bannerObj.value);
          if (fotoObj && fotoObj.value) setCustomFoto(fotoObj.value);
        }
      } catch (err) {
        console.log('Usando imagem padrão local para assets');
      }
    }
    fetchBrandAssets();
  }, []);

  const activeLogo = customLogo && customLogo.trim() !== '' ? customLogo : logoImg;
  const activeBanner = customBanner && customBanner.trim() !== '' ? customBanner : logoImg;
  const activeFoto = customFoto && customFoto.trim() !== '' ? customFoto : fotoPerfil;

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col items-center justify-center px-4 py-8 relative overflow-y-auto">
      
      {/* Brilho ambiental sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Container Principal do App - Mesma largura da tela de login, expandido verticalmente */}
      <div className="w-full max-w-md bg-[#0E1525]/95 rounded-3xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md z-10 overflow-hidden my-auto flex flex-col">
        
        {/* BANNER DEITADO NO TOPO COM A LOGO SOBREPOSTA */}
        <div className="relative w-full h-32 shrink-0 bg-slate-900">
          <img 
            src={activeBanner} 
            alt="Banner Conexão Viva" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1525] via-transparent to-transparent" />
          
          {/* Logo sobreposta no canto do Banner */}
          <div className="absolute -bottom-4 left-6 flex items-end gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-xl flex items-center justify-center overflow-hidden border-2 border-[#0E1525]">
              <img 
                src={activeLogo} 
                alt="Logo Conexão Viva" 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.src = logoImg;
                }}
              />
            </div>
          </div>
        </div>

        {/* CONTEÚDO EXPANDIDO E CONFORTÁVEL */}
        <div className="p-6 pt-7 text-center flex-1 space-y-6">
          
          {/* Título de Boas-Vindas */}
          <div>
            <h2 className="text-xl font-serif font-semibold text-white">
              Seja bem-vindo ao Conexão Viva
            </h2>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Um refúgio diário de paz, reflexão e oração.
            </p>
          </div>

          {/* CARD DA CRIADORA: FOTO RETRATO VERTICAL GRANDE + MENSAGEM */}
          <div className="bg-[#070B14] border border-slate-800/80 rounded-2xl p-5 text-center shadow-inner relative overflow-hidden space-y-4">
            
            {/* Foto Retrato Vertical com Altura Ampla (Mostrando o corpo/rosto completo) */}
            <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg bg-slate-950 flex items-center justify-center">
              <img 
                src={activeFoto} 
                alt="Raquel Fortunato" 
                className="w-full h-full object-cover rounded-xl object-top"
                onError={(e) => {
                  e.target.src = fotoPerfil;
                }}
              />
            </div>

            {/* Dizeres de Boas-Vindas Legíveis e Espaçosos */}
            <p className="text-slate-200 text-sm font-medium italic leading-relaxed px-2">
              "Sou Raquel Fortunato, brasileira e criei esse espaço especialmente para você, para trazer palavras que acalmam, fortalecem e trazem esperança para o seu coração!"
            </p>
          </div>

          {/* Botão de Prosseguir */}
          <button
            type="button"
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_5px_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>Prosseguir</span>
            <span className="text-base font-bold">→</span>
          </button>

          {/* Rodapé e Termos */}
          <div className="pt-3 border-t border-slate-800/80 space-y-1 text-center pb-2">
            <p className="text-[10px] text-slate-400 font-medium">
              🔒 Ambiente Seguro & Privado • Dados Protegidos
            </p>
            <p className="text-[10px] text-slate-500">
              Ao continuar, você concorda com nossos <span className="underline cursor-pointer text-slate-400">Termos de Uso</span>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}