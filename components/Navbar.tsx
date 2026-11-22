'use client';

import React from 'react';
import { 
  ShieldAlert, 
  HelpCircle, 
  QrCode, 
  RotateCcw, 
  Tv, 
  PenSquare, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

export type UserRole = 'author' | 'moderator' | 'projector' | 'auditor';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenQuestions: () => void;
  onOpenConcepts: () => void;
  onOpenQR: () => void;
  onOpenCreatePost: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  onOpenQuestions,
  onOpenConcepts,
  onOpenQR,
  onOpenCreatePost,
  onReset
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Debate Topic */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">ModeraRede</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800">
                Debate Acadêmico
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block max-w-md truncate">
              Proteção de Menores vs. Risco de Censura Indevida nas Redes
            </p>
          </div>
        </div>

        {/* Role Selector Pills */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => onSelectRole('author')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'author' 
                ? 'bg-sky-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PenSquare className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Perfil:</span>
            <span>Autor</span>
          </button>

          <button
            onClick={() => onSelectRole('moderator')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'moderator' 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Perfil:</span>
            <span>Moderador</span>
          </button>

          <button
            onClick={() => onSelectRole('auditor')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'auditor' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Perfil:</span>
            <span>Turma / Voto</span>
          </button>

          <button
            onClick={() => onSelectRole('projector')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'projector' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tv className="h-3.5 w-3.5" />
            <span>Telão</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {currentRole === 'author' && (
            <button
              onClick={onOpenCreatePost}
              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold flex items-center space-x-1 shadow-md shadow-sky-500/20 transition"
            >
              <PenSquare className="h-3.5 w-3.5" />
              <span>Publicar Dilema</span>
            </button>
          )}

          <button
            onClick={onOpenQuestions}
            title="5 Perguntas de Debate"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-medium flex items-center space-x-1 transition"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Perguntas (5)</span>
          </button>

          <button
            onClick={onOpenConcepts}
            title="Conceitos & 6 Tipos de Moderação"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 text-xs font-medium flex items-center space-x-1 transition"
          >
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">Teoria</span>
          </button>

          <button
            onClick={onOpenQR}
            title="Compartilhar QR Code com a Turma"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <QrCode className="h-4 w-4" />
          </button>

          <button
            onClick={onReset}
            title="Restaurar dados de demonstração"
            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
