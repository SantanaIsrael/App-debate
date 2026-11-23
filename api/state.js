// api/state.js - Vercel Serverless Function
let globalState = null;

const INITIAL_STUDENTS = [
  { id: "s01", name: "Henrique Barreto Pereira", team: "mod", points: 0 },
  { id: "s02", name: "Erick Batista dos Santos", team: "user", points: 0 },
  { id: "s03", name: "Gilbert Carmo Macedo", team: "mod", points: 0 },
  { id: "s04", name: "Henrique Cerqueira Fadigas", team: "user", points: 0 },
  { id: "s05", name: "Henrique Daniel Resende", team: "mod", points: 0 },
  { id: "s06", name: "Augusto Fagundes Moreira Barros", team: "user", points: 0 },
  { id: "s07", name: "Bruno Felipe dos Santos Pereira", team: "mod", points: 0 },
  { id: "s08", name: "Daniel Figueiredo Araujo", team: "user", points: 0 },
  { id: "s09", name: "Lucas Gabriel Ferreira", team: "mod", points: 0 },
  { id: "s10", name: "Antonio Henrique Oliveira Santos", team: "user", points: 0 },
  { id: "s11", name: "Vivian Kesse", team: "mod", points: 0 },
  { id: "s12", name: "Christian Menezes Oliveira", team: "user", points: 0 },
  { id: "s13", name: "Joao Paulo Santos Luz Pereira", team: "mod", points: 0 },
  { id: "s14", name: "Henio Pedro Silva Santana", team: "user", points: 0 },
  { id: "s15", name: "Ariel Pina Ribeiro", team: "mod", points: 0 },
  { id: "s16", name: "Sara Raquel Pinto Brandao Silva", team: "user", points: 0 },
  { id: "s17", name: "Deyvid Reis Santos", team: "mod", points: 0 },
  { id: "s18", name: "Gabriel Rosa Galdino", team: "user", points: 0 },
  { id: "s19", name: "Bruno Schumacher Farias Souza", team: "mod", points: 0 },
  { id: "s20", name: "Ylo Silva de Sa Bittencourt", team: "user", points: 0 },
  { id: "s21", name: "Mateus Silva Lisboa", team: "mod", points: 0 },
  { id: "s22", name: "Lucas Vieira de Almeida", team: "user", points: 0 },
  { id: "s23", name: "Joao Vitor Guimaraes dos Santos", team: "mod", points: 0 }
];

function getDefaultState() {
  return {
    sessionId: Date.now(),
    currentRound: 0,
    isModeratedView: true,
    votingOpen: true,
    votingOpenByRound: [true, true, true, true, true, true],
    students: JSON.parse(JSON.stringify(INITIAL_STUDENTS)),
    attendance: {},
    typingByTeam: { mod: {}, user: {} },
    roundSpeakers: {
      mod: ["Henrique Barreto Pereira", "Gilbert Carmo Macedo"],
      user: ["Erick Batista dos Santos", "Henrique Cerqueira Fadigas"]
    },
    votesByRound: [{}, {}, {}, {}, {}, {}],
    groupChats: {
      mod: [
        { sender: "Sistema", text: "Bem-vindos à Sala Privada dos Moderadores! Usem este espaço para sugerir argumentos aos colegas que vão falar.", time: "Início" }
      ],
      user: [
        { sender: "Sistema", text: "Bem-vindos à Sala Privada dos Usuários! Usem este espaço para combinar argumentos e ajudar seus porta-vozes.", time: "Início" }
      ]
    }
  };
}

function applyAction(currentState, action) {
  if (!action || !action.type) return currentState;
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (!currentState.attendance) currentState.attendance = {};
  if (!currentState.typingByTeam) currentState.typingByTeam = { mod: {}, user: {} };
  if (!currentState.votesByRound) currentState.votesByRound = [{}, {}, {}, {}, {}, {}];
  if (!currentState.groupChats) currentState.groupChats = { mod: [], user: [] };

  const markPresent = (studentId) => {
    if (!studentId) return;
    if (!currentState.attendance[studentId] || !currentState.attendance[studentId].present) {
      currentState.attendance[studentId] = { present: true, joinedAt: action.joinedAt || timeStr };
    }
  };

  if (action.type === 'checkin') {
    markPresent(action.studentId);
  } else if (action.type === 'vote') {
    const rIdx = Number(action.roundIdx);
    const isCurrentRound = rIdx === Number(currentState.currentRound);
    const isRoundOpen = currentState.votingOpen !== false && (!currentState.votingOpenByRound || currentState.votingOpenByRound[rIdx] !== false);
    if (!Number.isNaN(rIdx) && rIdx >= 0 && rIdx < 6 && action.studentId && isCurrentRound && isRoundOpen) {
      if (!currentState.votesByRound[rIdx]) currentState.votesByRound[rIdx] = {};
      currentState.votesByRound[rIdx][action.studentId] = action.choice;
      markPresent(action.studentId);
    }
  } else if (action.type === 'chat') {
    const team = action.team === 'mod' ? 'mod' : 'user';
    if (!currentState.groupChats[team]) currentState.groupChats[team] = [];
    const exists = action.msgId && currentState.groupChats[team].some(m => m.id === action.msgId);
    if (!exists && action.text) {
      currentState.groupChats[team].push({
        id: action.msgId || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sender: action.sender,
        senderId: action.senderId,
        text: action.text,
        time: action.time || timeStr
      });
      if (currentState.groupChats[team].length > 50) {
        currentState.groupChats[team] = currentState.groupChats[team].slice(-50);
      }
    }
    if (action.senderId && currentState.typingByTeam[team]) {
      delete currentState.typingByTeam[team][action.senderId];
    }
    markPresent(action.senderId);
  } else if (action.type === 'typing') {
    const team = action.team === 'mod' ? 'mod' : 'user';
    if (!currentState.typingByTeam[team]) currentState.typingByTeam[team] = {};
    if (action.isTyping && action.studentId) {
      currentState.typingByTeam[team][action.studentId] = Date.now();
    } else if (action.studentId) {
      delete currentState.typingByTeam[team][action.studentId];
    }
  }
  return currentState;
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!globalState) {
    globalState = getDefaultState();
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    if (body.reset === true) {
      globalState = body.state ? body.state : getDefaultState();
    } else if (body.action) {
      globalState = applyAction(globalState, body.action);
    } else if (body.state) {
      globalState = {
        ...globalState,
        ...body.state,
        attendance: { ...(globalState.attendance || {}), ...(body.state.attendance || {}) },
        votesByRound: [0, 1, 2, 3, 4, 5].map(i => ({
          ...(globalState.votesByRound?.[i] || {}),
          ...(body.state.votesByRound?.[i] || {})
        }))
      };
    }
    return res.status(200).json({ success: true, state: globalState, timestamp: Date.now() });
  }

  // GET
  return res.status(200).json({ success: true, state: globalState, timestamp: Date.now() });
};
