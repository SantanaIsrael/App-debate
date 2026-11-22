# ModeraRede 🛡️📱

> **Aplicação Interativa para Apresentação de Debate Acadêmico**  
> **Tema:** *"O aumento da moderação de conteúdo para proteger menores pode abrir caminho para censura indevida nas redes sociais."*  
> **Referência Teórica Central:**  
> - POLETTO, Álerton Emmanuel; MORAIS, Fausto Santos de. *A moderação de conteúdo em massa por plataformas privadas de redes sociais*. Prisma Jurídico, v. 21, n. 1, p. 108-126, 2022.  
> - GRIMMELMANN, James. *The Virtues of Moderation*. Yale Journal of Law & Technology, v. 17, p. 41-109, 2015.

---

## 🌟 Sobre a Aplicação

O **ModeraRede** simula o feed de uma rede social moderna (Instagram/Twitter/Threads) onde a turma da faculdade interage em tempo real durante a apresentação do debate.

### 🎭 Papéis na Dinâmica da Sala:
1. **👤 Perfil Autor (Alunos):** Podem publicar no feed escolhendo entre **6 dilemas pré-definidos** ou criando postagens livres. Cada post já carrega suas **Cartas de Argumentos** jurídicos e sociológicos para defesa.
2. **🛡️ Perfil Moderador (Bancada/Alunos):** Atuam como a plataforma (ou IA algorítmica), decidindo qual das **6 técnicas de moderação de Grimmelmann** aplicar e justificando com base no ECA, Marco Civil ou Termos de Uso.
3. **👁️ Perfil Auditor / Turma (Votação da Sala):** Todos os alunos votam pelo celular em cada post moderado:  
   🟢 **Proteção Legítima** vs. 🔴 **Censura Indevida**, atualizando o **Termômetro da Sala** em tempo real!
4. **🖥️ Modo Telão Projetor:** Interface expandida para exibir no projetor da sala com o feed rolando, o termômetro ao vivo e o QR Code no topo para acesso rápido dos colegas.

---

## 📚 Os 6 Tipos de Moderação (Grimmelmann, 2015) Presentes no App:

1. **Exclusão (*Deletion*):** Remoção total da publicação (Ex: o caso da foto do Vietnã no Facebook; falsos positivos de IA).
2. **Edição (*Editing*):** Modificação direta do texto do autor pelo moderador (Ex: expurgar nomes de menores em acusações de bullying).
3. **Anotação (*Annotation*):** Selos institucionais de advertência ou aviso de sensibilidade (Ex: alerta em posts sobre saúde mental).
4. **Síntese (*Synthesis*):** Agregação em painéis institucionais neutros da plataforma (Ex: resumos de debates políticos de grêmios estudantis).
5. **Filtragem (*Filtering*):** Rebaixamento invisível de alcance algorítmico (*Shadowban*) na timeline (Ex: censura invisível de campanhas de DST/saúde para menores).
6. **Formatação (*Formatting*):** Tratamento visual restritivo (desfocar fotos ou exigir clique de confirmação de 18+ em memes/ironias).

---

## 🚀 Como Executar com Docker (Local / Notebook)

Certifique-se de que o Docker está instalado e em execução no seu computador:

```bash
# 1. Na pasta do projeto, suba o container:
docker compose up --build

# 2. Acesse no navegador:
# http://localhost:3000
```

> **Dica para Sala de Aula:** Se o notebook estiver no Wi-Fi da faculdade (ou no roteador do seu próprio celular), os alunos podem acessar pelo IP local do seu notebook (ex: `http://192.168.1.105:3000`).

---

## ☁️ Como Fazer o Deploy no Vercel (Recomendado para Celulares 4G/5G)

Fazer o deploy no Vercel permite que qualquer aluno acesse instantaneamente mesmo usando o 4G/5G do próprio celular:

1. **Suba as alterações para o seu repositório GitHub:**
   ```bash
   git add .
   git commit -m "feat: implementacao completa do simulador ModeraRede com docker e vercel"
   git push origin main
   ```

2. **No Vercel (https://vercel.com):**
   - Faça login com sua conta do GitHub.
   - Clique em **"Add New Project"** ➔ Selecione o repositório **`SantanaIsrael/App-debate`**.
   - O Vercel detectará o framework **Next.js** automaticamente.
   - Clique em **"Deploy"**.

3. **Pronto!** Em cerca de 1 minuto o Vercel fornecerá um link público seguro HTTPS (ex: `app-debate-moderacao.vercel.app`).
   - Abra esse link no notebook conectado ao projetor.
   - Clique no ícone de **QR Code** no topo do app para projetar na parede da sala.
   - Todos os colegas apontam a câmera e já estão participando!

---

## ❓ As 5 Perguntas de Ouro Embutidas no App

O app possui uma gaveta interativa com as **5 perguntas centrais**, com cronômetro de 2 minutos para cada rodada e placar de votos:

1. **O Dilema do Over-blocking e a Moderação Preventiva por IA:** Até que ponto conteúdos educativos, artísticos ou jornalísticos podem ser censurados "por engano" como preço a pagar pela proteção de menores?
2. **A Censura Invisível da Filtragem Algorítmica (Shadowban):** Reduzir o alcance sem avisar o usuário é moderação técnica protetiva ou censura velada inconstitucional?
3. **Soberania Privada das Big Techs vs. Democracia e Marco Civil:** Quem deve definir o que é prejudicial: juízes democráticos (art. 19 do Marco Civil) ou diretores privados das plataformas multinacionais?
4. **Fim do Anonimato e Coleta de Biometria em Nome da Infância:** Exigir RG ou reconhecimento facial para navegar na internet não acaba com a privacidade e vigilância de toda a sociedade?
5. **Proteção Integral (ECA) vs. Liberdade de Expressão dos Jovens:** Adolescentes de 16 anos (que já votam no Brasil) são sujeitos de direitos políticos ou apenas objetos de tutela paternalista?

---

## ⏱️ Roteiro Sugerido para a Apresentação (30 minutos)

* **00 - 05 min:** Abertura com o conceito de moderação e projeção do **QR Code** para a turma entrar.
* **05 - 15 min:** Scroll nos casos práticos do feed, mostrando os 6 tipos de moderação de Grimmelmann ao vivo.
* **15 - 25 min:** Abertura para a turma interagir (alunos postam e moderadores aplicam as técnicas ao vivo com justificativas).
* **25 - 30 min:** Votação das Perguntas de Debate no telão e encerramento com os **Princípios de Santa Clara** (Transparência, Contraditório e Recurso).
