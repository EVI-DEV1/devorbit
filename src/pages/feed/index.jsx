import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";

import Header from "../../components/Header";
import { Card } from "../../components/Card";
import { CreatePost } from "../../components/CreatePost";
import { CommunityChat } from "../../components/CommunityChat";
import { CourseCard } from "../../components/CourseCard";

import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import { useCourseProgress } from "../../hooks/useCourseProgress";
import { searchCourses, searchPosts } from "../../utils/search";

import {
  Container,
  Column,
  Sidebar,
  FeedHeader,
  Title,
  Subtitle,
  EmptyState,
  AdminMessage,
  SearchResults,
  SearchResultsTitle,
  CourseGrid,
} from "./styles";

const Feed = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, isAdmin } = useAuth();
  const { posts, courses, createPost, updatePost, deletePost } = useData();
  const { enroll, unenroll, advance } = useCourseProgress();

  // A busca pode chegar pela URL (/feed?q=react) vinda de outra página.
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const fromUrl = searchParams.get("q") || "";
    if (fromUrl && fromUrl !== search) {
      setSearch(fromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (value) => {
    setSearch(value);
    if (searchParams.get("q")) {
      setSearchParams({}, { replace: true });
    }
  };

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      ),
    [posts]
  );

  const filteredPosts = useMemo(() => searchPosts(sortedPosts, search), [sortedPosts, search]);

  const matchedCourses = useMemo(() => {
    if (!search.trim()) return [];
    return searchCourses(
      courses.filter((course) => course.status !== "Rascunho"),
      search
    );
  }, [courses, search]);

  const courseById = useMemo(
    () => Object.fromEntries(courses.map((course) => [String(course.id), course])),
    [courses]
  );

  const handleCreatePost = (postData) => {
    if (!isAdmin) {
      alert("Somente administradores podem criar publicações.");
      return;
    }

    createPost({
      userId: user?.id,
      user: user?.name || "Administrador",
      avatar: user?.avatar || "",
      banner: postData.banner || "",
      bannerKey: postData.bannerKey || "",
      title: postData.title,
      description: postData.description,
      tags: postData.tags || [],
      likes: 0,
      comments: 0,
      likedBy: [],
      savedBy: [],
      commentsList: [],
      subscribers: 0,
      subscribedBy: [],
      courseUrl: postData.courseUrl || "",
      courseId: postData.courseId || null,
    });
  };

  const handleDeletePost = (postId) => {
    if (!isAdmin) {
      alert("Somente administradores podem apagar publicações.");
      return;
    }

    const confirmed = window.confirm("Deseja realmente apagar esta publicação?");
    if (!confirmed) return;

    deletePost(postId);
  };

  // Inscrever-se num post vinculado a um curso matricula o usuário.
  const handleUpdatePost = (post, changes) => {
    updatePost(post.id, changes);

    if (changes.subscribedBy && post.courseId) {
      const userId = String(user?.id || user?.email);
      if (changes.subscribedBy.includes(userId)) {
        enroll(post.courseId);
      } else {
        unenroll(post.courseId);
      }
    }
  };

  const handleAccessCourse = (post) => {
    if (post.courseId) advance(post.courseId, 10);
  };

  const hasSearch = Boolean(search.trim());
  const nothingFound = hasSearch && filteredPosts.length === 0 && matchedCourses.length === 0;

  return (
    <>
      <Header variant="feed" search={search} setSearch={handleSearch} />

      <Container>
        <Column>
          <FeedHeader>
            <Title>Comunidade Dev</Title>
            <Subtitle>
              Compartilhe seus projetos, estudos e conquistas com outros
              desenvolvedores.
            </Subtitle>
          </FeedHeader>

          {isAdmin ? (
            <CreatePost user={user} courses={courses} onCreate={handleCreatePost} />
          ) : (
            <AdminMessage>
              As novas publicações são adicionadas pelos administradores da
              plataforma.
            </AdminMessage>
          )}

          {nothingFound && <EmptyState>Nenhum conteúdo encontrado.</EmptyState>}

          {matchedCourses.length > 0 && (
            <SearchResults>
              <SearchResultsTitle>
                <FiBookOpen />
                Cursos encontrados ({matchedCourses.length})
              </SearchResultsTitle>

              <CourseGrid>
                {matchedCourses.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} compact />
                ))}
              </CourseGrid>
            </SearchResults>
          )}

          {hasSearch && filteredPosts.length > 0 && (
            <SearchResultsTitle as="h3">
              Publicações encontradas ({filteredPosts.length})
            </SearchResultsTitle>
          )}

          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              post={post}
              currentUser={user}
              isAdmin={isAdmin}
              courseUrl={courseById[String(post.courseId)]?.url}
              onUpdate={(changes) => handleUpdatePost(post, changes)}
              onDelete={handleDeletePost}
              onEdit={isAdmin ? (item) => navigate(`/admin/posts?edit=${item.id}`) : undefined}
              onAccessCourse={handleAccessCourse}
            />
          ))}
        </Column>

        <Sidebar>
          <CommunityChat currentUser={user} />
        </Sidebar>
      </Container>
    </>
  );
};

export default Feed;
