export type ModerationType = 
  | 'none'
  | 'deletion'      // 1. Exclusão
  | 'editing'       // 2. Edição
  | 'annotation'    // 3. Anotação
  | 'synthesis'     // 4. Síntese
  | 'filtering'     // 5. Filtragem (Shadowban)
  | 'formatting';   // 6. Formatação (Blur / 18+)

export interface Post {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorBio?: string;
  targetCategory: string; // ex: "Arte & História", "Saúde do Adolescente", etc.
  originalContent: string;
  editedContent?: string;
  mediaUrl?: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
  
  // Moderação
  moderationStatus: 'pending' | 'moderated' | 'approved';
  moderationType: ModerationType;
  moderatorRole?: 'IA Algorítmica' | 'Moderador Humano' | 'Equipe de Trust & Safety';
  moderatorJustification?: string;
  moderatedAt?: string;
  
  // Argumentos de apoio
  authorArguments: string[];
  suggestedModeratorArguments?: string[];
  
  // Auditoria da Turma (Votação)
  votesLegitimateProtection: number;
  votesUndueCensorship: number;
}

export interface DebateQuestion {
  id: number;
  title: string;
  shortDescription: string;
  fullQuestion: string;
  theoreticalBasis: string; // citação do artigo Poletto & Morais / Marco Civil / ECA
  pointsForProtection: string[];
  pointsForFreedom: string[];
  votesOptionA: number; // Proteção
  votesOptionB: number; // Liberdade / Risco de Censura
}

export interface RoomState {
  posts: Post[];
  activeFilter: 'all' | ModerationType;
  questions: DebateQuestion[];
}
