import styled, { keyframes } from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  background: rgba(0, 0, 0, 0.65);

  animation: ${fadeIn} 0.2s ease;
`;

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 360px;
  max-width: 88vw;

  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 24px 22px 32px;

  overflow-y: auto;

  background: ${colors.surface};
  border-left: 1px solid ${colors.border};
  box-shadow: -12px 0 36px rgba(0, 0, 0, 0.5);

  animation: ${slideIn} 0.25s ease;

  ${media.mobile} {
    padding: 20px 16px 28px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;

  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: ${colors.surfaceSoft};
  color: ${colors.textMuted};

  cursor: pointer;
  font-size: 20px;

  transition: 0.2s;

  &:hover {
    background: ${colors.dangerSoft};
    color: ${colors.danger};
  }
`;

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 18px 0 22px;

  border-bottom: 1px solid ${colors.border};
`;

export const Avatar = styled.img`
  width: 96px;
  height: 96px;

  border: 3px solid ${colors.primary};
  border-radius: 50%;

  object-fit: cover;

  cursor: pointer;

  box-shadow: ${theme.shadow.glow};
`;

export const Name = styled.h3`
  margin-top: 14px;

  color: ${colors.text};
  font-size: 20px;
`;

export const Role = styled.p`
  margin-top: 4px;

  color: ${colors.textMuted};
  font-size: 14px;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  margin-top: 12px;
  padding: 7px 14px;

  border: 1px solid ${colors.borderStrong};
  border-radius: ${theme.radius.pill};

  background: transparent;
  color: ${colors.textMuted};

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

export const Stats = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  margin-top: 20px;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  padding: 12px 6px;

  border-radius: ${theme.radius.md};
  background: ${colors.surfaceSoft};

  strong {
    color: ${colors.text};
    font-size: 15px;
    white-space: nowrap;
  }

  span {
    color: ${colors.textSubtle};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;

export const SectionTitle = styled.h4`
  margin-top: 8px;

  color: ${colors.textSubtle};

  font-family: ${theme.fonts.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CourseItem = styled.button`
  width: 100%;

  padding: 12px 14px;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.md};

  background: ${colors.surfaceSoft};

  text-align: left;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    border-color: ${colors.primary};
  }
`;

export const EmptyText = styled.p`
  color: ${colors.textMuted};
  font-size: 14px;
  line-height: 1.5;
`;

export const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MenuItem = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 13px 12px;

  border: none;
  border-radius: ${theme.radius.md};

  background: transparent;
  color: ${({ $danger, $accent }) =>
    $danger ? colors.danger : $accent ? "#c4b5fd" : colors.text};

  font-size: 15px;
  font-weight: ${({ $danger }) => ($danger ? 700 : 500)};
  text-align: left;

  cursor: pointer;

  transition: 0.2s;

  svg {
    flex-shrink: 0;
    font-size: 18px;
  }

  &:hover {
    background: ${({ $danger }) =>
      $danger ? colors.dangerSoft : colors.surfaceSoft};
  }
`;
