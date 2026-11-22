'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, UserRole } from '@/components/Navbar';
import { ConceptBanner } from '@/components/ConceptBanner';
import { StatsPanel } from '@/components/StatsPanel';
import { PostCard } from '@/components/PostCard';
import { CreatePostModal } from '@/components/CreatePostModal';
import { ModerationModal } from '@/components/ModerationModal';
import { DebateQuestionsDrawer } from '@/components/DebateQuestionsDrawer';
import { QRCodeModal } from '@/components/QRCodeModal';
import { INITIAL_POSTS, DEBATE_QUESTIONS } from '@/lib/initialData';
import { Post, DebateQuestion, ModerationType } from '@/lib/types';
import { PenSquare, Sparkles, Tv, ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [questions, setQuestions] = useState<DebateQuestion[]>(DEBATE_QUESTIONS);
  const [currentRole, setCurrentRole] = useState<UserRole>('auditor');
  const [activeFilter, setActiveFilter] = useState<'all' | ModerationType>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModerationModalOpen, setIsModerationModalOpen] = useState(false);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isConceptsOpen, setIsConceptsOpen] = useState(false);
  const [moderatingPost, setModeratingPost] = useState<Post | null>(null);

  // Live polling (sync with classroom every 2.5 seconds)
  const fetchFeed = async () => {
    try {
      const res = await fetch('/api/feed');
      if (res.ok) {
        const data = await res.json();
        if (data.posts) setPosts(data.posts);
        if (data.questions) setQuestions(data.questions);
      }
    } catch (err) {
      // offline fallback maintains local state
    }
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 2500);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleCreatePost = async (postData: any) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (res.ok) {
        await fetchFeed();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleModeratePost = async (moderationData: any) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/feed', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moderationData),
      });
      if (res.ok) {
        await fetchFeed();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleVotePost = async (postId: string, voteType: 'protection' | 'censorship') => {
    // Optimistic UI update
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          votesLegitimateProtection: voteType === 'protection' ? p.votesLegitimateProtection + 1 : p.votesLegitimateProtection,
          votesUndueCensorship: voteType === 'censorship' ? p.votesUndueCensorship + 1 : p.votesUndueCensorship,
        };
      }
      return p;
    }));

    try {
      await fetch('/api/feed', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'post-vote', id: postId, voteType }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikePost = async (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    try {
      await fetch('/api/feed', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'like', id: postId }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoteQuestion = async (questionId: number, option: 'optionA' | 'optionB') => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          votesOptionA: option === 'optionA' ? q.votesOptionA + 1 : q.votesOptionA,
          votesOptionB: option === 'optionB' ? q.votesOptionB + 1 : q.votesOptionB,
        };
      }
      return q;
    }));

    try {
      await fetch('/api/feed', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'question-vote', id: questionId, voteType: option }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetData = async () => {
    if (confirm('Deseja restaurar todos os dados e posts para a demonstração original?')) {
      await fetch('/api/feed', { method: 'DELETE' });
      await fetchFeed();
    }
  };

  const openModerationModalForPost = (post: Post) => {
    setModeratingPost(post);
    setIsModerationModalOpen(true);
  };

  // Filtered posts
  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'all') return true;
    return p.moderationType === activeFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        onOpenQuestions={() => setIsQuestionsOpen(true)}
        onOpenConcepts={() => setIsConceptsOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
        onOpenCreatePost={() => setIsCreateModalOpen(true)}
        onReset={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {/* Banner with Role Context Tip */}
        <div className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Você está no papel de:</span>
            <span className={`px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
              currentRole === 'author' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
              currentRole === 'moderator' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
              currentRole === 'projector' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {currentRole === 'author' ? '👤 Autor (Criar Posts & Argumentos)' :
               currentRole === 'moderator' ? '🛡️ Moderador (Julgar & Justificar)' :
               currentRole === 'projector' ? '🖥️ Modo Telão Projetor' :
               '👁️ Auditor / Turma (Votar & Avaliar)'}
            </span>
          </div>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            {currentRole === 'author' && 'Publique novos casos para testar a moderação.'}
            {currentRole === 'moderator' && 'Clique no botão "Moderar" dos posts para aplicar as 6 técnicas.'}
            {currentRole === 'auditor' && 'Vote em cada post: Proteção Legítima vs Censura Indevida.'}
            {currentRole === 'projector' && 'Ideal para projetar na parede da sala de aula.'}
          </span>
        </div>

        {/* Theoretical Framework Concept Guide */}
        <ConceptBanner isOpenDefault={isConceptsOpen} />

        {/* Live Classroom Thermometer & Technique Filters */}
        <StatsPanel
          posts={posts}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* Feed of Posts */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 text-sm">Nenhum post encontrado nesta categoria de moderação.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-3 px-4 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold"
              >
                Ver todos os posts
              </button>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                currentRole={currentRole}
                onVote={handleVotePost}
                onLike={handleLikePost}
                onOpenModerationModal={openModerationModalForPost}
              />
            ))
          )}
        </div>
      </main>

      {/* Floating Action Button for Authors on Mobile */}
      {currentRole === 'author' && (
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-6 right-6 p-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white shadow-2xl shadow-sky-500/40 transition active:scale-95 flex items-center gap-2 font-bold text-sm z-30"
        >
          <PenSquare className="h-5 w-5" />
          <span className="hidden sm:inline">Criar Post</span>
        </button>
      )}

      {/* Modals & Drawers */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      <ModerationModal
        post={moderatingPost}
        isOpen={isModerationModalOpen}
        onClose={() => {
          setIsModerationModalOpen(false);
          setModeratingPost(null);
        }}
        onSubmit={handleModeratePost}
      />

      <DebateQuestionsDrawer
        questions={questions}
        isOpen={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
        onVoteQuestion={handleVoteQuestion}
      />

      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>
          Debate Acadêmico: <em>"O aumento da moderação de conteúdo para proteger menores pode abrir caminho para censura indevida nas redes sociais."</em>
        </p>
        <p className="text-[11px] text-slate-600">
          Baseado em Poletto & Morais (2022, Prisma Jurídico) e Grimmelmann (2015, Yale JLT).
        </p>
      </footer>
    </div>
  );
}
