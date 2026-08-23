import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

/*
 * Estilos compartilhados pelas telas de autenticação
 * (login, cadastro e recuperar senha).
 */

export const Container = styled.main`
  width: 100%;
  max-width: ${theme.layout.maxWidth};
  min-height: calc(100vh - 72px);

  margin: 0 auto;
  padding: 60px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;

  ${media.laptop} {
    gap: 40px;
  }

  ${media.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;

    padding: 36px 16px 48px;
    gap: 28px;
  }
`;

export const Column = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;

  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 440px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.xl};

  padding: 40px;

  box-shadow: ${theme.shadow.card};

  transition: border-color 0.3s;

  &:hover {
    border-color: rgba(0, 230, 118, 0.4);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  ${media.mobile} {
    padding: 28px 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;

  margin-top: 26px;
`;

export const Title = styled.h2`
  max-width: 520px;

  color: ${colors.text};

  font-size: 44px;
  font-weight: 700;
  line-height: 1.2;

  span {
    color: ${colors.primary};
  }

  ${media.laptop} {
    font-size: 36px;
  }

  ${media.tablet} {
    font-size: 28px;
    margin: 0 auto;
  }
`;

export const TitleLogin = styled.h2`
  color: ${colors.text};
  font-size: 30px;
  margin-bottom: 10px;

  ${media.mobile} {
    font-size: 24px;
  }
`;

export const SubtitleLogin = styled.p`
  color: ${colors.textMuted};
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 30px;
`;

export const EsqueciText = styled.p`
  color: ${colors.textMuted};
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${colors.primary};
  }
`;

export const CriarText = styled.p`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const FormError = styled.p`
  margin: -6px 0 16px;

  padding: 10px 14px;

  border-radius: ${theme.radius.sm};
  background: ${colors.dangerSoft};
  color: ${colors.danger};

  font-size: 14px;
`;

export const FormSuccess = styled.p`
  margin: -6px 0 16px;

  padding: 10px 14px;

  border-radius: ${theme.radius.sm};
  background: ${colors.primarySoft};
  color: ${colors.primary};

  font-size: 14px;
`;
