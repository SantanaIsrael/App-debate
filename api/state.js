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
    currentRound: 0,
    isModeratedView: true,
    votingOpen: true,
    students: INITIAL_STUDENTS,
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
    if (body.state) {
      globalState = { ...globalState, ...body.state };
    }
    return res.status(200).json({ success: true, state: globalState, timestamp: Date.now() });
  }

  // GET
  return res.status(200).json({ success: true, state: globalState, timestamp: Date.now() });
};
