import styled from "styled-components";
import { theme } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.div`
  margin: 24px 0;
`;

export const Title = styled.h3`
  margin-bottom: 14px;
  color: ${colors.text};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 14px;
`;

export const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  padding: 16px 10px 14px;

  background: ${colors.surfaceElevated};
  border: 1px solid ${({ $done }) => ($done ? colors.primary : colors.border)};
  border-radius: ${theme.radius.lg};

  text-align: center;

  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: ${colors.primary};
    box-shadow: ${theme.shadow.glow};
  }
`;

export const BadgeImage = styled.div`
  position: relative;

  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 3px solid ${({ $done }) => ($done ? colors.primary : colors.accent)};

  background: ${colors.background};

  overflow: visible;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    color: ${colors.primary};
    font-family: ${theme.fonts.heading};
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

export const DoneMark = styled.span`
  position: absolute;
  right: -4px;
  bottom: -4px;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${colors.surfaceElevated};
  border-radius: 50%;

  background: ${colors.primary};
  color: ${colors.background};

  font-size: 14px;
`;

export const BadgeName = styled.strong`
  color: ${colors.text};
  font-size: 13px;
  line-height: 1.3;
`;

export const BadgeLevel = styled.small`
  color: ${colors.textSubtle};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const EmptyText = styled.p`
  color: ${colors.textSubtle};
  font-size: 14px;
`;
