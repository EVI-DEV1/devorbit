import { useMemo } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiFileText,
  FiThumbsUp,
  FiMessageSquare,
  FiUserCheck,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

import { useData } from "../../contexts/DataContext";
import { getTopFive } from "../../components/TopFive";
import { formatRelativeDate } from "../../utils/date";

import {
  PageHead,
  PageTitle,
  PageSubtitle,
  StatGrid,
  StatCard,
  Panel,
  PanelTitle,
  TwoColumns,
  InlineList,
} from "./styles";

const Dashboard = () => {
  const { users, courses, posts } = useData();

  const stats = useMemo(() => {
    const totalLikes = posts.reduce(
      (sum, post) => sum + Number(post.likes || 0) + (post.likedBy || []).length,
      0
    );

    const totalComments = posts.reduce(
      (sum, post) => sum + Number(post.comments || 0) + (post.commentsList || []).length,
      0
    );

    const totalSubscriptions = posts.reduce(
      (sum, post) => sum + Number(post.subscribers || 0) + (post.subscribedBy || []).length,
      0
    );

    const enrollments = users.reduce(
      (sum, user) => sum + Object.keys(user.progress || {}).length,
      0
    );

    const completions = users.reduce(
      (sum, user) =>
        sum + Object.values(user.progress || {}).filter((value) => Number(value) >= 100).length,
      0
    );

    return {
      totalLikes,
      totalComments,
      totalSubscriptions,
      enrollments,
      completions,
      admins: users.filter((user) => user.role === "admin").length,
      published: courses.filter((course) => course.status === "Publicado").length,
    };
  }, [users, courses, posts]);

  const topPosts = useMemo(
    () =>
      [...posts]
        .map((post) => ({
          ...post,
          score: Number(post.likes || 0) + (post.likedBy || []).length,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5),
    [posts]
  );

  const popularCourses = useMemo(() => {
    const counts = {};
    users.forEach((user) => {
      Object.keys(user.progress || {}).forEach((courseId) => {
        counts[courseId] = (counts[courseId] || 0) + 1;
      });
    });

    return courses
      .map((course) => ({ ...course, enrolled: counts[course.id] || counts[String(course.id)] || 0 }))
      .sort((a, b) => b.enrolled - a.enrolled)
      .slice(0, 5);
  }, [users, courses]);

  const recentUsers = useMemo(
    () =>
      [...users]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5),
    [users]
  );

  const topFive = getTopFive(users);

  return (
    <>
      <PageHead>
        <div>
          <PageTitle>Visão geral</PageTitle>
          <PageSubtitle>Estatísticas da plataforma em tempo real.</PageSubtitle>
        </div>
      </PageHead>

      <StatGrid>
        <StatCard>
          <FiUsers />
          <strong>{users.length}</strong>
          <span>
            usuários ({stats.admins} {stats.admins === 1 ? "admin" : "admins"})
          </span>
        </StatCard>

        <StatCard $color="#8B5CF6">
          <FiBookOpen />
          <strong>{courses.length}</strong>
          <span>cursos ({stats.published} publicados)</span>
        </StatCard>

        <StatCard $color="#4FC3F7">
          <FiFileText />
          <strong>{posts.length}</strong>
          <span>publicações no feed</span>
        </StatCard>

        <StatCard $color="#FFB547">
          <FiThumbsUp />
          <strong>{stats.totalLikes.toLocaleString("pt-BR")}</strong>
          <span>curtidas</span>
        </StatCard>

        <StatCard $color="#4FC3F7">
          <FiMessageSquare />
          <strong>{stats.totalComments.toLocaleString("pt-BR")}</strong>
          <span>comentários</span>
        </StatCard>

        <StatCard>
          <FiUserCheck />
          <strong>{stats.totalSubscriptions.toLocaleString("pt-BR")}</strong>
          <span>inscrições em publicações</span>
        </StatCard>

        <StatCard $color="#8B5CF6">
          <FiTrendingUp />
          <strong>{stats.enrollments}</strong>
          <span>matrículas em cursos</span>
        </StatCard>

        <StatCard $color="#FFB547">
          <FiAward />
          <strong>{stats.completions}</strong>
          <span>cursos concluídos</span>
        </StatCard>
      </StatGrid>

      <TwoColumns>
        <Panel>
          <PanelTitle>
            <FiThumbsUp /> Publicações mais curtidas
          </PanelTitle>
          <InlineList>
            {topPosts.map((post) => (
              <li key={post.id}>
                <span>{post.title}</span>
                <strong>{post.score}</strong>
              </li>
            ))}
          </InlineList>
        </Panel>

        <Panel>
          <PanelTitle>
            <FiBookOpen /> Cursos com mais matrículas
          </PanelTitle>
          <InlineList>
            {popularCourses.map((course) => (
              <li key={course.id}>
                <span>{course.name}</span>
                <strong>{course.enrolled}</strong>
              </li>
            ))}
          </InlineList>
        </Panel>

        <Panel>
          <PanelTitle>
            <FiAward /> Top 5 da semana
          </PanelTitle>
          <InlineList>
            {topFive.map((user, index) => (
              <li key={user.id}>
                <span>
                  {String(index + 1).padStart(2, "0")} {user.name}
                </span>
                <strong>{user.weeklyScore}%</strong>
              </li>
            ))}
          </InlineList>
        </Panel>

        <Panel>
          <PanelTitle>
            <FiUsers /> Últimos cadastros
          </PanelTitle>
          <InlineList>
            {recentUsers.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
                <strong>{formatRelativeDate(user.createdAt) || "—"}</strong>
              </li>
            ))}
          </InlineList>
        </Panel>
      </TwoColumns>
    </>
  );
};

export default Dashboard;
