<div align="center">

# 🪐 DevOrbit

**A comunidade que orbita em torno do código.**

Plataforma de comunidade para desenvolvedores: feed de publicações, catálogo de
cursos com progresso e XP, chat, perfil com insígnias e um painel administrativo
completo — tudo em React.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![styled--components](https://img.shields.io/badge/styled--components-5-DB7093?logo=styledcomponents&logoColor=white&labelColor=20232a)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white&labelColor=20232a)
![json-server](https://img.shields.io/badge/API-json--server-00E676?labelColor=20232a)
![Licença](https://img.shields.io/badge/uso-estudo-8B5CF6?labelColor=20232a)

</div>

---

## ✨ Funcionalidades

### Para quem usa
- 🔐 **Conta** — cadastro, login, recuperação de senha (com validação de formulário)
- 📰 **Feed** — publicações de cursos com curtir/descurtir, salvar, compartilhar e comentar (com data)
- 🔎 **Busca em tempo real** — por curso, título, descrição, autor, tag ou tecnologia, sem recarregar a página
- 🎓 **Cursos** — catálogo com filtros por categoria e nível, matrícula e progresso
- ⭐ **XP e insígnias** — cada inscrição rende XP e uma insígnia no perfil; concluir o curso ganha selo ✓
- 💬 **Chat da comunidade** — conversa em tempo real na lateral do feed
- 👤 **Perfil completo** — foto, capa, bio, habilidades, projetos e estatísticas
- 🕐 **Horários vivos** — "Agora mesmo", "Há 5 minutos"… atualizados sozinhos a cada minuto
- 📱 **Responsivo** — testado de 1920px a 375px, sem scroll horizontal

### Para quem administra (`/admin`)
- 📊 **Visão geral** — usuários, cursos, publicações, curtidas, comentários, matrículas e conclusões
- 🎓 **Cursos** — criar, editar e excluir (nome, descrição, banner, tags, nível, categoria, status)
- 📰 **Publicações** — CRUD completo do feed, com autor, curso vinculado e banner (pronto, URL ou upload)
- 👥 **Usuários** — cadastrar, editar, definir permissão (admin/usuário) e excluir
- 🏆 **Top 5 da semana** — pontuação semanal editável, ranking calculado na hora
- 🛡️ **Moderação** — todos os comentários da plataforma em um só lugar, com exclusão

Tudo que o admin altera aparece **imediatamente** para os usuários — sem mexer em código.

---

## 🚀 Como rodar

```bash
git clone https://github.com/EVI-DEV1/devorbit.git
cd devorbit
npm install
npm run dev        # app (localhost:3000) + API json-server (localhost:8001)
```

Ou em dois terminais separados:

```bash
npm run api        # API json-server na porta 8001
npm start          # app React na porta 3000
```

> 💡 **Sem a API?** O app continua funcionando: usa os dados de `src/data` e salva
> as alterações no `localStorage`. O painel admin mostra no topo se está
> conectado à API ou não.

### Restaurar os dados iniciais

```bash
npm run seed       # regenera o db.json a partir de src/data (backup em db.json.bak)
```

---

## 🔑 Acessos de teste

| Perfil        | E-mail                 | Senha    |
| ------------- | ---------------------- | -------- |
| Administrador | `eviofc4@gmail.com`    | `123456` |
| Usuário       | `isabela@devorbit.dev` | `123456` |

Ou crie sua própria conta em **Criar conta**.

---

## 🔒 Permissões

```text
ADMINISTRADOR ──► /admin/*   alimenta e gerencia a plataforma
USUÁRIO       ──► /feed /courses /profile   consome e interage
```

- Rotas internas exigem login (`PrivateRoute`)
- Rotas `/admin/*` exigem `role: "admin"` (`AdminRoute`)
- Usuário comum que digitar `/admin` na URL é devolvido ao feed
- A sessão nunca guarda a senha

---

## 🗂️ Estrutura

```text
src/
├── assets/          banners dos cursos, avatar padrão
├── components/      Header, Card, CourseCard, ProfileDrawer, Modal, Logo, ...
├── contexts/
│   ├── DataContext  posts, cursos e usuários (API → cache local → seed)
│   └── AuthContext  sessão, login, cadastro e permissões
├── data/            seed: posts.js, courses.js, users.js, banners.js
├── hooks/           useCourseProgress (XP/progresso), useNow (horários vivos)
├── pages/
│   ├── home, login, signup, ForgotPassword
│   ├── feed, courses, Profile, EditProfile
│   └── admin/       Dashboard, Cursos, Publicações, Usuários, Top 5, Comentários
├── routes/          mapa de rotas + guards
├── services/        api (axios) e storage (localStorage)
├── styles/          theme.js (identidade visual) e global.js
└── utils/           date, search, image, validation
```

---

## 🎨 Identidade visual

| Elemento   | Valor                                        |
| ---------- | -------------------------------------------- |
| Nome       | **DevOrbit**                                 |
| Fundo      | `#120F1C` / superfícies `#1C1828` `#252036`  |
| Ação       | Verde `#00E676`                              |
| Destaque   | Violeta `#8B5CF6` (área administrativa)      |
| Tipografia | **Sora** (títulos) + **Inter** (texto)       |
| Logo       | SVG próprio — planeta de código com órbita   |

Todos os tokens vivem em [`src/styles/theme.js`](src/styles/theme.js).

---

## 🔌 Pronto para um backend real

Os componentes só conversam com `DataContext` e `AuthContext`. Para trocar o
json-server por uma API real, basta ajustar [`src/services/api.js`](src/services/api.js)
e as funções `remote*` do [`DataContext`](src/contexts/DataContext.jsx) — nenhuma
tela precisa mudar.

> ⚠️ Projeto de estudo: as senhas do seed ficam em texto plano no `db.json`
> (limitação do json-server). Em produção, use hash + variáveis de ambiente.

---

## 🛣️ Próximos passos

- [ ] Backend real (Node/Express ou Supabase) com senhas criptografadas
- [ ] Player de aulas dentro da plataforma
- [ ] Notificações de novas publicações
- [ ] Modo claro

---

<div align="center">

Feito com 💚 por **Evi Vitoriano** — [github.com/EVI-DEV1](https://github.com/EVI-DEV1)

</div>
