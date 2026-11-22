import { Post, DebateQuestion } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorName: 'Prof. Renato (História)',
    authorHandle: '@historia_e_memoria',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorBio: 'Educador e pesquisador de conflitos do século XX',
    targetCategory: 'História & Documentação',
    originalContent: 'A fotografia "The Terror of War" (1972), de Nick Ut, mostrando a menina Kim Phuc correndo nua após bombardeio de napalm no Vietnã, é um dos maiores registros antibelicistas da humanidade. Negar essa imagem às novas gerações é apagar o horror da guerra sob o falso pretexto de pudor.',
    mediaUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    createdAt: 'há 10 minutos',
    likes: 42,
    commentsCount: 18,
    moderationStatus: 'moderated',
    moderationType: 'deletion',
    moderatorRole: 'IA Algorítmica',
    moderatorJustification: 'Violação dos Padrões da Comunidade: Tolerância zero para exibição de nudez de menores de idade, visando prevenir qualquer forma de exploração sexual infantil (ECA art. 241).',
    moderatedAt: 'há 8 minutos',
    authorArguments: [
      'Valor histórico, jornalístico e educativo insubstituível (reconhecido mundialmente pelo Prêmio Pulitzer).',
      'Contextualização: a foto não tem caráter erótico ou sensual, mas de denúncia humanitária.',
      'O caso do Vietnã no Facebook (citado por Poletto & Morais, 2022) provou que IAs cometem censura indevida por incapacidade de ler contexto.'
    ],
    suggestedModeratorArguments: [
      'Algoritmos não podem correr riscos em casos de imagens de menores sem roupas.',
      'Princípio da Precaução: a plataforma responde civil e penalmente se tolerar imagens de menores desnudados.',
      'A regra geral deve ser uniforme e rígida para evitar brechas exploratórias.'
    ],
    votesLegitimateProtection: 8,
    votesUndueCensorship: 26,
  },
  {
    id: 'post-2',
    authorName: 'Coletivo Saúde Jovem SUS',
    authorHandle: '@prevencao_juventude',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorBio: 'Informações sobre saúde pública e direitos sexuais para jovens',
    targetCategory: 'Saúde Pública & Educação',
    originalContent: 'Atenção adolescentes: o uso de preservativo previne HIV, Sífilis e HPV, além de gravidez não planejada. Não tenha vergonha de retirar camisinhas gratuitamente em qualquer UBS. Converse com seu parceiro/a sobre consentimento!',
    createdAt: 'há 25 minutos',
    likes: 85,
    commentsCount: 9,
    moderationStatus: 'moderated',
    moderationType: 'filtering',
    moderatorRole: 'IA Algorítmica',
    moderatorJustification: 'Filtragem algorítmica aplicada (Shadowban): Conteúdo rebaixado na timeline e oculto do feed de contas com idade declarada inferior a 16 anos por abordar sexualidade.',
    moderatedAt: 'há 20 minutos',
    authorArguments: [
      'Garantia do direito à saúde e à informação preventiva assegurada pelo ECA (art. 7º e 11).',
      'A filtragem algorítmica (shadowban) é uma censura invisível: o jovem nunca recebe a informação preventiva vital.',
      'Grimmelmann (2015) alerta que a filtragem produz o mesmo efeito da exclusão, porém sem transparência ou aviso ao autor.'
    ],
    suggestedModeratorArguments: [
      'A educação sexual cabe primariamente aos pais e responsáveis, não a posts abertos de redes sociais.',
      'Evitar a hipersexualização precoce no feed geral de menores.',
      'Políticas de anunciantes restringem publicações com temas sexuais explícitos ou implícitos.'
    ],
    votesLegitimateProtection: 11,
    votesUndueCensorship: 29,
  },
  {
    id: 'post-3',
    authorName: 'Estudante Anônimo',
    authorHandle: '@voz_escolar_desabafo',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    authorBio: 'Espaço de escuta sobre vivências escolares',
    targetCategory: 'Bullying & Convivência Escolar',
    originalContent: 'Não aguento mais ser humilhado no 9º ano B pelo Pedro e pelo Lucas da sala 12. Eles criaram figurinhas zombando da minha aparência física e espalharam no grupo de WhatsApp da escola. A direção não faz nada!',
    editedContent: 'Não aguento mais ser humilhado no 9º ano por [NOMES OCULTADOS PELA MODERAÇÃO]. Criaram figurinhas zombando da minha aparência física e espalharam em grupos. A direção precisa agir!',
    createdAt: 'há 45 minutos',
    likes: 64,
    commentsCount: 22,
    moderationStatus: 'moderated',
    moderationType: 'editing',
    moderatorRole: 'Moderador Humano',
    moderatorJustification: 'Moderação de Edição: Os nomes dos menores acusados foram expurgados para resguardar a honra e imagem de adolescentes (ECA art. 17 e 18), mantendo o desabafo público.',
    moderatedAt: 'há 30 minutos',
    authorArguments: [
      'Desabafo legítimo de uma vítima de cyberbullying recorrente pedindo socorro.',
      'Alterar o texto original de alguém compromete a integridade da denúncia e a verdade do autor.',
      'O moderador age como editor da verdade alheia (Grimmelmann, 2015: "o moderador rejeita a verdade do autor e a substitui pela sua").'
    ],
    suggestedModeratorArguments: [
      'Proteção contra linchamento virtual de outros menores acusados sem direito de resposta.',
      'O Estatuto da Criança e do Adolescente proíbe a exposição vexatória de qualquer menor de idade.',
      'A edição preserva a queixa sem cometer calúnia/difamação pública com repercussão irreversível.'
    ],
    votesLegitimateProtection: 31,
    votesUndueCensorship: 9,
  },
  {
    id: 'post-4',
    authorName: 'Clarice (16 anos)',
    authorHandle: '@clarice_versos',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    authorBio: 'Escrevo poesia para organizar o caos interno',
    targetCategory: 'Saúde Mental & Literatura',
    originalContent: 'Às vezes o peso no peito parece insuportável e a vontade de desaparecer consome meus dias... Escrever tem sido minha única saída. Se você também se sente assim, ligue 188 (CVV). Você não está sozinho.',
    createdAt: 'há 1 hora',
    likes: 112,
    commentsCount: 34,
    moderationStatus: 'moderated',
    moderationType: 'annotation',
    moderatorRole: 'Equipe de Trust & Safety',
    moderatorJustification: 'Anotação Institucional Adicionada: "⚠️ AVISO DE GATILHO: Este conteúdo menciona ideação suicida ou sofrimento psicológico. Se precisar de apoio imediato, procure o CVV no 188 ou uma rede de apoio."',
    moderatedAt: 'há 50 minutos',
    authorArguments: [
      'A autora foi responsável: compartilhou sua dor de forma artística e indicou canais de apoio (CVV 188).',
      'Falar de dor e saúde mental reduz o estigma e salva vidas entre adolescentes.',
      'A anotação contextual é a moderação menos invasiva, pois preserva o texto original intacto.'
    ],
    suggestedModeratorArguments: [
      'Risco do "Efeito Werther" (contágio de automutilação e ideação suicida entre jovens vulneráveis).',
      'Dever de cuidado reforçado das plataformas em temas de depressão infantojuvenil.',
      'O rótulo alerta os responsáveis e direciona a ajuda profissional antes que seja tarde.'
    ],
    votesLegitimateProtection: 35,
    votesUndueCensorship: 5,
  },
  {
    id: 'post-5',
    authorName: 'Grêmio Estudantil Livre',
    authorHandle: '@gremio_estudantil',
    authorAvatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&auto=format&fit=crop&q=80',
    authorBio: 'Representação discente e debate cívico escolar',
    targetCategory: 'Política & Cidadania Jovem',
    originalContent: 'MANIFESTO: Somos contra o projeto de lei que proíbe debates sobre cidadania e direitos humanos nas escolas! Jovens de 16 anos já votam no Brasil. Não aceitaremos mordaça em nossos professores e colegas!',
    createdAt: 'há 2 horas',
    likes: 194,
    commentsCount: 57,
    moderationStatus: 'moderated',
    moderationType: 'synthesis',
    moderatorRole: 'IA Algorítmica',
    moderatorJustification: 'Moderação por Síntese: Conteúdo agrupado no painel oficial da plataforma: "Tópico em Discussão: Reforma Curricular e Legislação Educacional - Clique para ver o resumo dos argumentos pró e contra elaborados por especialistas."',
    moderatedAt: 'há 1 hora e meia',
    authorArguments: [
      'Jovens são cidadãos com direitos políticos plenos (CF/88 garante alistamento eleitoral facultativo aos 16 anos).',
      'A síntese neutraliza a força da manifestação estudantil espontânea, transformando protesto em burocracia.',
      'Poletto & Morais (2022) alertam que a síntese reduz a pluralidade de vozes à ótica do sintetizador.'
    ],
    suggestedModeratorArguments: [
      'Evitar a polarização tóxica e a instrumentalização ideológica de estudantes em ambiente escolar.',
      'Proporcionar um ambiente seguro e equilibrado com argumentos pedagógicos e plurais.',
      'Reduzir conflitos e ofensas entre turmas divergentes nas redes sociais.'
    ],
    votesLegitimateProtection: 14,
    votesUndueCensorship: 28,
  },
  {
    id: 'post-6',
    authorName: 'Matheus & Galera do Discord',
    authorHandle: '@shitpost_da_madruga',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    authorBio: 'Memes, sarcasmo e piadas internas',
    targetCategory: 'Humor Jovem & Ironia',
    originalContent: 'Aquele momento que o professor passa 50 páginas de PDF para o fim de semana: "Eu vou coringar e queimar a escola toda se ele me cobrar isso na segunda kkkkk"',
    mediaUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&auto=format&fit=crop&q=80',
    createdAt: 'há 3 horas',
    likes: 77,
    commentsCount: 15,
    moderationStatus: 'moderated',
    moderationType: 'formatting',
    moderatorRole: 'IA Algorítmica',
    moderatorJustification: 'Formatação Restritiva: A imagem e o texto foram borrados com tela de aviso prévio: "⚠️ Conteúdo Sensível: Menção a violência. Clique para confirmar que tem mais de 18 anos para exibir".',
    moderatedAt: 'há 2 horas',
    authorArguments: [
      'Gíria e hipérbole humorística clássica de jovens na internet ("coringar", "queimar tudo"); sem intenção real.',
      'A formatação com barreira de 18+ destrói o engajamento humorístico e trata metáforas banais como ameaças terroristas.',
      'A moderação automatizada falha por falta de compreensão semiótica da linguagem jovem.'
    ],
    suggestedModeratorArguments: [
      'Histórico real de ataques em escolas exige tolerância zero com menções a incêndio ou violência escolar.',
      'A formatação preserva o post (não exclui), mas garante que menores vulneráveis não sejam impactados sem consentimento.',
      'Princípio de segurança pública e precaução contra ameaças mascaradas de brincadeira.'
    ],
    votesLegitimateProtection: 24,
    votesUndueCensorship: 17,
  }
];

