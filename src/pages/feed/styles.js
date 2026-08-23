import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.main`
  width: 100%;
  max-width: ${theme.layout.maxWidth};

  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  align-items: flex-start;
  gap: 32px;

  margin: 0 auto;
  padding: 32px 20px 60px;

  ${media.laptop} {
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 24px;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    padding: 24px 14px 48px;
  }
`;

export const Column = styled.section`
  min-width: 0;
`;

export const Sidebar = styled.aside`
  position: sticky;
  top: ${theme.layout.headerHeight + 20}px;

  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;

  ${media.tablet} {
    position: static;
  }
`;

export const FeedHeader = styled.header`
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: ${colors.text};

  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  max-width: 650px;

  margin-top: 8px;

  color: ${colors.textMuted};

  font-size: 15px;
  line-height: 1.6;
`;

export const EmptyState = styled.div`
  width: 100%;

  margin-bottom: 24px;
  padding: 42px 24px;

  border: 1px dashed ${colors.borderStrong};
  border-radius: ${theme.radius.lg};

  background: ${colors.surface};
  color: ${colors.textMuted};

  font-size: 15px;
  text-align: center;
`;

export const AdminMessage = styled.div`
  width: 100%;

  margin: 0 0 22px;
  padding: 14px 18px;

  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: ${theme.radius.md};

  background: ${colors.accentSoft};
  color: ${colors.textMuted};

  font-size: 14px;
  line-height: 1.5;
`;

export const SearchResults = styled.section`
  margin-bottom: 28px;
`;

export const SearchResultsTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 14px;

  color: ${colors.textMuted};

  font-family: ${theme.fonts.body};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  svg {
    color: ${colors.primary};
    font-size: 16px;
  }
`;

export const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;
