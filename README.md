# ModeraNet 🛡️📱 — Debate Interativo (Yohanan & Israel)

> **Aplicação Interativa para o Debate da Disciplina de Tecnologia e Sociedade**  
> **Tema Central:** *"O aumento da moderação de conteúdo para proteger menores pode abrir caminho para censura indevida nas redes sociais."*  
> **Referência Teórica Central:**  
> - POLETTO, Álerton Emmanuel; MORAIS, Fausto Santos de. *A moderação de conteúdo em massa por plataformas privadas de redes sociais*. Revista Prisma Jurídico, v. 21, n. 1, p. 108-126, 2022.  
> - GRIMMELMANN, James. *The Virtues of Moderation*. Yale Journal of Law & Technology, v. 17, p. 41-109, 2015.

---

## 🌟 Visão Geral

O **ModeraNet** foi desenvolvido para transformar o debate em uma experiência dinâmica e imersiva com 3 modos integrados:

1. **📱 Modo Aluno (Celular):**
   - Seleção do próprio nome na lista oficial dos **23 alunos** da turma.
   - Sorteio automático nas duas bancadas: **🛡️ Moderadores (Plataforma)** vs. **👤 Usuários (Defesa de Direitos)**.
   - **📰 Feed do Debate:** Timeline estilo rede social com as 6 técnicas de moderação de Grimmelmann, revelando novos posts conforme o avanço das rodadas.
   - **💬 Chat Secreto da Bancada em Tempo Real:** Canal privado onde apenas os membros da mesma bancada conversam entre si para combinar argumentos e municiar seus porta-vozes.
   - **Votação ao Vivo nos Posts:** `👍 Like (Proteção Legítima)` vs. `👎 Deslike (Censura Indevida)`.
   - **Comentários de Apoio Estratégicos:** Comentários com argumentos jurídicos/sociológicos exclusivos para cada lado.
   - **🏆 Ranking de Pontos:** Mural com pontos atribuídos pelos condutores durante a participação.

2. **🖥️ Modo Apresentação (Projetor / Datashow):**
   - Visual limpo e imponente com o post em destaque (Antes vs. Depois da moderação).
   - **Cronômetro gigante** de tempo de fala (1m30s / 1m00s).
   - Destaque dos **Porta-Vozes Sorteados** para aquela rodada.
   - **Placar ao vivo da votação da turma** (porcentagem e barra gráfica em tempo real).

3. **🎛️ Modo Orquestrador (Condutores: Yohanan & Israel):**
   - Avanço das 6 rodadas (adiciona posts na timeline dos alunos sem apagar o histórico).
   - Alternância entre **Post Original (Antes)** e **Post Moderado (Depois)**.
   - Controle da urna (abrir, fechar e zerar votação).
   - **Sorteio das Bancadas e Porta-Vozes da Rodada**.
   - **Monitoramento em tempo real dos dois chats privados**.
   - **Busca rápida de alunos e atribuição de pontos (+1 Pt)**.
   - *Acesso discreto:* basta abrir com `?admin=yohanan-israel` ou tocar 5 vezes no logotipo **"M"** no topo e digitar a senha `debate2026`.

---

## ⚡ Como Rodar Localmente e 100% Offline com Docker

A aplicação foi preparada com assets locais (`tailwind.js`, `viet.webp`) e um servidor Node.js com **WebSocket**, funcionando perfeitamente **sem necessidade de internet** (mesmo em redes Wi-Fi locais ou roteadas pelo celular).

```bash
# 1. Na pasta do projeto:
docker compose up -d --build

# 2. Acesse no navegador:
# http://localhost:3000
```

> **Dica para Sala de Aula Offline:**  
> Conecte o notebook e os celulares no mesmo ponto de acesso Wi-Fi (ou no roteador Wi-Fi do seu celular, mesmo com dados móveis desativados).  
> Descubra o IP local do seu notebook com `hostname -I` (ex: `192.168.1.105`).  
> Todos os alunos acessam pelo navegador do celular: `http://192.168.1.105:3000`.  
> Os votos, o chat em tempo real e o avanço das rodadas sincronizam instantaneamente via WebSocket (< 5ms) com persistência local em `data/state.json`.

Para parar o container:
```bash
docker compose down
```

---

## ☁️ Como Hospedar na Vercel

O projeto foi configurado com rota serverless compatível com a Vercel (`api/state.js` + `vercel.json`):

1. **Suba para o GitHub:**
   ```bash
   git push origin main
   ```

2. **Na Vercel ([vercel.com](https://vercel.com)):**
   - Clique em **"Add New Project"** e selecione o repositório `SantanaIsrael/App-debate`.
   - O projeto utiliza arquivos estáticos com a função serverless `/api/state`, dispensando qualquer configuração de build.
   - Clique em **"Deploy"**.

3. O link público HTTPS gerado (ex: `https://app-debate.vercel.app`) sincroniza os alunos em tempo real via polling HTTP suave a cada 1.2 segundos!

---

## 📚 As 6 Técnicas de Moderação no App (Poletto & Morais / Grimmelmann)

1. **1. Exclusão (*Deletion*):** Remoção total (Ex: foto histórica do Vietnã de Nick Ut / falso positivo de IA).
2. **2. Edição (*Editing*):** Modificação direta da essência da postagem (Ex: plataforma suaviza desabafo sobre automutilação e bullying na escola).
3. **3. Anotação (*Annotation*):** Selos institucionais de sensibilidade (Ex: rótulo de "conteúdo nocivo" em debates sobre vigilância parental).
4. **4. Síntese (*Synthesis*):** Agregação em resumos oficiais da rede (Ex: vídeos virais substituídos por aviso médico padronizado).
5. **5. Filtragem (*Filtering / Shadowban*):** Rebaixamento invisível de alcance no feed (Ex: convocação de assembleia estudantil com alcance cortado em 99%).
6. **6. Formatação (*Formatting*):** Tratamento visual e barreira de idade (+18) (Ex: reportagem jornalística de extorsão contra alunos desfocada).
