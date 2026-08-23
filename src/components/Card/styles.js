import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

export const CardContainer = styled.article`
  width: 100%;
  overflow: hidden;

  margin-bottom: 28px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.xl};

  box-shadow: ${theme.shadow.card};

  transition: 0.3s;

  &:hover {
    border-color: rgba(0, 230, 118, 0.45);
    box-shadow: ${theme.shadow.cardHover};
  }
`;

export const ImageBackground = styled.img`
  width: 100%;
  height: 260px;

  display: block;
  object-fit: cover;

  ${media.mobile} {
    height: 190px;
  }
`;

export const Content = styled.div`
  position: relative;

  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 26px;

  ${media.mobile} {
    padding: 18px 16px;
  }
`;

export const AdminActions = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 2;

  display: flex;
  gap: 8px;

  ${media.mobile} {
    top: 14px;
    right: 14px;
  }
`;

export const AdminButton = styled.button`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ $danger }) => ($danger ? colors.danger : colors.accent)};
  border-radius: ${theme.radius.md};

  background: ${({ $danger }) => ($danger ? colors.dangerSoft : colors.accentSoft)};
  color: ${({ $danger }) => ($danger ? colors.danger : "#c4b5fd")};

  cursor: pointer;

  transition: 0.2s;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: ${({ $danger }) => ($danger ? colors.danger : colors.accent)};
    color: ${colors.text};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 12px;
  padding-right: 96px;

  div {
    min-width: 0;
    margin-left: 12px;
  }

  h4 {
    overflow: hidden;

    color: ${colors.text};

    font-size: 16px;
    font-weight: 700;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    color: ${colors.textSubtle};
    font-size: 13px;
  }

  ${media.mobile} {
    padding-right: 88px;
  }
`;

export const UserPicture = styled.img`
  width: 52px;
  height: 52px;
  flex-shrink: 0;

  border: 3px solid ${colors.primary};
  border-radius: 50%;

  object-fit: cover;
`;

export const PostInfo = styled.div`
  margin: 16px 0 8px;

  h4 {
    margin-bottom: 10px;

    color: ${colors.text};

    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  p {
    color: ${colors.textMuted};

    font-size: 15px;
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  ${media.mobile} {
    h4 {
      font-size: 20px;
    }
  }
`;

export const HasInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 16px;

  span {
    padding: 7px 14px;

    border-radius: ${theme.radius.pill};

    background: ${colors.surfaceElevated};
    color: ${colors.primary};

    font-size: 13px;
    font-weight: 600;
  }
`;

export const CourseArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 22px;
  padding: 18px;

  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: ${theme.radius.lg};

  background: ${colors.accentSoft};

  ${media.mobile} {
    padding: 14px;
  }
`;

export const SubscribersCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${colors.text};
  font-size: 14px;
  font-weight: 600;

  svg {
    color: ${colors.primary};
    font-size: 19px;
  }
`;

export const CourseButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const courseButtonBase = `
  min-width: 150px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  padding: 12px 20px;

  border-radius: ${theme.radius.md};

  cursor: pointer;
  font-size: 14px;
  font-weight: 700;

  transition: 0.2s;

  svg {
    font-size: 19px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const SubscribeButton = styled.button`
  ${courseButtonBase}

  border: 1px solid ${({ $subscribed }) => ($subscribed ? colors.primary : colors.accent)};

  background: ${({ $subscribed }) => ($subscribed ? colors.primarySoft : colors.accent)};
  color: ${({ $subscribed }) => ($subscribed ? colors.primary : colors.text)};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
  }
`;

export const AccessCourseButton = styled.button`
  ${courseButtonBase}

  border: 1px solid ${({ $locked }) => ($locked ? colors.borderStrong : colors.primary)};

  background: transparent;
  color: ${({ $locked }) => ($locked ? colors.textSubtle : colors.primary)};

  &:hover {
    transform: translateY(-2px);
    background: ${({ $locked }) => ($locked ? colors.surfaceSoft : colors.primarySoft)};
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  margin-top: 22px;
  padding-top: 16px;

  border-top: 1px solid ${colors.border};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ActionButton = styled.button`
  min-height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  padding: 9px;

  border: none;
  border-radius: ${theme.radius.sm};

  background: ${({ $active }) => ($active ? colors.primarySoft : "transparent")};
  color: ${({ $active }) => ($active ? colors.primary : colors.textMuted)};

  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};

  transition: 0.2s;

  svg {
    font-size: 18px;
    fill: ${({ $active }) => ($active ? colors.primarySoft : "none")};
  }

  &:hover {
    background: ${colors.primarySoft};
    color: ${colors.primary};
  }
`;

export const CommentArea = styled.div`
  margin-top: 18px;
  padding-top: 18px;

  border-top: 1px solid ${colors.border};
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 10px;
`;

export const CommentInput = styled.input`
  flex: 1;
  min-width: 0;

  padding: 12px 14px;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.md};

  background: ${colors.background};
  color: ${colors.text};

  outline: none;

  &::placeholder {
    color: ${colors.textSubtle};
  }

  &:focus {
    border-color: ${colors.primary};
  }
`;

export const SendCommentButton = styled.button`
  width: 46px;
  height: 46px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${theme.radius.md};

  background: ${colors.primary};
  color: ${colors.background};

  cursor: pointer;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: ${colors.primaryStrong};
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 10px;

  padding: 12px;

  border-radius: ${theme.radius.md};
  background: ${colors.surfaceSoft};

  img {
    width: 38px;
    height: 38px;
    flex-shrink: 0;

    border-radius: 50%;
    object-fit: cover;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  p {
    margin-top: 4px;

    color: ${colors.textMuted};

    font-size: 14px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    overflow: hidden;

    color: ${colors.text};
    font-size: 14px;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  time {
    flex-shrink: 0;

    color: ${colors.textSubtle};
    font-size: 12px;
  }
`;

export const CommentDeleteButton = styled.button`
  width: 26px;
  height: 26px;
  flex-shrink: 0;

  margin-left: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 6px;

  background: transparent;
  color: ${colors.textSubtle};

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: ${colors.dangerSoft};
    color: ${colors.danger};
  }
`;

export const EmptyComments = styled.p`
  color: ${colors.textSubtle};
  font-size: 14px;
`;
