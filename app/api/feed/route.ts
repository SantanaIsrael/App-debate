import { NextResponse } from 'next/server';
import { INITIAL_POSTS, DEBATE_QUESTIONS } from '@/lib/initialData';
import { Post, DebateQuestion } from '@/lib/types';

// In-memory state (persists across requests in node/docker process)
let currentPosts: Post[] = JSON.parse(JSON.stringify(INITIAL_POSTS));
let currentQuestions: DebateQuestion[] = JSON.parse(JSON.stringify(DEBATE_QUESTIONS));

export async function GET() {
  return NextResponse.json({
    posts: currentPosts,
    questions: currentQuestions,
    timestamp: Date.now()
  });
}

// Criar novo post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: body.authorName || 'Participante da Sala',
      authorHandle: body.authorHandle || `@estudante_${Math.floor(Math.random() * 900 + 100)}`,
      authorAvatar: body.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
      authorBio: body.authorBio || 'Debatedor da turma',
      targetCategory: body.targetCategory || 'Geral',
      originalContent: body.originalContent,
      mediaUrl: body.mediaUrl,
      createdAt: 'agora mesmo',
      likes: 1,
      commentsCount: 0,
      moderationStatus: body.moderationStatus || 'pending',
      moderationType: body.moderationType || 'none',
      authorArguments: body.authorArguments || ['Manifestação fundamentada no debate em sala'],
      suggestedModeratorArguments: body.suggestedModeratorArguments || [],
      votesLegitimateProtection: 0,
      votesUndueCensorship: 0
    };

    currentPosts.unshift(newPost);
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar post' }, { status: 400 });
  }
}

// Aplicar Moderação
export async function PUT(req: Request) {
  try {
    const { postId, moderationType, moderatorRole, moderatorJustification, editedContent } = await req.json();
    const postIndex = currentPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    const post = currentPosts[postIndex];
    post.moderationType = moderationType;
    post.moderationStatus = moderationType === 'none' ? 'approved' : 'moderated';
    post.moderatorRole = moderatorRole || 'Moderador Humano';
    post.moderatorJustification = moderatorJustification || 'Sem justificativa informada';
    post.moderatedAt = 'agora mesmo';
    if (editedContent) {
      post.editedContent = editedContent;
    }

    currentPosts[postIndex] = post;
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao moderar post' }, { status: 400 });
  }
}

// Votação (Auditoria de Post ou Pergunta de Debate)
export async function PATCH(req: Request) {
  try {
    const { type, id, voteType } = await req.json();

    if (type === 'post-vote') {
      const post = currentPosts.find(p => p.id === id);
      if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });

      if (voteType === 'protection') {
        post.votesLegitimateProtection += 1;
      } else if (voteType === 'censorship') {
        post.votesUndueCensorship += 1;
      }
      return NextResponse.json({ success: true, post });
    }

    if (type === 'question-vote') {
      const q = currentQuestions.find(item => item.id === id);
      if (!q) return NextResponse.json({ error: 'Pergunta não encontrada' }, { status: 404 });

      if (voteType === 'optionA') {
        q.votesOptionA += 1;
      } else if (voteType === 'optionB') {
        q.votesOptionB += 1;
      }
      return NextResponse.json({ success: true, question: q });
    }

    if (type === 'like') {
      const post = currentPosts.find(p => p.id === id);
      if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
      post.likes += 1;
      return NextResponse.json({ success: true, post });
    }

    return NextResponse.json({ error: 'Ação desconhecida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao computar voto' }, { status: 400 });
  }
}

// Resetar dados para o padrão inicial
export async function DELETE() {
  currentPosts = JSON.parse(JSON.stringify(INITIAL_POSTS));
  currentQuestions = JSON.parse(JSON.stringify(DEBATE_QUESTIONS));
  return NextResponse.json({ success: true, message: 'Dados restaurados com sucesso' });
}
