import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

const { colors } = theme;

export const ButtonContainer = styled.button`
  width: 100%;
  min-width: 120px;
  height: 46px;

  padding: 0 24px;

  border: 1px solid ${colors.borderStrong};
  border-radius: ${theme.radius.pill};

  background: ${colors.surfaceElevated};
  color: ${colors.text};

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    border-color: ${colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ variant }) =>
    variant !== "primary" &&
    css`
      border-color: ${colors.primary};
      background: ${colors.primary};
      color: ${colors.background};

      &:hover:not(:disabled) {
        background: ${colors.primaryStrong};
        box-shadow: ${theme.shadow.glow};
        transform: translateY(-1px);
      }
    `}
`;
