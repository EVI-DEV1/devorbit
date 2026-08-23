import { Wrapper, Wordmark } from "./styles";

/*
 * Logo DevOrbit.
 * Símbolo: um planeta com uma órbita inclinada — a comunidade girando
 * em torno do código. Desenhado em SVG para ficar nítido em qualquer
 * tamanho e sem depender de arquivos de imagem.
 */
const LogoMark = ({ size = 34 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="devorbit-planet" x1="16" y1="16" x2="48" y2="48">
        <stop offset="0%" stopColor="#00E676" />
        <stop offset="100%" stopColor="#00B35C" />
      </linearGradient>
    </defs>

    {/* Planeta */}
    <circle cx="32" cy="32" r="15" fill="url(#devorbit-planet)" />

    {/* Código dentro do planeta */}
    <path
      d="M27 26l-5 6 5 6M37 26l5 6-5 6M34.5 24l-5 16"
      stroke="#120F1C"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Órbita */}
    <ellipse
      cx="32"
      cy="32"
      rx="27"
      ry="10"
      stroke="#8B5CF6"
      strokeWidth="3"
      transform="rotate(-24 32 32)"
    />

    {/* Satélite */}
    <circle cx="54" cy="20" r="4" fill="#8B5CF6" />
  </svg>
);

const Logo = ({ size = 34, showText = true, onClick, className }) => (
  <Wrapper
    type="button"
    onClick={onClick}
    aria-label="DevOrbit — página inicial"
    className={className}
  >
    <LogoMark size={size} />
    {showText && (
      <Wordmark $size={size}>
        Dev<span>Orbit</span>
      </Wordmark>
    )}
  </Wrapper>
);

export { Logo, LogoMark };
