// Busca textual sem acentuação e sem diferenciar maiúsculas.

// Faixa Unicode dos acentos combinantes (U+0300 a U+036F).
const DIACRITICS = new RegExp("[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f) + "]", "g");

export const normalizeText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .trim();

// Verifica se o termo aparece em qualquer um dos campos informados.
export const matchesSearch = (term, fields) => {
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return true;

  const haystack = fields
    .flat()
    .filter(Boolean)
    .map(normalizeText)
    .join(" ");

  return haystack.includes(normalizedTerm);
};

export const searchPosts = (posts, term) =>
  posts.filter((post) =>
    matchesSearch(term, [post.user, post.title, post.description, post.tags])
  );

export const searchCourses = (courses, term) =>
  courses.filter((course) =>
    matchesSearch(term, [
      course.name,
      course.description,
      course.author,
      course.category,
      course.level,
      course.tags,
    ])
  );

export const searchUsers = (users, term) =>
  users.filter((user) =>
    matchesSearch(term, [user.name, user.email, user.profession, user.skills])
  );
