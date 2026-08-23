import styled from "styled-components";
import { theme } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.aside`
  width: 100%;

  padding: 18px 20px 10px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  box-shadow: ${theme.shadow.card};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding-bottom: 12px;

  border-bottom: 1px solid ${colors.border};

  color: ${colors.warning};

  svg {
    font-size: 20px;
  }
`;

export const Title = styled.h3`
  color: ${colors.text};

  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 6px;

  > div + div {
    border-top: 1px solid ${colors.border};
  }
`;

export const EmptyText = styled.p`
  padding: 16px 0;

  color: ${colors.textSubtle};
  font-size: 13px;
`;
