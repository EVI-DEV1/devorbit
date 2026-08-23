import { useEffect, useState } from "react";

// Retorna o "agora" e o atualiza no intervalo informado, para que
// textos como "Há 5 minutos" se atualizem sozinhos na tela.
export const useNow = (intervalMs = 60 * 1000) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
};
