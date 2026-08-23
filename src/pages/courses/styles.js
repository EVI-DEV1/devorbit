import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

export const Container = styled.main`
  width: 100%;
  max-width: ${theme.layout.maxWidth};

  margin: 0 auto;
  padding: 32px 20px 60px;

  ${media.tablet} {
    padding: 24px 14px 48px;
  }
`;

export const PageHeader = styled.header`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  color: ${colors.text};

  font-size: 36px;
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  max-width: 640px;

  margin-top: 8px;

  color: ${colors.textMuted};

  font-size: 15px;
  line-height: 1.6;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 28px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterChip = styled.button`
  padding: 8px 14px;

  border: 1px solid
    ${({ $active, $accent }) =>
      $active ? ($accent ? colors.accent : colors.primary) : colors.border};
  border-radius: ${theme.radius.pill};

  background: ${({ $active, $accent }) =>
    $active ? ($accent ? colors.accentSoft : colors.primarySoft) : colors.surface};
  color: ${({ $active, $accent }) =>
    $active ? ($accent ? "#c4b5fd" : colors.primary) : colors.textMuted};

  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

export const SectionTitle = styled.h2`
  margin: 8px 0 16px;

  color: ${colors.textMuted};

  font-family: ${theme.fonts.body};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  margin-bottom: 36px;

  ${media.laptop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const EmptyState = styled.div`
  padding: 48px 24px;

  border: 1px dashed ${colors.borderStrong};
  border-radius: ${theme.radius.lg};

  background: ${colors.surface};
  color: ${colors.textMuted};

  text-align: center;
`;
