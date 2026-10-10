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

  const activeLogo = customLogo || logoImg;
  const activeBanner = customBanner || logoImg;
  const activeFoto = customFoto || fotoPerfil;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Container Principal do App */}
      <div className="w-full max-w-md bg-slate-900/95 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md my-auto overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* BANNER DE FUNDO COM A LOGO SOBREPOSTA NO CANTO */}
        <div className="relative w-full h-32 shrink-0 bg-slate-800">
          <img 
            src={activeBanner} 
            alt="Banner Conexão Viva" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          {/* Logo sobreposta no canto do Banner */}
          <div className="absolute -bottom-4 left-6 flex items-end gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-xl flex items-center justify-center overflow-hidden border-2 border-slate-900">
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

        {/* CONTEÚDO COM ROLAGEM SENSÍVEL AO TOQUE E BARRA ESCONDIDA ([&-::-webkit-scrollbar]:hidden) */}
        <div className="p-6 pt-6 text-center overflow-y-auto [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 space-y-6">
          
          {/* Título de Boas-Vindas */}
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Seja bem-vindo ao Conexão Viva
            </h2>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              Um refúgio diário de paz, reflexão e oração.
            </p>
          </div>

          {/* CARD DA CRIADORA: FOTO COMPLETA + MENSAGEM */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center shadow-inner relative overflow-hidden">
            
            {/* Foto Retrato Inteira, Grande e Nítida */}
            <div className="w-full rounded-xl overflow-hidden border border-amber-500/30 mb-4 shadow-lg bg-slate-950 flex items-center justify-center">
              <img 
                src={activeFoto} 
                alt="Raquel Fortunato" 
                className="w-full h-auto object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = fotoPerfil;
                }}
              />
            </div>

            {/* Dizeres de Boas-Vindas Legíveis */}
            <p className="text-slate-200 text-base font-medium italic leading-relaxed px-2">
              "Sou Raquel Fortunato, brasileira e criei esse espaço especialmente para você, para trazer palavras que acalmam, fortalecem e trazem esperança para o seu coração!"
            </p>
          </div>

          {/* Botão de Prosseguir */}
          <button
            type="button"
            onClick={onContinue}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <span>Prosseguir</span>
            <span className="text-lg">→</span>
          </button>

          {/* Rodapé e Termos */}
          <div className="pt-3 border-t border-slate-800/60 space-y-1.5 text-center">
            <p className="text-xs text-slate-400 font-medium">
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