import styled from "styled-components";
import { theme } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 0;

  > strong {
    flex-shrink: 0;

    min-width: 42px;

    color: ${colors.primary};

    font-size: 15px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
`;

export const Position = styled.span`
  flex-shrink: 0;

  width: 28px;

  color: ${({ $top }) => ($top ? colors.primary : colors.textSubtle)};

  font-family: ${theme.fonts.heading};
  font-size: 15px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`;

export const UserPicture = styled.img`
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  border: 2px solid ${colors.surfaceElevated};
  border-radius: 50%;

  object-fit: cover;
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NameText = styled.div`
  overflow: hidden;

  color: ${colors.text};

  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RoleText = styled.div`
  margin-bottom: 5px;
  overflow: hidden;

  color: ${colors.textSubtle};

  font-size: 12px;

  text-overflow: ellipsis;
  white-space: nowrap;
`;
