import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiHome,
  FiBookOpen,
  FiUser,
  FiLogOut,
  FiTrash2,
  FiShield,
  FiEdit3,
} from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";

import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";

import {
  Overlay,
  Drawer,
  CloseButton,
  ProfileSection,
  Avatar,
  Name,
  Role,
  Stats,
  Stat,
  SectionTitle,
  MenuList,
  MenuItem,
  EditButton,
} from "./styles";

/*
 * Drawer lateral aberto pelo avatar do Header.
 * Mostra o resumo do perfil, o progresso dos cursos em andamento e a
 * navegação da plataforma (inclui sair e excluir conta).
 */
const ProfileDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { courses, deleteUser } = useData();

  // Fecha com ESC e trava o scroll da página enquanto aberto.
  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // Cursos em que o usuário está inscrito (sobe na hora ao se inscrever).
  const enrolledCount = useMemo(() => {
    const progress = user?.progress || {};
    return courses.filter(
      (course) =>
        Object.prototype.hasOwnProperty.call(progress, course.id) ||
        Object.prototype.hasOwnProperty.call(progress, String(course.id))
    ).length;
  }, [courses, user]);

  if (!open || !user) return null;

  const go = (route) => {
    onClose();
    navigate(route);
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Essa ação não poderá ser desfeita."
    );
    if (!confirmed) return;

    deleteUser(user.id);
    logout();
    onClose();
    alert("Conta excluída com sucesso.");
    navigate("/signup");
  };

  return (
    <Overlay onClick={onClose}>
      <Drawer
        role="dialog"
        aria-modal="true"
        aria-label="Perfil e menu"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton type="button" onClick={onClose} aria-label="Fechar">
          <FiX />
        </CloseButton>

        <ProfileSection>
          <Avatar
            src={user.avatar || defaultAvatar}
            alt={user.name}
            onClick={() => go("/profile")}
          />
          <Name>{user.name}</Name>
          <Role>
            {user.profession || (isAdmin ? "Administrador" : "Membro da comunidade")}
          </Role>

          <EditButton type="button" onClick={() => go("/profile/edit")}>
            <FiEdit3 />
            Editar perfil
          </EditButton>

          <Stats>
            <Stat>
              <strong>⭐ {Number(user.xp || 0).toLocaleString("pt-BR")}</strong>
              <span>XP</span>
            </Stat>
            <Stat>
              <strong>📚 {enrolledCount}</strong>
              <span>Cursos</span>
            </Stat>
            <Stat>
              <strong>🏆 {(user.projects || []).length}</strong>
              <span>Projetos</span>
            </Stat>
          </Stats>
        </ProfileSection>

        <SectionTitle>Navegação</SectionTitle>

        <MenuList>
          <MenuItem type="button" onClick={() => go("/feed")}>
            <FiHome />
            <span>Feed</span>
          </MenuItem>

          <MenuItem type="button" onClick={() => go("/courses")}>
            <FiBookOpen />
            <span>Cursos</span>
          </MenuItem>

          <MenuItem type="button" onClick={() => go("/profile")}>
            <FiUser />
            <span>Meu perfil</span>
          </MenuItem>

          {isAdmin && (
            <MenuItem type="button" $accent onClick={() => go("/admin")}>
              <FiShield />
              <span>Painel administrativo</span>
            </MenuItem>
          )}

          <MenuItem type="button" onClick={handleLogout}>
            <FiLogOut />
            <span>Sair da conta</span>
          </MenuItem>

          <MenuItem type="button" $danger onClick={handleDeleteAccount}>
            <FiTrash2 />
            <span>Excluir conta</span>
          </MenuItem>
        </MenuList>
      </Drawer>
    </Overlay>
  );
};

export { ProfileDrawer };
