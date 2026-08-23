import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.div`
  max-width: ${theme.layout.maxWidth};

  margin: 24px auto;
  padding: 0 20px;

  ${media.tablet} {
    padding: 0 14px;
  }
`;

export const ProfileContentCard = styled.div`
  width: 100%;
  max-width: 900px;

  margin: 8px auto 0;
  padding: 28px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  box-shadow: ${theme.shadow.card};

  ${media.tablet} {
    padding: 20px 16px;
  }
`;

export const AdminTag = styled.span`
  display: inline-block;

  margin-bottom: 14px;
  padding: 5px 12px;

  border: 1px solid ${colors.accent};
  border-radius: ${theme.radius.pill};

  background: ${colors.accentSoft};
  color: #c4b5fd;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const Bio = styled.p`
  margin-bottom: 18px;

  color: ${colors.textMuted};
  line-height: 1.6;
`;

export const Location = styled.p`
  margin-bottom: 14px;

  color: ${colors.textMuted};
  font-size: 15px;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;

  margin: 28px 0 50px;
`;

export const PrimaryButton = styled.button`
  min-width: 180px;

  padding: 13px 32px;

  border: 1px solid ${colors.primary};
  border-radius: ${theme.radius.md};

  background: ${colors.primary};
  color: ${colors.background};

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    box-shadow: ${theme.shadow.glow};
  }

  ${media.mobile} {
    width: 100%;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: ${colors.text};
  border-color: ${colors.borderStrong};

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
    box-shadow: none;
  }
`;