export const DEBATE_QUESTIONS: DebateQuestion[] = [
  {
    id: 1,
    title: 'O Dilema do Over-blocking (Bloqueio Preventivo por IA)',
    shortDescription: 'Até que ponto posts educativos ou históricos podem ser censurados por precaução?',
    fullQuestion: 'Quando leis e tribunais impõem sanções pesadas às plataformas pela exposição de menores a conteúdos inadequados, as empresas tendem a calibrar seus filtros de IA no modo mais restritivo possível (over-blocking). Até que ponto é aceitável que posts educativos, artísticos ou jornalísticos legítimos sejam censurados "por engano" como preço a pagar pela proteção da infância?',
    theoreticalBasis: 'Poletto & Morais (2022) destacam que o volume bilionário de dados obriga o uso de IA, gerando opacidade, enviesamento e falsos positivos (ex: remoção da foto histórica da menina nua no Vietnã pelo Facebook).',
    pointsForProtection: [
      'A prioridade absoluta da infância e adolescência (art. 227 da CF/88 e ECA) se sobrepõe a eventuais inconveniências de remoção temporária.',
      'A velocidade do contágio digital impede que se espere um dano consumar-se antes de agir.',
      'Melhor um post legítimo suspenso temporariamente do que uma criança abusada ou exposta.'
    ],
    pointsForFreedom: [
      'O "chilling effect" (efeito inibidor) paralisa a livre circulação de informações e a memória coletiva.',
      'Empresas privadas passam a praticar censura prévia automatizada para blindar seus lucros de multas estatais.',
      'Falta de due process (devido processo legal) e ausência de contraditório ao usuário antes da exclusão.'
    ],
    votesOptionA: 12,
    votesOptionB: 18
  },
  {
    id: 2,
    title: 'A Censura Invisível da Filtragem Algorítmica (Shadowban)',
    shortDescription: 'Reduzir o alcance secretamente é moderação técnica legítima ou censura sem defesa?',
    fullQuestion: 'A técnica de filtragem (filtering), conforme Grimmelmann (2015), não apaga a postagem, mas rebaixa seu alcance na timeline a quase zero. Quando uma rede social aplica shadowban em conteúdos sobre sexualidade, saúde reprodutiva ou religião sob o pretexto de proteger jovens, sem sequer notificar o autor, isso é moderação protetiva ou censura velada inconstitucional?',
    theoreticalBasis: 'Grimmelmann (2015) e Poletto & Morais (2022) demonstram que a filtragem gera o mesmo resultado prático da exclusão, porém sem transparência e sem permitir recurso ao usuário.',
    pointsForProtection: [
      'Protege menores de temas complexos sem gerar conflito direto com o criador do post.',
      'A linha do tempo já é naturalmente filtrada pelo interesse do usuário e adequação etária.',
      'É prerrogativa do modelo de negócios da plataforma organizar o fluxo do seu próprio feed.'
    ],
    pointsForFreedom: [
      'Viola frontalmente os Princípios de Santa Clara (exigência de transparência, notificação e recurso).',
      'O autor é punido sem saber o motivo e sem qualquer chance de contestar o rebaixamento.',
      'Gera desinformação: adolescentes ficam desprovidos de orientações preventivas de saúde pública.'
    ],
    votesOptionA: 8,
    votesOptionB: 24
  },
  {
    id: 3,
    title: 'Soberania Privada das Big Techs vs. Democracia e Marco Civil',
    shortDescription: 'Quem deve definir os limites da proteção infantil: o Estado ou os Termos de Uso privados?',
    fullQuestion: 'O artigo 19 do Marco Civil da Internet (Lei 12.965/14) exige ordem judicial prévia para responsabilizar plataformas, visando coibir a censura privada. Porém, para proteger menores, muitos defendem o "dever de cuidado" das Big Techs. Quem deve ter o poder final de arbitrar o que é prejudicial a uma criança: juízes em processo legal democrático ou diretores de segurança de empresas multinacionais sediadas no Vale do Silício?',
    theoreticalBasis: 'Poletto & Morais (2022) analisam o Marco Civil da Internet em contraponto com o NetzDG alemão, o Online Harms britânico e o Digital Services Act europeu.',
    pointsForProtection: [
      'O Judiciário é lento demais para a velocidade das redes: uma foto íntima vazada destrói uma vida em minutos.',
      'As próprias plataformas detêm a tecnologia e a capacidade técnica imediata de contenção.',
      'Termos de uso são acordos privados de convivência que todo usuário aceitou ao entrar na rede.'
    ],
    pointsForFreedom: [
      'Monopólio corporativo sobre o discurso público: empresas privadas não possuem legitimidade democrática para ditar a moral social.',
      'Risco de captura política e moral: o que é "prejudicial" muda conforme o governo de plantão ou interesses de anunciantes.',
      'O art. 19 do Marco Civil foi desenhado exatamente para evitar que intermediários se tornem censores do debate público.'
    ],
    votesOptionA: 15,
    votesOptionB: 16
  },
  {
    id: 4,
    title: 'Fim do Anonimato e Coleta de Biometria em Nome da Infância',
    shortDescription: 'Exigir documentos e reconhecimento facial para barrar menores fere a privacidade geral?',
    fullQuestion: 'Diversos países debatem a exigência de verificação rigorosa de idade (por biometria facial ou envio de documentos de identidade) para acessar redes sociais, a fim de impedir que menores acessem conteúdos adultos ou conversem com estranhos. Vale a pena abrir mão do direito ao anonimato e à privacidade de toda a sociedade em troca da blindagem digital dos menores?',
    theoreticalBasis: 'Poletto & Morais (2022) e Magrani (2019) alertam sobre os riscos de vigilância massiva, vazamento de dados e perda de garantias individuais fundamentais no ambiente digital.',
    pointsForProtection: [
      'É o único método tecnicamente eficaz para frear aliciadores, pedofilia e exposição prematura a pornografia.',
      'No mundo físico, menores já precisam de RG para entrar em certos estabelecimentos; a internet não pode ser terra sem lei.',
      'A proteção de vulneráveis é dever compartilhado entre família, sociedade e Estado (CF art. 227).'
    ],
    pointsForFreedom: [
      'Cria um banco de dados centralizado e perigoso com a identidade real e biometria de cada cidadão.',
      'Acaba com a possibilidade de denúncias anônimas, jornalismo investigativo e manifestação dissidente segura.',
      'Afastamento da responsabilidade parental: transfere-se para a vigilância estatal/corporativa o papel de cuidar dos filhos.'
    ],
    votesOptionA: 10,
    votesOptionB: 20
  },
  {
    id: 5,
    title: 'Proteção Integral (ECA) vs. Liberdade de Expressão dos Jovens',
    shortDescription: 'Adolescentes são sujeitos de direitos políticos ou apenas objetos de tutela?',
    fullQuestion: 'O ECA considera adolescentes como sujeitos plenos de direitos e a Constituição faculta o voto aos 16 anos. Quando plataformas aplicam regras severas que restringem a participação de jovens em debates políticos, causas sociais e temas de sexualidade sob o pretexto de "mantê-los protegidos de estresse e toxicidade", estamos protegendo a infância ou infantilizando e amordaçando futuros cidadãos?',
    theoreticalBasis: 'O conflito entre a Doutrina da Proteção Integral (art. 227 CF) e as liberdades civis, políticas e de expressão dos adolescentes na esfera pública digital.',
    pointsForProtection: [
      'O cérebro do adolescente ainda está em desenvolvimento neurobiológico, mais vulnerável a manipulação emocional e polarização extrema.',
      'A internet explora a vulnerabilidade psíquica dos jovens para gerar engajamento tóxico e lucrar com tempo de tela.',
      'Proteger não é silenciar, mas garantir que o amadurecimento ocorra em ambiente saudável e sem violência.'
    ],
    pointsForFreedom: [
      'Tutela paternalista excessiva afasta os jovens da vida democrática e da formação crítica.',
      'Jovens lideraram grandes transformações sociais e ambientais; limitar suas vozes é empobrecer o espaço público.',
      'O direito de se expressar e ser ouvido é essencial para a própria dignidade do adolescente (ECA art. 16).'
    ],
    votesOptionA: 13,
    votesOptionB: 19
  }
];
