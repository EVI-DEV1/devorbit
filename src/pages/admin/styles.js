import styled from "styled-components";
import { theme, media } from "../../styles/theme";

const { colors } = theme;

/* ---------- Layout ---------- */

export const Layout = styled.div`
  width: 100%;
  max-width: 1320px;

  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 28px;

  margin: 0 auto;
  padding: 28px 20px 60px;

  ${media.laptop} {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 20px 14px 48px;
  }
`;

export const Sidebar = styled.nav`
  position: sticky;
  top: ${theme.layout.headerHeight + 20}px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 14px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  ${media.laptop} {
    position: static;

    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;

    padding: 8px;
  }
`;

export const SidebarTitle = styled.p`
  margin: 6px 10px 12px;

  color: ${colors.textSubtle};

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  ${media.laptop} {
    display: none;
  }
`;

export const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 11px 12px;

  border: none;
  border-radius: ${theme.radius.md};

  background: ${({ $active }) => ($active ? colors.accentSoft : "transparent")};
  color: ${({ $active }) => ($active ? "#c4b5fd" : colors.textMuted)};

  font-size: 14px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;

  cursor: pointer;

  transition: 0.2s;

  svg {
    flex-shrink: 0;
    font-size: 17px;
  }

  &:hover {
    background: ${colors.accentSoft};
    color: #c4b5fd;
  }
`;

export const Content = styled.section`
  min-width: 0;
`;

export const PageHead = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;

  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  color: ${colors.text};
  font-size: 28px;
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: 24px;
  }
`;

export const PageSubtitle = styled.p`
  margin-top: 6px;

  color: ${colors.textMuted};
  font-size: 14px;
  line-height: 1.5;
`;

export const StatusLine = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 18px;
  padding: 8px 14px;

  border: 1px solid ${({ $online }) => ($online ? colors.primary : colors.warning)}44;
  border-radius: ${theme.radius.pill};

  background: ${({ $online }) => ($online ? colors.primarySoft : "rgba(255, 181, 71, 0.12)")};
  color: ${({ $online }) => ($online ? colors.primary : colors.warning)};

  font-size: 13px;
  font-weight: 600;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
`;

/* ---------- Cards de estatísticas ---------- */

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  margin-bottom: 28px;

  ${media.laptop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 20px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  svg {
    margin-bottom: 12px;
    color: ${({ $color }) => $color || colors.primary};
    font-size: 22px;
  }

  strong {
    display: block;

    color: ${colors.text};

    font-family: ${theme.fonts.heading};
    font-size: 30px;
    line-height: 1;
  }

  span {
    display: block;
    margin-top: 8px;

    color: ${colors.textMuted};
    font-size: 13px;
  }
`;

export const Panel = styled.div`
  margin-bottom: 22px;
  padding: 20px;

  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  ${media.mobile} {
    padding: 16px 14px;
  }
`;

export const PanelTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 16px;

  color: ${colors.text};
  font-size: 17px;

  svg {
    color: ${colors.primary};
  }
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  ${media.laptop} {
    grid-template-columns: 1fr;
  }
`;

/* ---------- Toolbar ---------- */

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  margin-bottom: 16px;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  height: 42px;

  padding: 0 14px;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.md};

  background: ${colors.surface};
  color: ${colors.text};

  outline: none;

  &::placeholder {
    color: ${colors.textSubtle};
  }

  &:focus {
    border-color: ${colors.primary};
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  height: 42px;

  padding: 0 18px;

  border: 1px solid ${colors.primary};
  border-radius: ${theme.radius.md};

  background: ${colors.primary};
  color: ${colors.background};

  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;

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

export const GhostButton = styled(PrimaryButton)`
  background: transparent;
  border-color: ${colors.borderStrong};
  color: ${colors.text};

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    color: ${colors.primary};
    box-shadow: none;
  }
`;

export const DangerButton = styled(PrimaryButton)`
  background: transparent;
  border-color: ${colors.danger};
  color: ${colors.danger};

  &:hover:not(:disabled) {
    background: ${colors.danger};
    color: ${colors.text};
    box-shadow: none;
  }
`;

/* ---------- Tabela ---------- */

export const TableWrapper = styled.div`
  overflow-x: auto;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.lg};

  background: ${colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  min-width: 640px;

  border-collapse: collapse;

  th,
  td {
    padding: 14px 16px;

    text-align: left;
    vertical-align: middle;
  }

  th {
    border-bottom: 1px solid ${colors.border};

    color: ${colors.textSubtle};

    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    border-bottom: 1px solid ${colors.border};

    color: ${colors.text};
    font-size: 14px;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: ${colors.surfaceSoft};
  }
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 0;

  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;

    border-radius: ${({ $round }) => ($round ? "50%" : "8px")};
    object-fit: cover;
  }

  > div {
    min-width: 0;
  }

  strong {
    display: block;
    overflow: hidden;

    color: ${colors.text};

    font-size: 14px;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    display: block;
    overflow: hidden;

    color: ${colors.textSubtle};

    font-size: 12px;

    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.sm};

  background: transparent;
  color: ${({ $danger }) => ($danger ? colors.danger : colors.textMuted)};

  cursor: pointer;

  transition: 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ $danger }) => ($danger ? colors.danger : colors.primary)};
    background: ${({ $danger }) => ($danger ? colors.dangerSoft : colors.primarySoft)};
    color: ${({ $danger }) => ($danger ? colors.danger : colors.primary)};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Badge = styled.span`
  display: inline-block;

  padding: 4px 10px;

  border-radius: ${theme.radius.pill};

  background: ${({ $color }) => ($color ? `${$color}22` : colors.surfaceElevated)};
  color: ${({ $color }) => $color || colors.textMuted};

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const EmptyRow = styled.div`
  padding: 40px 20px;

  color: ${colors.textMuted};
  font-size: 14px;
  text-align: center;
`;

/* ---------- Formulário ---------- */

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, minmax(0, 1fr));
  gap: 14px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: ${colors.textMuted};
    font-size: 13px;
    font-weight: 600;
  }

  small {
    color: ${colors.textSubtle};
    font-size: 12px;
  }
`;

const inputBase = `
  width: 100%;

  padding: 12px 14px;

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

export const Input = styled.input`
  ${inputBase}
`;

export const TextArea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 96px;
`;

export const Select = styled.select`
  ${inputBase}
  cursor: pointer;

  option {
    background: ${colors.background};
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-top: 8px;

  ${media.mobile} {
    flex-direction: column-reverse;
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: 140px;

  border-radius: ${theme.radius.md};
  object-fit: cover;
`;

export const InlineList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    padding: 10px 0;

    border-bottom: 1px solid ${colors.border};

    color: ${colors.text};
    font-size: 14px;

    &:last-child {
      border-bottom: none;
    }

    span {
      color: ${colors.textMuted};
    }

    strong {
      color: ${colors.primary};
      font-variant-numeric: tabular-nums;
    }
  }
`;

export const ScoreInput = styled.input`
  width: 84px;

  padding: 8px 10px;

  border: 1px solid ${colors.border};
  border-radius: ${theme.radius.sm};

  background: ${colors.background};
  color: ${colors.text};

  font-variant-numeric: tabular-nums;
  text-align: right;

  outline: none;

  &:focus {
    border-color: ${colors.primary};
  }
`;
