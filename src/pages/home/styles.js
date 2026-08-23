import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.main`
  width: 100%;
  max-width: ${theme.layout.maxWidth};

  margin: 0 auto;
  padding: 60px 20px 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;

  ${media.laptop} {
    gap: 32px;
    padding-top: 40px;
  }

  ${media.tablet} {
    flex-direction: column;
    text-align: center;
    gap: 40px;

    padding: 32px 16px 24px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 24px;

  color: ${colors.text};

  font-size: 56px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;

  ${media.desktop} {
    font-size: 48px;
  }

  ${media.laptop} {
    font-size: 40px;
  }

  ${media.tablet} {
    font-size: 34px;

    br {
      display: none;
    }
  }

  ${media.mobile} {
    font-size: 30px;
  }
`;

export const TitleHighlight = styled.span`
  color: ${colors.primary};
`;

export const TextContent = styled.p`
  max-width: 520px;

  margin-bottom: 32px;

  color: ${colors.textMuted};

  font-size: 18px;
  line-height: 1.65;

  ${media.tablet} {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
  }
`;

export const HeroActions = styled.div`
  max-width: 260px;

  ${media.tablet} {
    margin: 0 auto;
  }
`;

export const TechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  margin-top: 34px;

  ${media.tablet} {
    justify-content: center;
  }
`;

export const Tech = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 18px;

  background: ${colors.surfaceSoft};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.pill};

  color: ${colors.text};
  font-size: 14px;
  font-weight: 600;

  transition: 0.3s;

  svg {
    font-size: 22px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${colors.primary};
    box-shadow: ${theme.shadow.glow};
  }
`;

export const StatsSection = styled.section`
  max-width: ${theme.layout.maxWidth};

  margin: 15px auto 60px;
  padding: 0 20px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }
`;

export const StatCard = styled.div`
  padding: 30px 24px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  text-align: center;

  transition: 0.3s;

  &:hover {
    transform: translateY(-6px);
    border-color: ${colors.primary};
  }

  h2 {
    color: ${colors.primary};
    font-size: 40px;
  }

  h3 {
    margin: 8px 0;
    color: ${colors.text};
    font-size: 18px;
  }

  p {
    color: ${colors.textMuted};
    font-size: 14px;
    line-height: 1.6;
  }
`;

export const Banner = styled.img`
  width: 100%;
  max-width: 520px;

  ${media.laptop} {
    max-width: 420px;
  }

  ${media.tablet} {
    max-width: 340px;
  }
`;
