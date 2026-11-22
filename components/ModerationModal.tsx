'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Trash2, 
  FileEdit, 
  AlertTriangle, 
  Layers, 
  SlidersHorizontal, 
  EyeOff, 
  Scale, 
  Send 
} from 'lucide-react';
import { Post, ModerationType } from '@/lib/types';

interface ModerationModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (moderationData: {
    postId: string;
    moderationType: ModerationType;
    moderatorRole: 'IA Algorítmica' | 'Moderador Humano' | 'Equipe de Trust & Safety';
    moderatorJustification: string;
    editedContent?: string;
  }) => void;
}

export const ModerationModal: React.FC<ModerationModalProps> = ({
  post,
  isOpen,
  onClose,
  onSubmit
}) => {
  if (!isOpen || !post) return null;

  const [selectedType, setSelectedType] = useState<ModerationType>(post.moderationType || 'annotation');
  const [moderatorRole, setModeratorRole] = useState<'IA Algorítmica' | 'Moderador Humano' | 'Equipe de Trust & Safety'>('Moderador Humano');
  const [justification, setJustification] = useState<string>(post.moderatorJustification || '');
  const [editedText, setEditedText] = useState<string>(post.editedContent || post.originalContent);

  const presetJustifications = [
    'Aplicação estrita do ECA (art. 17/18) - preservação da dignidade, honra e imagem de menores de idade.',
    'Princípio da Precaução: prevenção a danos psicológicos, automutilação ou exploração infantil no ambiente virtual.',
    'Violação dos Padrões da Comunidade da plataforma sobre conteúdos gráficos/sensíveis para jovens.',
    'Princípios de Santa Clara: necessidade de fundamentação transparente e proporcionalidade na intervenção.',
    'Proteção contra Linchamento Virtual e acusação precipitada de menores sem contraditório legal.'
  ];

  const techniques = [
    { type: 'none' as ModerationType, name: 'Aprovar (Sem Moderação)', icon: ShieldCheck, color: 'text-emerald-400 border-emerald-500/30' },
    { type: 'deletion' as ModerationType, name: '1. Exclusão (Deletion)', icon: Trash2, color: 'text-rose-400 border-rose-500/30' },
    { type: 'editing' as ModerationType, name: '2. Edição (Editing)', icon: FileEdit, color: 'text-amber-400 border-amber-500/30' },
    { type: 'annotation' as ModerationType, name: '3. Anotação (Annotation)', icon: AlertTriangle, color: 'text-yellow-400 border-yellow-500/30' },
    { type: 'synthesis' as ModerationType, name: '4. Síntese (Synthesis)', icon: Layers, color: 'text-indigo-400 border-indigo-500/30' },
    { type: 'filtering' as ModerationType, name: '5. Filtragem (Shadowban)', icon: SlidersHorizontal, color: 'text-purple-400 border-purple-500/30' },
    { type: 'formatting' as ModerationType, name: '6. Formatação (Blur 18+)', icon: EyeOff, color: 'text-sky-400 border-sky-500/30' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      postId: post.id,
      moderationType: selectedType,
      moderatorRole,
      moderatorJustification: justification.trim() || 'Moderação aplicada conforme diretrizes de proteção.',
      editedContent: selectedType === 'editing' ? editedText : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-purple-400" />
            <h2 className="text-base font-bold text-white">Painel de Decisão da Moderação</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between font-bold text-slate-200">
            <span>{post.authorName} ({post.authorHandle})</span>
            <span className="text-sky-400 font-normal">{post.targetCategory}</span>
          </div>
          <p className="italic text-slate-300">"{post.originalContent}"</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Technique Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Escolha a Técnica de Moderação (Grimmelmann, 2015):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {techniques.map(t => {
                const Icon = t.icon;
                const isSelected = selectedType === t.type;
                return (
                  <button
                    key={t.type}
                    type="button"
                    onClick={() => setSelectedType(t.type)}
                    className={`p-2.5 rounded-xl text-left border transition text-xs font-medium flex items-center space-x-2 ${
                      isSelected
                        ? `${t.color} bg-slate-800 ring-2 ring-purple-500`
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional field for Editing */}
          {selectedType === 'editing' && (
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-amber-400">
                Texto Editado pelo Moderador (Substitua trechos sensíveis):
              </label>
              <textarea
                rows={3}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full bg-slate-950 border border-amber-900/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          )}

          {/* Moderator Role */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Agente Moderador:
              </label>
              <select
                value={moderatorRole}
                onChange={(e) => setModeratorRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="Moderador Humano">Moderador Humano (Análise Subjetiva)</option>
                <option value="IA Algorítmica">IA Algorítmica (Filtro Automatizado)</option>
                <option value="Equipe de Trust & Safety">Equipe de Trust & Safety (Diretrizes Globais)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Atalhos de Justificativa Jurídica:
              </label>
              <select
                onChange={(e) => e.target.value && setJustification(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="">Selecione um argumento padrão...</option>
                {presetJustifications.map((just, idx) => (
                  <option key={idx} value={just}>{just.slice(0, 50)}...</option>
                ))}
              </select>
            </div>
          </div>

          {/* Justification Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Justificativa / Motivação da Moderação (Obrigatório segundo os Princípios de Santa Clara):
            </label>
            <textarea
              rows={2}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explique o fundamento legal ou ético da sua decisão..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-purple-600/20 transition"
            >
              <Send className="h-4 w-4" />
              <span>Aplicar Moderação no Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
