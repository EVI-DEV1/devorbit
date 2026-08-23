import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import { FiGlobe, FiPlayCircle, FiShield } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";

import { Logo } from "../Logo";
import { ProfileDrawer } from "../ProfileDrawer";
import { useAuth } from "../../contexts/AuthContext";

import {
  Container,
  Spacer,
  Wrapper,
  Center,
  MobileSearchRow,
  SearchContainer,
  Input,
  IconButton,
  Nav,
  NavLink,
  RightMenu,
  AdminBadge,
  UserAvatar,
  MobileIcon,
  LoginButton,
} from "./styles";

/*
 * Header fixo da plataforma.
 *
 *  Desktop:  LOGO | BUSCAR | LIVE CODE | GLOBAL | PERFIL
 *  Mobile:   LOGO                             PERFIL
 *            BUSCAR CURSOS...
 *
 * Quando a página controla a busca (Feed, Cursos) ela passa
 * `search`/`setSearch`. Em outras páginas a busca leva para o feed
 * com o termo na URL (/feed?q=...).
 */
const Header = ({ variant = "feed", search = "", setSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const isControlled = typeof setSearch === "function";
  const searchValue = isControlled ? search : localSearch;
  const isLogged = Boolean(user);
  const showSearch = variant === "feed" && isLogged;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (isControlled) {
      setSearch(value);
    } else {
      setLocalSearch(value);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = searchValue.trim();

    if (isControlled) return; // a própria página já filtra em tempo real

    if (!term) return;
    navigate(`/feed?q=${encodeURIComponent(term)}`);
    setLocalSearch("");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const renderSearch = (desktopOnly) => (
    <SearchContainer
      role="search"
      onSubmit={handleSearchSubmit}
      $desktopOnly={desktopOnly}
    >
      <Input
        type="search"
        placeholder={desktopOnly ? "Buscar cursos, posts, pessoas..." : "Buscar cursos..."}
        value={searchValue}
        onChange={handleSearchChange}
        aria-label="Pesquisar"
      />
      <IconButton type="submit" aria-label="Pesquisar">
        <FaSearch />
      </IconButton>
    </SearchContainer>
  );

  return (
    <>
      <Container>
        <Wrapper>
          <Logo onClick={() => navigate(isLogged ? "/feed" : "/")} />

          <Center>
            {showSearch && renderSearch(true)}

            {isLogged && (
              <Nav aria-label="Navegação principal">
                <NavLink
                  type="button"
                  $active={isActive("/courses")}
                  onClick={() => navigate("/courses")}
                >
                  <FiPlayCircle />
                  Live Code
                </NavLink>

                <NavLink
                  type="button"
                  $active={isActive("/feed")}
                  onClick={() => navigate("/feed")}
                >
                  <FiGlobe />
                  Global
                </NavLink>
              </Nav>
            )}
          </Center>

          <RightMenu>
            {isLogged ? (
              <>
                {isAdmin && (
                  <AdminBadge type="button" onClick={() => navigate("/admin")}>
                    <FiShield />
                    Admin
                  </AdminBadge>
                )}

                <UserAvatar
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Abrir perfil"
                  title={user.name}
                >
                  <img src={user.avatar || defaultAvatar} alt={user.name} />
                </UserAvatar>

                <MobileIcon
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Abrir menu"
                >
                  <FaBars />
                </MobileIcon>
              </>
            ) : (
              <>
                <LoginButton type="button" onClick={() => navigate("/login")}>
                  Entrar
                </LoginButton>
                <LoginButton
                  type="button"
                  $primary
                  onClick={() => navigate("/signup")}
                >
                  Criar conta
                </LoginButton>
              </>
            )}
          </RightMenu>
        </Wrapper>

        {showSearch && <MobileSearchRow>{renderSearch(false)}</MobileSearchRow>}
      </Container>

      <Spacer $compact={!showSearch} />

      {isLogged && (
        <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}
    </>
  );
};

export default Header;
