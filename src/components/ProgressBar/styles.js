import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  margin-bottom: 6px;
`;

export const Label = styled.span`
  min-width: 0;
  overflow: hidden;

  color: ${theme.colors.text};

  font-size: 14px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Value = styled.span`
  flex-shrink: 0;

  color: ${theme.colors.primary};

  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const Track = styled.div`
  width: 100%;
  height: ${({ $height }) => $height || 8}px;

  border-radius: ${theme.radius.pill};
  background: rgba(255, 255, 255, 0.1);

  overflow: hidden;
`;

export const Fill = styled.div`
  height: 100%;

  border-radius: ${theme.radius.pill};
  background: ${({ $color }) =>
    $color ||
    `linear-gradient(90deg, ${theme.colors.primaryStrong}, ${theme.colors.primary})`};

  transition: width 0.4s ease;
`;
