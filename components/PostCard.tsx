'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  FileEdit,
  Trash2,
  Layers,
  Scale,
  Sparkles
} from 'lucide-react';
import { Post, ModerationType } from '@/lib/types';
import { UserRole } from './Navbar';

interface PostCardProps {
  post: Post;
  currentRole: UserRole;
  onVote: (postId: string, voteType: 'protection' | 'censorship') => void;
  onLike: (postId: string) => void;
  onOpenModerationModal: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentRole,
  onVote,
  onLike,
  onOpenModerationModal
}) => {
  const [showAuthorArgs, setShowAuthorArgs] = useState(false);
  const [showModeratorJust, setShowModeratorJust] = useState(false);
  const [revealedBlurred, setRevealedBlurred] = useState(false);
  const [showOriginalEdited, setShowOriginalEdited] = useState(false);

  const totalVotes = post.votesLegitimateProtection + post.votesUndueCensorship;
  const protectionPct = totalVotes > 0 ? Math.round((post.votesLegitimateProtection / totalVotes) * 100) : 50;
  const censorshipPct = totalVotes > 0 ? Math.round((post.votesUndueCensorship / totalVotes) * 100) : 50;

  // Render moderation state badge
  const renderModerationBadge = () => {
    switch (post.moderationType) {
      case 'deletion':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-400 border border-rose-800">
            <Trash2 className="h-3 w-3" />
            1. Exclusão (Deletion)
          </span>
        );
      case 'editing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">
            <FileEdit className="h-3 w-3" />
            2. Edição (Editing)
          </span>
        );
      case 'annotation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-950/80 text-yellow-400 border border-yellow-800">
            <AlertTriangle className="h-3 w-3" />
            3. Anotação (Annotation)
          </span>
        );
      case 'synthesis':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800">
            <Layers className="h-3 w-3" />
            4. Síntese (Synthesis)
          </span>
        );
      case 'filtering':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-400 border border-purple-800">
            <SlidersHorizontal className="h-3 w-3" />
            5. Filtragem (Shadowban)
          </span>
        );
      case 'formatting':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950/80 text-sky-400 border border-sky-800">
            <EyeOff className="h-3 w-3" />
            6. Formatação (Formatting)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            <ShieldCheck className="h-3 w-3" />
            Sem Moderação (Aprovado)
          </span>
        );
    }
  };

  return (
    <article className={`w-full bg-slate-900 border rounded-2xl p-5 shadow-xl transition-all duration-300 ${
      post.moderationType === 'filtering' 
        ? 'opacity-70 border-purple-900/40 bg-slate-950/80 ring-1 ring-purple-900/30' 
        : post.moderationType === 'deletion'
        ? 'border-rose-900/40 bg-slate-900/90'
        : 'border-slate-800 hover:border-slate-700'
    }`}>
      {/* Header with Author and Moderation Tag */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center space-x-3">
          <img 
            src={post.authorAvatar} 
            alt={post.authorName} 
            className="w-10 h-10 rounded-full border border-slate-700 object-cover" 
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-white text-sm hover:underline cursor-pointer">
                {post.authorName}
              </span>
              <span className="text-xs text-slate-400">{post.authorHandle}</span>
              <span className="text-xs text-slate-500">• {post.createdAt}</span>
            </div>
            <div className="text-[11px] text-sky-400 font-medium">
              Categoria: {post.targetCategory}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {renderModerationBadge()}
          {currentRole === 'moderator' && (
            <button
              onClick={() => onOpenModerationModal(post)}
              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition"
            >
              <FileEdit className="h-3.5 w-3.5" />
              <span>Moderar</span>
            </button>
          )}
        </div>
      </div>

      {/* SPECIAL MODERATION VISUALIZATIONS */}

      {/* 1. DELETION */}
      {post.moderationType === 'deletion' ? (
        <div className="my-4 p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-sm">
            <Trash2 className="h-5 w-5" />
            <span>[CONTEÚDO REMOVIDO PELA PLATAFORMA]</span>
          </div>
          <p className="text-xs text-rose-300/80 max-w-lg mx-auto">
            Esta publicação foi excluída por violar os Padrões da Comunidade referentes à proteção integral e integridade de menores.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setRevealedBlurred(!revealedBlurred)}
              className="text-[11px] text-slate-400 hover:text-white underline transition"
            >
              {revealedBlurred ? 'Ocultar post original da auditoria' : 'Exibir conteúdo original (auditoria acadêmica)'}
            </button>
          </div>
          {revealedBlurred && (
            <div className="mt-3 p-3 rounded bg-slate-950/80 border border-slate-800 text-left text-xs text-slate-300">
              <span className="text-slate-500 font-semibold block mb-1">Texto original censurado:</span>
              <p>{post.originalContent}</p>
            </div>
          )}
        </div>
      ) : post.moderationType === 'synthesis' ? (
        /* 4. SYNTHESIS */
        <div className="my-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/50 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wide">
            <Layers className="h-4 w-4" />
            <span>Painel de Síntese Institucional (Grimmelmann #4)</span>
          </div>
          <div className="p-3 bg-slate-950/70 rounded-lg border border-indigo-900/30 text-xs text-indigo-200 leading-relaxed">
            <p className="font-medium text-white mb-1">Resumo Curado pela Plataforma:</p>
            <p>
              "O debate sobre este tópico foi compilado para garantir um ambiente equilibrado e seguro para jovens. As manifestações individuais foram agregadas nesta síntese para prevenir conflitos e polarização desmedida."
            </p>
          </div>
          <button
            onClick={() => setRevealedBlurred(!revealedBlurred)}
            className="text-xs text-indigo-300 hover:underline"
          >
            {revealedBlurred ? 'Recolher manifestação original' : 'Ver post individual original'}
          </button>
          {revealedBlurred && (
            <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-300">
              {post.originalContent}
            </div>
          )}
        </div>
      ) : (
        /* NORMAL POST RENDERING (WITH ANNOTATION / EDITING / FORMATTING / FILTERING) */
        <div className="space-y-3 my-3">
          {/* 3. ANNOTATION BANNER */}
          {post.moderationType === 'annotation' && (
            <div className="p-3 rounded-xl bg-yellow-950/30 border border-yellow-800/40 flex items-start gap-2.5 text-xs text-yellow-300">
              <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Aviso Institucional da Plataforma:</span>
                <span>{post.moderatorJustification || 'Aviso de Conteúdo Sensível para Jovens.'}</span>
              </div>
            </div>
          )}

          {/* 5. FILTERING (SHADOWBAN) BANNER */}
          {post.moderationType === 'filtering' && (
            <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-900/40 flex items-center justify-between text-[11px] text-purple-300">
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span><strong>Filtragem Ativa:</strong> Alcance rebaixado em 95% no feed de menores de idade.</span>
              </span>
              <span className="font-mono text-purple-400">Algoritmo: Downranked</span>
            </div>
          )}

          {/* 2. EDITING */}
          {post.moderationType === 'editing' && post.editedContent ? (
            <div className="space-y-2">
              <div className="text-sm text-slate-200 leading-relaxed">
                {showOriginalEdited ? post.originalContent : post.editedContent}
              </div>
              <div className="flex items-center justify-between text-xs text-amber-400/90 pt-1">
                <span className="flex items-center gap-1">
                  <FileEdit className="h-3.5 w-3.5" />
                  <span>{showOriginalEdited ? 'Exibindo versão original com dados expostos' : 'Conteúdo editado pelo moderador para proteção de terceiros'}</span>
                </span>
                <button
                  onClick={() => setShowOriginalEdited(!showOriginalEdited)}
                  className="underline hover:text-amber-300"
                >
                  {showOriginalEdited ? 'Ver versão editada' : 'Comparar com o original'}
                </button>
              </div>
            </div>
          ) : (
            /* TEXT CONTENT */
            <p className="text-sm text-slate-200 leading-relaxed">
              {post.originalContent}
            </p>
          )}

          {/* 6. FORMATTING (BLUR) */}
          {post.mediaUrl && (
            <div className="relative rounded-xl overflow-hidden border border-slate-800 max-h-80 bg-slate-950">
              {post.moderationType === 'formatting' && !revealedBlurred ? (
                <div className="relative">
                  <img 
                    src={post.mediaUrl} 
                    alt="Mídia" 
                    className="w-full h-64 object-cover filter blur-xl scale-105" 
                  />
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                    <EyeOff className="h-8 w-8 text-sky-400 mb-2" />
                    <span className="text-xs font-bold text-white mb-1">
                      Conteúdo Visual Ocultado (Moderação por Formatação)
                    </span>
                    <p className="text-[11px] text-slate-300 max-w-xs mb-3">
                      Esta imagem pode ser inadequada ou sensível para menores de 18 anos.
                    </p>
                    <button
                      onClick={() => setRevealedBlurred(true)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Confirmar maioridade e exibir</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={post.mediaUrl} 
                    alt="Mídia" 
                    className="w-full max-h-80 object-cover" 
                  />
                  {post.moderationType === 'formatting' && (
                    <button
                      onClick={() => setRevealedBlurred(false)}
                      className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-900/80 text-[10px] text-slate-300 hover:text-white"
                    >
                      Voltar a ocultar
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ARGUMENTS DRAWERS (AUTHOR VS MODERATOR) */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
        {/* Author Argument Accordion */}
        <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-hidden">
          <button
            onClick={() => setShowAuthorArgs(!showAuthorArgs)}
            className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-medium text-sky-400 hover:bg-slate-800/40 transition"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Argumentos de Defesa do Autor ({post.authorArguments.length})</span>
            </span>
            {showAuthorArgs ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {showAuthorArgs && (
            <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-300 space-y-1.5">
              {post.authorArguments.map((arg, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{arg}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Moderator Justification Accordion */}
        {post.moderatorJustification && (
          <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-hidden">
            <button
              onClick={() => setShowModeratorJust(!showModeratorJust)}
              className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-medium text-purple-400 hover:bg-slate-800/40 transition"
            >
              <span className="flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5 text-purple-400" />
                <span>Justificativa da Moderação ({post.moderatorRole})</span>
              </span>
              {showModeratorJust ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {showModeratorJust && (
              <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-xs text-purple-200/90 space-y-2">
                <p><strong>Fundamentação:</strong> {post.moderatorJustification}</p>
                {post.suggestedModeratorArguments && post.suggestedModeratorArguments.length > 0 && (
                  <div className="pt-1 border-t border-purple-900/30 text-[11px] text-slate-400 space-y-1">
                    <span className="font-semibold text-purple-300 block">Outros pontos a favor da moderação:</span>
                    {post.suggestedModeratorArguments.map((arg, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-purple-400">•</span>
                        <span>{arg}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* AUDITORIA DA TURMA (VOTAÇÃO DA SALA) */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
          <span>Auditoria da Turma: Esta moderação foi adequada?</span>
          <span className="text-[11px] text-slate-500">{totalVotes} votos</span>
        </div>

        {/* Voting Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={() => onVote(post.id, 'protection')}
            className="py-1.5 px-3 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Proteção Legítima ({post.votesLegitimateProtection})</span>
          </button>

          <button
            onClick={() => onVote(post.id, 'censorship')}
            className="py-1.5 px-3 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/50 text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Censura Indevida ({post.votesUndueCensorship})</span>
          </button>
        </div>

        {/* Mini progress bar of the post */}
        {totalVotes > 0 && (
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${protectionPct}%` }}
              className="bg-emerald-500 h-full transition-all"
            />
            <div 
              style={{ width: `${censorshipPct}%` }}
              className="bg-rose-500 h-full transition-all"
            />
          </div>
        )}
      </div>

      {/* Social Interactions Footer (Likes, Comments) */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/40">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onLike(post.id)}
            className="flex items-center space-x-1 hover:text-rose-400 transition"
          >
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </button>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500">ID: {post.id}</span>
      </div>
    </article>
  );
};
