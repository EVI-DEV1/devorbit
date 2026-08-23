import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors, layout } = theme;

/* Header fixo: ocupa sempre o topo, em qualquer largura. */
export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  width: 100%;

  background: rgba(18, 15, 28, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid ${colors.border};
`;

/* Reserva o espaço do header para o conteúdo nunca ficar escondido. */
export const Spacer = styled.div`
  /* +1 = borda inferior do header */
  height: ${layout.headerHeight + 1}px;

  ${media.tablet} {
    height: ${({ $compact }) =>
      $compact ? layout.headerRowMobile + 1 : layout.headerHeightMobile + 1}px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};
  height: ${layout.headerHeight}px;

  margin: 0 auto;
  padding: 0 20px;

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;

  ${media.tablet} {
    height: ${layout.headerRowMobile}px;
    gap: 12px;
    padding: 0 14px;
  }
`;

export const Center = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;

  ${media.tablet} {
    justify-content: flex-end;
    gap: 10px;
  }
`;

/* Linha extra só no celular: BUSCAR CURSOS... */
export const MobileSearchRow = styled.div`
  display: none;

  ${media.tablet} {
    display: block;

    width: 100%;
    padding: 0 14px 11px;
  }
`;

export const SearchContainer = styled.form`
  width: 100%;
  max-width: 420px;
  height: 42px;

  display: flex;
  align-items: center;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.pill};

  background: ${colors.surface};

  overflow: hidden;

  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primarySoft};
  }

  ${({ $desktopOnly }) =>
    $desktopOnly &&
    `
    @media (max-width: ${theme.breakpoints.tablet}) {
      display: none;
    }
  `}

  ${media.tablet} {
    max-width: 100%;
    height: 40px;
  }
`;

export const Input = styled.input`
  min-width: 0;
  flex: 1;
  height: 100%;

  padding: 0 16px;

  border: none;
  background: transparent;
  color: ${colors.text};

  outline: none;

  &::placeholder {
    color: ${colors.textSubtle};
  }
`;

export const IconButton = styled.button`
  width: 44px;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  color: ${colors.textMuted};

  cursor: pointer;

  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  ${media.laptop} {
    gap: 0;
  }

  ${media.tablet} {
    display: none;
  }
`;

export const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 9px 14px;

  border: none;
  border-radius: ${theme.radius.pill};

  background: ${({ $active }) => ($active ? colors.primarySoft : "transparent")};
  color: ${({ $active }) => ($active ? colors.primary : colors.textMuted)};

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;

  cursor: pointer;

  transition: 0.2s;

  svg {
    font-size: 16px;
  }

  &:hover {
    color: ${colors.primary};
    background: ${colors.primarySoft};
  }

  ${media.laptop} {
    padding: 9px 10px;
    font-size: 12px;
  }
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AdminBadge = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 8px 12px;

  border: 1px solid ${colors.accent};
  border-radius: ${theme.radius.pill};

  background: ${colors.accentSoft};
  color: #c4b5fd;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: ${colors.accent};
    color: ${colors.text};
  }

  ${media.tablet} {
    display: none;
  }
`;

export const UserAvatar = styled.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  padding: 0;

  border: 2px solid ${colors.primary};
  border-radius: 50%;

  background: ${colors.surface};

  cursor: pointer;

  overflow: hidden;

  transition: 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadow.glow};
  }
`;

export const MobileIcon = styled.button`
  width: 42px;
  height: 42px;

  display: none;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  color: ${colors.text};

  cursor: pointer;
  font-size: 22px;

  transition: 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  ${media.tablet} {
    display: flex;
  }
`;

export const LoginButton = styled.button`
  height: 40px;

  padding: 0 22px;

  border: 1px solid
    ${({ $primary }) => ($primary ? colors.primary : colors.borderStrong)};
  border-radius: ${theme.radius.pill};

  background: ${({ $primary }) => ($primary ? colors.primary : "transparent")};
  color: ${({ $primary }) => ($primary ? colors.background : colors.text)};

  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    border-color: ${colors.primary};
    background: ${({ $primary }) =>
      $primary ? colors.primaryStrong : colors.primarySoft};
  }

  ${media.mobile} {
    padding: 0 14px;
    font-size: 13px;
  }
`;
