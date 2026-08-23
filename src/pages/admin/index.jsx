import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBookOpen,
  FiFileText,
  FiUsers,
  FiAward,
  FiMessageSquare,
} from "react-icons/fi";

import Header from "../../components/Header";
import { useData } from "../../contexts/DataContext";

import Dashboard from "./Dashboard";
import CoursesAdmin from "./CoursesAdmin";
import PostsAdmin from "./PostsAdmin";
import UsersAdmin from "./UsersAdmin";
import TopFiveAdmin from "./TopFiveAdmin";
import CommentsAdmin from "./CommentsAdmin";

import { Layout, Sidebar, SidebarTitle, SidebarItem, Content, StatusLine } from "./styles";

const MENU = [
  { path: "/admin", label: "Visão geral", icon: <FiGrid />, exact: true },
  { path: "/admin/courses", label: "Cursos", icon: <FiBookOpen /> },
  { path: "/admin/posts", label: "Publicações", icon: <FiFileText /> },
  { path: "/admin/users", label: "Usuários", icon: <FiUsers /> },
  { path: "/admin/top5", label: "Top 5 da semana", icon: <FiAward /> },
  { path: "/admin/comments", label: "Comentários", icon: <FiMessageSquare /> },
];

/*
 * Painel administrativo. Protegido por <AdminRoute> em routes/index.jsx.
 * Tudo que o admin altera aqui passa pelo DataContext e aparece
 * imediatamente para os usuários.
 */
const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { online } = useData();

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <>
      <Header variant="admin" />

      <Layout>
        <Sidebar aria-label="Menu administrativo">
          <SidebarTitle>Administração</SidebarTitle>

          {MENU.map((item) => (
            <SidebarItem
              key={item.path}
              type="button"
              $active={isActive(item)}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.label}
            </SidebarItem>
          ))}
        </Sidebar>

        <Content>
          <StatusLine $online={online}>
            {online
              ? "Conectado à API — alterações salvas no db.json"
              : "API offline — alterações salvas apenas neste navegador (rode npm run api)"}
          </StatusLine>

          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<CoursesAdmin />} />
            <Route path="posts" element={<PostsAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
            <Route path="top5" element={<TopFiveAdmin />} />
            <Route path="comments" element={<CommentsAdmin />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </Content>
      </Layout>
    </>
  );
};

export default Admin;
