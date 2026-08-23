import styled, { keyframes } from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.7);

  ${media.mobile} {
    padding: 0;
    align-items: flex-end;
  }
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: ${({ $width }) => $width || "640px"};
  max-height: calc(100vh - 40px);

  display: flex;
  flex-direction: column;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.xl};

  box-shadow: ${theme.shadow.cardHover};

  animation: ${fadeIn} 0.2s ease;

  ${media.mobile} {
    max-height: 94vh;
    border-radius: ${theme.radius.xl} ${theme.radius.xl} 0 0;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 20px 24px;

  border-bottom: 1px solid ${colors.border};
`;

export const Title = styled.h3`
  color: ${colors.text};
  font-size: 20px;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: ${colors.surfaceSoft};
  color: ${colors.textMuted};

  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: ${colors.dangerSoft};
    color: ${colors.danger};
  }
`;

export const Body = styled.div`
  overflow-y: auto;

  padding: 24px;

  ${media.mobile} {
    padding: 18px 16px 28px;
  }
`;
