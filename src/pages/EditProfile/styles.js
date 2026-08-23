import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  padding: 32px 20px 60px;

  ${media.tablet} {
    padding: 24px 14px 48px;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 700px;

  padding: 30px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  box-shadow: ${theme.shadow.card};

  ${media.mobile} {
    padding: 20px 16px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 24px;

  color: ${colors.text};
  font-size: 26px;
`;

export const Label = styled.label`
  display: block;

  margin-bottom: 6px;

  color: ${colors.textMuted};

  font-size: 13px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;

  margin-bottom: 16px;
  padding: 13px 14px;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.md};

  background: ${colors.background};
  color: ${colors.text};

  outline: none;

  transition: border-color 0.2s;

  &::placeholder {
    color: ${colors.textSubtle};
  }

  &:focus {
    border-color: ${colors.primary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;

  margin-bottom: 16px;
  padding: 13px 14px;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.md};

  background: ${colors.background};
  color: ${colors.text};

  outline: none;
  resize: vertical;

  transition: border-color 0.2s;

  &::placeholder {
    color: ${colors.textSubtle};
  }

  &:focus {
    border-color: ${colors.primary};
  }
`;

export const Helper = styled.p`
  margin: -8px 0 16px;

  color: ${colors.textSubtle};
  font-size: 12px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  margin-top: 8px;

  ${media.mobile} {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button`
  min-width: 160px;

  padding: 13px 24px;

  border: 1px solid ${colors.primary};
  border-radius: ${theme.radius.md};

  background: ${colors.primary};
  color: ${colors.background};

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  &:hover:not(:disabled) {
    box-shadow: ${theme.shadow.glow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  background: transparent;
  border-color: ${colors.borderStrong};
  color: ${colors.text};

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    color: ${colors.primary};
    box-shadow: none;
  }
`;
