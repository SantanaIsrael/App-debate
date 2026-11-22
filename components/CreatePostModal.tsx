'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, BookOpen } from 'lucide-react';
import { INITIAL_POSTS } from '@/lib/initialData';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(INITIAL_POSTS[0].id);

  // Custom post form state
  const [authorName, setAuthorName] = useState('');
  const [authorHandle, setAuthorHandle] = useState('');
  const [targetCategory, setTargetCategory] = useState('Educação & Sociedade');
  const [content, setContent] = useState('');
  const [authorArg1, setAuthorArg1] = useState('');
  const [authorArg2, setAuthorArg2] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (e: React.FormEvent) => {
    e.preventDefault();
    const preset = INITIAL_POSTS.find(p => p.id === selectedPresetId);
    if (!preset) return;

    onSubmit({
      authorName: preset.authorName,
      authorHandle: preset.authorHandle,
      authorAvatar: preset.authorAvatar,
      authorBio: preset.authorBio,
      targetCategory: preset.targetCategory,
      originalContent: preset.originalContent,
      mediaUrl: preset.mediaUrl,
      authorArguments: preset.authorArguments,
      suggestedModeratorArguments: preset.suggestedModeratorArguments,
      moderationStatus: 'pending',
      moderationType: 'none', // starts unmoderated so moderator classmates can act!
    });
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const args = [];
    if (authorArg1.trim()) args.push(authorArg1.trim());
    if (authorArg2.trim()) args.push(authorArg2.trim());
    if (args.length === 0) args.push('Livre manifestação do pensamento (CF art. 5º, IV)');

    onSubmit({
      authorName: authorName.trim() || 'Estudante da Turma',
      authorHandle: authorHandle.trim() || `@debatedor_${Math.floor(Math.random() * 900 + 100)}`,
      authorAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
      targetCategory,
      originalContent: content.trim(),
      authorArguments: args,
      moderationStatus: 'pending',
      moderationType: 'none',
    });
    onClose();
  };

  const currentPreset = INITIAL_POSTS.find(p => p.id === selectedPresetId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-sky-400" />
            <h2 className="text-base font-bold text-white">Publicar no Feed (Papel do Autor)</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('preset')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'preset' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Escolher Caso Pré-definido (Recomendado para o Debate)
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'custom' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Criar Post Livre Customizado
          </button>
        </div>

        {mode === 'preset' ? (
          <form onSubmit={handleSelectPreset} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Selecione o Dilema Prático:
              </label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {INITIAL_POSTS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.authorName} - [{p.targetCategory}] {p.originalContent.slice(0, 60)}...
                  </option>
                ))}
              </select>
            </div>

            {currentPreset && (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-400">{currentPreset.authorName} ({currentPreset.authorHandle})</span>
                  <span className="text-slate-400">{currentPreset.targetCategory}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  "{currentPreset.originalContent}"
                </p>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Argumentos de Defesa que acompanharão o post:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {currentPreset.authorArguments.map((arg, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-400">•</span>
                        <span>{arg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

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
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-sky-500/20 transition"
              >
                <Send className="h-4 w-4" />
                <span>Lançar no Feed para Moderação</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Autor:</label>
                <input
                  type="text"
                  placeholder="Ex: Aluno Lucas"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Categoria:</label>
                <input
                  type="text"
                  placeholder="Ex: Política Jovem, Memes..."
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Conteúdo da Postagem:</label>
              <textarea
                rows={3}
                placeholder="Escreva a mensagem que gerará o dilema sobre proteção de menores vs censura..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Seus Argumentos de Defesa (para o debate):
              </label>
              <input
                type="text"
                placeholder="Argumento 1: ex: Liberdade de expressão e debate cívico"
                value={authorArg1}
                onChange={(e) => setAuthorArg1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
              <input
                type="text"
                placeholder="Argumento 2: ex: Ausência de dano ou intenção criminosa"
                value={authorArg2}
                onChange={(e) => setAuthorArg2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
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
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                <Send className="h-4 w-4" />
                <span>Publicar</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
