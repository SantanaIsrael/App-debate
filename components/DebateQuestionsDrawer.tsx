'use client';

import React, { useState } from 'react';
import { X, HelpCircle, ShieldCheck, ShieldAlert, Award, Clock } from 'lucide-react';
import { DebateQuestion } from '@/lib/types';

interface DebateQuestionsDrawerProps {
  questions: DebateQuestion[];
  isOpen: boolean;
  onClose: () => void;
  onVoteQuestion: (questionId: number, option: 'optionA' | 'optionB') => void;
}

export const DebateQuestionsDrawer: React.FC<DebateQuestionsDrawerProps> = ({
  questions,
  isOpen,
  onClose,
  onVoteQuestion
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(120);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  if (!isOpen) return null;

  const currentQ = questions.find(q => q.id === activeQuestionId) || questions[0];
  const totalVotes = currentQ.votesOptionA + currentQ.votesOptionB;
  const pctA = totalVotes > 0 ? Math.round((currentQ.votesOptionA / totalVotes) * 100) : 50;
  const pctB = totalVotes > 0 ? Math.round((currentQ.votesOptionB / totalVotes) * 100) : 50;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl p-6 shadow-2xl space-y-6 my-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">5 Perguntas de Ouro para o Debate com a Turma</h2>
              <p className="text-xs text-slate-400">
                Questões formuladas para provocar posições jurídicas e éticas antagônicas
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Question Selector Tabs */}
        <div className="grid grid-cols-5 gap-2">
          {questions.map(q => (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuestionId(q.id);
                setTimerSeconds(120);
                setTimerRunning(false);
              }}
              className={`py-2 px-3 rounded-xl text-center border transition text-xs font-semibold ${
                activeQuestionId === q.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="block text-[10px] opacity-75">Questão</span>
              <span>#{q.id}</span>
            </button>
          ))}
        </div>

        {/* Active Question Showcase */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Questão {currentQ.id} de 5: {currentQ.title}
            </span>
            {/* Debate timer */}
            <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Clock className="h-4 w-4 text-sky-400" />
              <span className="font-mono font-bold text-white">{formatTimer(timerSeconds)}</span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="text-[11px] text-sky-400 hover:underline font-semibold"
              >
                {timerRunning ? 'Pausar' : 'Iniciar'}
              </button>
              <button
                onClick={() => { setTimerSeconds(120); setTimerRunning(false); }}
                className="text-[10px] text-slate-500 hover:text-slate-300"
              >
                Reset
              </button>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            "{currentQ.fullQuestion}"
          </h3>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-sky-400 block mb-0.5">Fundamento no Artigo & Legislação:</span>
            <span>{currentQ.theoreticalBasis}</span>
          </div>

          {/* Antagonistic Argument Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A: Pro-Protection */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Argumentos Pró-Proteção Integral:</span>
                </span>
                <span className="text-xs font-bold text-emerald-300">{pctA}%</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                {currentQ.pointsForProtection.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onVoteQuestion(currentQ.id, 'optionA')}
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition active:scale-95"
              >
                Votar com a Proteção ({currentQ.votesOptionA})
              </button>
            </div>

            {/* Option B: Pro-Freedom / Against Censorship */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Argumentos contra a Censura Indevida:</span>
                </span>
                <span className="text-xs font-bold text-rose-300">{pctB}%</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                {currentQ.pointsForFreedom.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onVoteQuestion(currentQ.id, 'optionB')}
                className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition active:scale-95"
              >
                Votar contra a Censura ({currentQ.votesOptionB})
              </button>
            </div>
          </div>

          {/* Live Result Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Resultado da Sala: {currentQ.votesOptionA} votos</span>
              <span>{currentQ.votesOptionB} votos</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-900 flex overflow-hidden border border-slate-800">
              <div style={{ width: `${pctA}%` }} className="bg-emerald-500 h-full transition-all" />
              <div style={{ width: `${pctB}%` }} className="bg-rose-500 h-full transition-all" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-800 pt-3">
          <span>Use estas perguntas para abrir a participação da sala por 3 a 5 minutos cada.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition"
          >
            Voltar ao Feed
          </button>
        </div>
      </div>
    </div>
  );
};
