# DevOrbit — Comunidade de Desenvolvedores

> A comunidade que orbita em torno do código.

Plataforma de comunidade para desenvolvedores construída em React: feed de
publicações, catálogo de cursos com progresso, curtidas, comentários, chat,
Top 5 da semana, perfil completo e um painel administrativo para alimentar a
plataforma sem mexer no código.

## Como rodar

```bash
npm install
npm run dev        # sobe o app (3000) e a API json-server (8001) juntos
```

Ou separadamente:

```bash
npm run api        # json-server em http://localhost:8001 (db.json)
npm start          # app em http://localhost:3000
```

Se a API não estiver rodando, o app continua funcionando com os dados locais
(seed em `src/data`) e salva as alterações no `localStorage` do navegador.
O painel administrativo mostra no topo se está conectado à API ou não.

### Restaurar os dados iniciais

```bash
npm run seed       # regenera db.json a partir de src/data (faz backup em db.json.bak)
```

## Acessos de teste

| Perfil        | E-mail                | Senha     |
| ------------- | --------------------- | --------- |
| Administrador | `eviofc4@gmail.com`       | `123456`  |
| Usuário       | `isabela@devorbit.dev`| `123456`  |

Qualquer um pode criar uma conta nova em **Criar conta**.

## Permissões

```text
ADMIN    → /admin/*  cria/edita/exclui cursos, publicações, usuários,
                     gerencia o Top 5 e modera comentários
USUÁRIO  → /feed /courses /profile  consome e interage
```

Rotas internas exigem login (`PrivateRoute`); rotas `/admin/*` exigem
`role: "admin"` (`AdminRoute`). Um usuário comum que digitar `/admin` é
devolvido ao feed.

## Estrutura

```text
src/
├── assets/          imagens (banners dos cursos, avatar padrão)
├── components/      Header, Card, CourseCard, TopFive, ProfileDrawer, Modal, ...
├── contexts/
│   ├── DataContext  posts, cursos e usuários (API → cache local → seed)
│   └── AuthContext  sessão, login, cadastro, permissões
├── data/            seed: posts.js, courses.js, users.js, banners.js
├── hooks/           useCourseProgress (progresso e XP do usuário)
├── pages/
│   ├── home, login, signup, ForgotPassword
│   ├── feed, courses, Profile, EditProfile
│   └── admin/       Dashboard, CoursesAdmin, PostsAdmin, UsersAdmin, TopFiveAdmin, CommentsAdmin
├── routes/          mapa de rotas + guards
├── services/        api (axios) e storage (localStorage)
├── styles/          theme.js (identidade visual) e global.js
└── utils/           date, search, image, validation
```

## Identidade visual

- **Nome:** DevOrbit
- **Paleta:** fundo `#120F1C`, superfícies `#1C1828` / `#252036`,
  verde `#00E676` (ação), violeta `#8B5CF6` (administração/destaque)
- **Tipografia:** Sora (títulos) e Inter (texto)
- **Logo/favicon:** SVG em `src/components/Logo` e `public/favicon.svg`

Todos os tokens vivem em `src/styles/theme.js`.

## Preparado para backend real

Os componentes só conversam com `DataContext`/`AuthContext`. Para trocar o
json-server por uma API real basta ajustar `src/services/api.js` e as funções
`remote*` em `src/contexts/DataContext.jsx`.
