import styled from "styled-components";
import { theme, media } from "../../styles/theme";

export const Header = styled.header`
  width: 100%;
  height: 72px;

  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};

  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${theme.layout.maxWidth};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;

  ${media.tablet} {
    padding: 0 14px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;

  border: 1px solid transparent;
  border-radius: ${theme.radius.pill};

  background: transparent;
  color: ${theme.colors.textMuted};

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  svg {
    font-size: 15px;
  }

  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.border};
  }
`;
