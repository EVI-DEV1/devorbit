// Cursos da plataforma (seed).
// O progresso de cada usuário NÃO fica aqui: fica em user.progress
// ({ [courseId]: percentual }), para que vários usuários compartilhem
// o mesmo catálogo.

export const COURSE_LEVELS = ["Iniciante", "Intermediário", "Avançado"];

export const COURSE_CATEGORIES = [
  "Frontend",
  "Backend",
  "Fundamentos",
  "Banco de Dados",
  "Mobile",
  "DevOps",
];

export const COURSE_STATUS = ["Publicado", "Rascunho", "Em breve"];

export const courses = [
  {
    id: 1,
    name: "React",
    bannerKey: "react",
    description:
      "Aprenda os principais conceitos do React: componentes, Hooks, rotas, consumo de APIs e boas práticas para aplicações modernas.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Frontend",
    tags: ["React", "JavaScript", "Frontend"],
    level: "Intermediário",
    status: "Publicado",
    duration: "24h",
    lessons: 48,
    url: "https://www.youtube.com/watch?v=1LhX2u6_BJE&list=PLx4x_zx8csUh752BVDGZkxYpY9lS40fyC&index=1",
  },
  {
    id: 2,
    name: "HTML5",
    bannerKey: "html",
    description:
      "Estruture páginas semânticas e acessíveis dominando as principais tags do HTML5.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Fundamentos",
    tags: ["HTML5", "Semântica", "Acessibilidade"],
    level: "Iniciante",
    status: "Publicado",
    duration: "8h",
    lessons: 20,
    url: "https://www.youtube.com/playlist?list=PLx4x_zx8csUh752BVDGZkxYpY9lS40fyC",
  },
  {
    id: 3,
    name: "CSS3",
    bannerKey: "css",
    description:
      "Crie layouts profissionais e responsivos com Flexbox, Grid, animações e Media Queries.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Frontend",
    tags: ["CSS3", "Flexbox", "Grid"],
    level: "Iniciante",
    status: "Publicado",
    duration: "12h",
    lessons: 30,
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n",
  },
  {
    id: 4,
    name: "JavaScript",
    bannerKey: "javascript",
    description:
      "Domine a linguagem da web: funções, objetos, arrays, promises, async/await e manipulação do DOM.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Frontend",
    tags: ["JavaScript", "ES6", "DOM"],
    level: "Intermediário",
    status: "Publicado",
    duration: "30h",
    lessons: 60,
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1",
  },
  {
    id: 5,
    name: "Lógica de Programação",
    bannerKey: "programacao",
    description:
      "Algoritmos, estruturas de decisão, repetição e funções com exercícios práticos para quem está começando.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Fundamentos",
    tags: ["Lógica", "Algoritmos", "Programação"],
    level: "Iniciante",
    status: "Publicado",
    duration: "16h",
    lessons: 36,
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV",
  },
  {
    id: 6,
    name: "Python",
    bannerKey: "python",
    description:
      "Lógica, listas, dicionários, funções e automações do dia a dia utilizando Python.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Backend",
    tags: ["Python", "Automação", "Backend"],
    level: "Iniciante",
    status: "Publicado",
    duration: "20h",
    lessons: 45,
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6",
  },
  {
    id: 7,
    name: "Java Orientado a Objetos",
    bannerKey: "java",
    description:
      "Construa aplicações robustas aplicando os pilares da Programação Orientada a Objetos em Java.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Backend",
    tags: ["Java", "POO", "Backend"],
    level: "Avançado",
    status: "Publicado",
    duration: "28h",
    lessons: 52,
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dkI2ZdjTwZA4mPMxWTfNSpR",
  },
  {
    id: 8,
    name: "Banco de Dados e SQL",
    bannerKey: "mysql",
    description:
      "Modelagem, consultas, relacionamentos e boas práticas com MySQL.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Banco de Dados",
    tags: ["MySQL", "SQL", "Modelagem"],
    level: "Intermediário",
    status: "Publicado",
    duration: "14h",
    lessons: 32,
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dkBs-795Dsgvau_ekxg8g1r",
  },
  {
    id: 9,
    name: "Node.js",
    bannerKey: "node",
    description:
      "APIs REST com Node.js e Express, autenticação, middlewares e integração com banco de dados.",
    author: "Evi Vitoriano",
    authorAvatar: "/avatars/evi.jpg",
    category: "Backend",
    tags: ["Node.js", "Express", "API"],
    level: "Intermediário",
    status: "Em breve",
    duration: "22h",
    lessons: 40,
    url: "",
  },
];
