import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Wrapper = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 0;

  background: transparent;
  border: none;

  cursor: pointer;

  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Wordmark = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${({ $size }) => Math.round($size * 0.62)}px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;

  color: ${theme.colors.text};
  white-space: nowrap;

  span {
    color: ${theme.colors.primary};
  }
`;
