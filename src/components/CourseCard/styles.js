import styled from "styled-components";
import { theme } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.article`
  position: relative;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${({ $compact }) => ($compact ? theme.radius.lg : theme.radius.xl)};

  box-shadow: ${theme.shadow.card};

  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 230, 118, 0.45);
    box-shadow: ${theme.shadow.cardHover};
  }
`;

export const Banner = styled.img`
  width: 100%;
  height: ${({ $compact }) => ($compact ? 120 : 170)}px;

  display: block;
  object-fit: cover;
`;

export const StatusTag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;

  display: inline-flex;
  align-items: center;
  gap: 5px;

  padding: 6px 12px;

  border-radius: ${theme.radius.pill};

  background: ${({ $done }) => ($done ? colors.primary : "rgba(18, 15, 28, 0.85)")};
  color: ${({ $done }) => ($done ? colors.background : colors.text)};

  font-size: 12px;
  font-weight: 700;

  backdrop-filter: blur(6px);
`;

export const Body = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: ${({ $compact }) => ($compact ? "14px" : "20px")};
`;

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Badge = styled.span`
  padding: 4px 10px;

  border-radius: ${theme.radius.pill};

  background: ${({ $color }) => ($color ? `${$color}22` : colors.surfaceElevated)};
  color: ${({ $color }) => $color || colors.textMuted};

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const Name = styled.h3`
  color: ${colors.text};

  font-size: ${({ $compact }) => ($compact ? 17 : 21)}px;
  line-height: 1.3;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${colors.textMuted};
  font-size: 13px;

  img {
    width: 26px;
    height: 26px;

    border: 2px solid ${colors.surfaceElevated};
    border-radius: 50%;

    object-fit: cover;
  }
`;

export const Description = styled.p`
  color: ${colors.textMuted};

  font-size: 14px;
  line-height: 1.6;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  span {
    color: ${colors.primary};
    font-size: 12px;
    font-weight: 600;
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  color: ${colors.textSubtle};
  font-size: 13px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ProgressArea = styled.div`
  margin-top: 4px;
`;

export const Actions = styled.div`
  margin-top: auto;
  padding-top: 8px;
`;

const buttonBase = `
  width: 100%;
  min-height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 10px 16px;

  border-radius: ${theme.radius.md};

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  svg {
    font-size: 18px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase}

  border: 1px solid ${colors.primary};
  background: ${({ $done }) => ($done ? colors.primarySoft : colors.primary)};
  color: ${({ $done }) => ($done ? colors.primary : colors.background)};

  &:hover:not(:disabled) {
    box-shadow: ${theme.shadow.glow};
  }
`;

export const SecondaryButton = styled.button`
  ${buttonBase}

  border: 1px solid ${colors.borderStrong};
  background: transparent;
  color: ${colors.text};

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;
