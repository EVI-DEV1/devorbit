import styled from "styled-components";
import { theme } from "../../styles/theme";

const { colors } = theme;

export const Field = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 48px;

  padding: 0 14px;

  display: flex;
  align-items: center;

  border: 1px solid ${({ hasError }) => (hasError ? colors.danger : colors.border)};
  border-radius: ${theme.radius.md};

  background: ${colors.background};

  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: ${({ hasError }) => (hasError ? colors.danger : colors.primary)};
    box-shadow: 0 0 0 3px
      ${({ hasError }) => (hasError ? colors.dangerSoft : colors.primarySoft)};
  }
`;

export const IconContainer = styled.div`
  margin-right: 10px;

  display: flex;
  align-items: center;

  color: ${colors.textSubtle};
  font-size: 18px;
`;

export const InputText = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;

  border: 0;
  background-color: transparent;
  color: ${colors.text};

  outline: none;

  &::placeholder {
    color: ${colors.textSubtle};
  }
`;

export const ErrorText = styled.span`
  display: block;
  margin-top: 6px;

  color: ${colors.danger};
  font-size: 12px;
`;
