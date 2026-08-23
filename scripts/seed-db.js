/* eslint-disable */
// Gera o db.json (json-server) a partir do seed em src/data.
// Uso: npm run seed
//
// Os arquivos de seed são módulos ES sem dependências (apenas dados),
// então basta remover os `export` e avaliar o conteúdo.

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "src", "data");

const loadSeed = (file, exportName) => {
  const source = fs
    .readFileSync(path.join(dataDir, file), "utf8")
    .replace(/^export\s+const/gm, "const");

  return new Function(`${source}\n;return ${exportName};`)();
};

const db = {
  users: loadSeed("users.js", "users"),
  courses: loadSeed("courses.js", "courses"),
  posts: loadSeed("posts.js", "posts"),
};

const target = path.join(root, "db.json");

if (fs.existsSync(target)) {
  fs.copyFileSync(target, `${target}.bak`);
  console.log("Backup salvo em db.json.bak");
}

fs.writeFileSync(target, JSON.stringify(db, null, 2) + "\n");

console.log(
  `db.json gerado: ${db.users.length} usuários, ${db.courses.length} cursos, ${db.posts.length} posts.`
);
