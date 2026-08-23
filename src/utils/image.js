export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.readAsDataURL(file);
  });

// Retorna uma mensagem de erro ou null quando a imagem é válida.
export const validateImageFile = (file) => {
  if (!file) return "Nenhum arquivo selecionado.";
  if (!file.type.startsWith("image/")) return "Selecione somente um arquivo de imagem.";
  if (file.size > MAX_IMAGE_SIZE) return "A imagem deve ter no máximo 2 MB.";
  return null;
};
