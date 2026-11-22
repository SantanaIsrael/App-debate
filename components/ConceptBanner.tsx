'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Trash2, 
  FileEdit, 
  AlertTriangle, 
  Layers, 
  SlidersHorizontal, 
  EyeOff, 
  ChevronDown, 
  ChevronUp,
  Scale
} from 'lucide-react';

export const ConceptBanner: React.FC<{ isOpenDefault?: boolean }> = ({ isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const [activeTab, setActiveTab] = useState<number>(0);

  const types = [
    {
      num: '1',
      name: 'Exclusão (Deletion)',
      icon: Trash2,
      color: 'text-rose-400 border-rose-500/30 bg-rose-950/30',
      desc: 'Remoção permanente da publicação que a plataforma julga violar seus Termos de Uso.',
      problem: 'Falsos positivos de IA desconsideram o contexto histórico, jornalístico ou artístico. Apaga denúncias de abuso e registros legítimos (ex: foto histórica do Vietnã citada por Poletto & Morais).'
    },
    {
      num: '2',
      name: 'Edição (Editing)',
      icon: FileEdit,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
      desc: 'Alteração direta do conteúdo pelo moderador para expurgar trechos inadequados.',
      problem: 'O moderador impõe sua própria interpretação e verdade sobre a do autor original (Grimmelmann, 2015), alterando o tom de desabafos e denúncias de menores.'
    },
    {
      num: '3',
      name: 'Anotação (Annotation)',
      icon: AlertTriangle,
      color: 'text-yellow-400 border-yellow-500/30 bg-yellow-950/30',
      desc: 'Adição de selos de aviso, tarjas de sensibilidade, notas de checagem ou alertas institucionais.',
      problem: 'Estigmatiza discussões sobre saúde mental, gênero ou política juvenil, criando um freio psicológico que desestimula o debate crítico.'
    },
    {
      num: '4',
      name: 'Síntese (Synthesis)',
      icon: Layers,
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/30',
      desc: 'Agregação e resumo do debate em painéis temáticos e caixas oficiais simplificadas.',
      problem: 'Invisibiliza manifestações estudantis espontâneas em favor de uma narrativa burocrática e domesticada definida pela plataforma.'
    },
    {
      num: '5',
      name: 'Filtragem (Filtering)',
      icon: SlidersHorizontal,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/30',
      desc: 'Rebaixamento algorítmico do alcance (Shadowbanning) na timeline ou bloqueio em buscas.',
      problem: 'A censura mais perigosa porque é invisível: o jovem posta achando que participa, mas o algoritmo o oculta de todos sem aviso, contraditório ou recurso.'
    },
    {
      num: '6',
      name: 'Formatação (Formatting)',
      icon: EyeOff,
      color: 'text-sky-400 border-sky-500/30 bg-sky-950/30',
      desc: 'Tratamento visual restritivo (desfocar fotos, criar barreiras de "confirme que tem 18 anos").',
      problem: 'Dificulta o acesso rápido a informações educativas sobre direitos e saúde, além de confundir ironias/memes jovens com perigo real.'
    }
  ];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 hover:bg-slate-800/80 transition"
      >
        <div className="flex items-center space-x-3 text-left">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>Fundamentação Teórica: O que é Moderação de Conteúdo?</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Poletto & Morais (2022) / Grimmelmann (2015)
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Conheça a definição acadêmica e os 6 tipos de moderação praticados pelas plataformas
            </p>
          </div>
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-slate-800 bg-slate-950/50 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-medium">
              <Scale className="h-4 w-4" />
              <span>Conceito Central do Artigo</span>
            </div>
            <p>
              Segundo <strong>Poletto & Morais (2022)</strong>, a moderação de conteúdo representa o <em>controle massivo exercido pelas plataformas privadas sobre o fluxo de informação dos usuários</em>, operada predominantemente por inteligência artificial e baseada em regras privadas (Padrões da Comunidade).
            </p>
            <p className="text-amber-300/90">
              <strong>O Grande Conflito do Debate:</strong> Sob a justificativa legítima de proteger menores contra abusos, o aumento da moderação automatizada gera o fenômeno do <em>over-blocking</em> (bloqueio preventivo exagerado) e do <em>chilling effect</em> (efeito inibidor da livre expressão), transformando empresas privadas em juízas soberanas do discurso público.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              As 6 Técnicas de Moderação (James Grimmelmann, 2015):
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
              {types.map((t, idx) => {
                const Icon = t.icon;
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={t.num}
                    onClick={() => setActiveTab(idx)}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col justify-between ${
                      isSelected 
                        ? `${t.color} ring-1 ring-white/20` 
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-bold opacity-60">#{t.num}</span>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium truncate w-full">{t.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Type Details */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{types[activeTab].name}</span>
              </div>
              <p className="text-xs text-slate-300">{types[activeTab].desc}</p>
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 text-xs text-rose-300">
                <strong>Problemática no Debate com Menores:</strong> {types[activeTab].problem}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
