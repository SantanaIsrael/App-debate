'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, BarChart3, Activity } from 'lucide-react';
import { Post } from '@/lib/types';

interface StatsPanelProps {
  posts: Post[];
  activeFilter: string;
  onSelectFilter: (filter: any) => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  posts,
  activeFilter,
  onSelectFilter
}) => {
  // Aggregate classroom votes across all posts
  const totalProtectionVotes = posts.reduce((acc, p) => acc + (p.votesLegitimateProtection || 0), 0);
  const totalCensorshipVotes = posts.reduce((acc, p) => acc + (p.votesUndueCensorship || 0), 0);
  const totalVotes = totalProtectionVotes + totalCensorshipVotes;

  const protectionPct = totalVotes > 0 ? Math.round((totalProtectionVotes / totalVotes) * 100) : 50;
  const censorshipPct = totalVotes > 0 ? Math.round((totalCensorshipVotes / totalVotes) * 100) : 50;

  const filters = [
    { id: 'all', label: 'Todos os Posts', count: posts.length },
    { id: 'deletion', label: '1. Exclusão', count: posts.filter(p => p.moderationType === 'deletion').length },
    { id: 'editing', label: '2. Edição', count: posts.filter(p => p.moderationType === 'editing').length },
    { id: 'annotation', label: '3. Anotação', count: posts.filter(p => p.moderationType === 'annotation').length },
    { id: 'synthesis', label: '4. Síntese', count: posts.filter(p => p.moderationType === 'synthesis').length },
    { id: 'filtering', label: '5. Filtragem', count: posts.filter(p => p.moderationType === 'filtering').length },
    { id: 'formatting', label: '6. Formatação', count: posts.filter(p => p.moderationType === 'formatting').length },
    { id: 'none', label: 'Aprovados', count: posts.filter(p => p.moderationType === 'none').length },
  ];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6 space-y-4">
      {/* Live Thermometer */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Proteção Legítima: {protectionPct}% ({totalProtectionVotes} votos)</span>
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <ShieldAlert className="h-4 w-4" />
            <span>Risco de Censura: {censorshipPct}% ({totalCensorshipVotes} votos)</span>
          </span>
        </div>

        {/* Multi-color Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-slate-800">
          <div 
            style={{ width: `${protectionPct}%` }}
            className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-l-full transition-all duration-500"
          />
          <div 
            style={{ width: `${censorshipPct}%` }}
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-r-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2">
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Filtrar por Técnica de Moderação (Grimmelmann):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => onSelectFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 border ${
                activeFilter === f.id
                  ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === f.id ? 'bg-sky-700 text-sky-100' : 'bg-slate-800 text-slate-400'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
