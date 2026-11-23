const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

const DATA_DIR = process.env.VERCEL ? '/tmp/data' : path.join(__dirname, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial state fallback
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

// Load state from file if exists, else use default
let state = getDefaultState();
try {
  if (fs.existsSync(STATE_FILE)) {
    const raw = fs.readFileSync(STATE_FILE, 'utf8');
    state = JSON.parse(raw);
    console.log('[Server] Estado carregado do arquivo local data/state.json');
  }
} catch (e) {
  console.warn('[Server] Não foi possível ler data/state.json, usando padrão');
}

function persistState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('[Server] Erro ao persistir estado em disco:', err.message);
  }
}

// Broadcast to all connected clients except optional sender
function broadcast(message, senderWs = null) {
  const payload = typeof message === 'string' ? message : JSON.stringify(message);
  wss.clients.forEach(client => {
    if (client !== senderWs && client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// WebSocket handling
wss.on('connection', (ws) => {
  // Send current state immediately on connect
  ws.send(JSON.stringify({ type: 'sync_state', state }));

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'sync_state' && msg.state) {
        state = { ...state, ...msg.state };
        persistState();
        // Broadcast to all other clients
        broadcast({ type: 'sync_state', state }, ws);
      }
    } catch (e) {
      console.error('[Server] Erro ao processar mensagem WebSocket:', e.message);
    }
  });
});

// REST API endpoints for Vercel / HTTP polling compatibility
app.get('/api/state', (req, res) => {
  res.json({
    success: true,
    state,
    timestamp: Date.now(),
    clients: wss.clients.size
  });
});

app.post('/api/state', (req, res) => {
  const body = req.body || {};
  if (body.state) {
    state = { ...state, ...body.state };
    persistState();
    broadcast({ type: 'sync_state', state });
  }
  res.json({ success: true, state, timestamp: Date.now() });
});

// Reset endpoint
app.post('/api/reset', (req, res) => {
  state = getDefaultState();
  persistState();
  broadcast({ type: 'sync_state', state });
  res.json({ success: true, message: 'Estado resetado com sucesso', state });
});

// Explicit static asset routes (ensures Vercel @vercel/nft bundles them and sets proper Content-Type)
app.get('/tailwind.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.sendFile(path.join(__dirname, 'tailwind.js'));
});

app.get('/viet.webp', (req, res) => {
  res.setHeader('Content-Type', 'image/webp');
  res.sendFile(path.join(__dirname, 'viet.webp'));
});

// Root handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  ModeraNet (Yohanan & Israel) no ar!`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Modo:    Local / Offline com WebSocket e HTTP Sync`);
  console.log(`====================================================`);
});
