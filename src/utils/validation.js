export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailRules = {
  required: 'E-mail é obrigatório',
  pattern: { value: EMAIL_REGEX, message: 'Digite um e-mail válido' },
};

export const passwordRules = {
  required: 'Senha é obrigatória',
  minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres' },
};

export const nameRules = {
  required: 'Nome é obrigatório',
  minLength: { value: 3, message: 'O nome deve ter pelo menos 3 caracteres' },
};

export const getApiErrorMessage = (error) =>
  error?.response
    ? 'Erro no servidor. Tente novamente.'
    : 'Não foi possível conectar ao servidor. Verifique se a API está rodando (npm run api).';
