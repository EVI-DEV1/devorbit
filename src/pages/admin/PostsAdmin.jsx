import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiPlus, FiEdit3, FiTrash2, FiThumbsUp, FiMessageSquare } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { Modal } from "../../components/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import { resolveBanner } from "../../data/banners";
import { searchPosts } from "../../utils/search";
import { formatRelativeDate } from "../../utils/date";

import { BannerField } from "./BannerField";

import {
  PageHead,
  PageTitle,
  PageSubtitle,
  Toolbar,
  SearchInput,
  PrimaryButton,
  GhostButton,
  TableWrapper,
  Table,
  Cell,
  RowActions,
  IconButton,
  EmptyRow,
  Form,
  FormRow,
  Field,
  Input,
  TextArea,
  Select,
  FormActions,
} from "./styles";

const emptyPost = {
  title: "",
  description: "",
  tags: "",
  userId: "",
  user: "",
  avatar: "",
  courseId: "",
  courseUrl: "",
  banner: "",
  bannerKey: "",
};

const toForm = (post) => ({
  ...emptyPost,
  ...post,
  tags: (post.tags || []).join(", "),
  userId: post.userId ?? "",
  courseId: post.courseId ?? "",
});

const PostsAdmin = () => {
  const { user: admin } = useAuth();
  const { posts, users, courses, createPost, updatePost, deletePost } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    [posts]
  );

  const list = useMemo(() => searchPosts(sorted, search), [sorted, search]);

  // /admin/posts?edit=ID — vindo do botão "editar" do feed.
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (!editId) return;

    const post = posts.find((item) => String(item.id) === editId);
    if (post) {
      setForm(toForm(post));
      setEditing(post);
    }
    setSearchParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const openNew = () => {
    setForm({
      ...emptyPost,
      userId: admin?.id ?? "",
      user: admin?.name || "",
      avatar: admin?.avatar || "",
    });
    setEditing("new");
  };

  const openEdit = (post) => {
    setForm(toForm(post));
    setEditing(post);
  };

  const close = () => setEditing(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleAuthorChange = (event) => {
    const user = users.find((item) => String(item.id) === event.target.value);
    setForm((current) => ({
      ...current,
      userId: user?.id ?? "",
      user: user?.name || current.user,
      avatar: user?.avatar || "",
    }));
  };

  const handleCourseChange = (event) => {
    const course = courses.find((item) => String(item.id) === event.target.value);
    setForm((current) => ({
      ...current,
      courseId: course?.id ?? "",
      courseUrl: current.courseUrl || course?.url || "",
      tags: current.tags || (course?.tags || []).join(", "),
      bannerKey: current.banner || current.bannerKey ? current.bannerKey : course?.bannerKey || "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Informe o título da publicação.");
      return;
    }

    if (
      form.courseUrl &&
      !form.courseUrl.startsWith("http://") &&
      !form.courseUrl.startsWith("https://")
    ) {
      alert("Digite um link válido começando com http:// ou https://.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      userId: form.userId === "" ? null : form.userId,
      user: form.user.trim() || "DevOrbit",
      avatar: form.avatar,
      courseId: form.courseId === "" ? null : form.courseId,
      courseUrl: form.courseUrl.trim(),
      banner: form.banner,
      bannerKey: form.bannerKey,
    };

    if (editing === "new") {
      createPost({
        ...payload,
        likes: 0,
        comments: 0,
        likedBy: [],
        savedBy: [],
        commentsList: [],
        subscribers: 0,
        subscribedBy: [],
      });
    } else {
      updatePost(editing.id, payload);
    }

    close();
  };

  const handleDelete = (post) => {
    const confirmed = window.confirm(`Excluir a publicação "${post.title}"?`);
    if (!confirmed) return;
    deletePost(post.id);
  };

  return (
    <>
      <PageHead>
        <div>
          <PageTitle>Publicações</PageTitle>
          <PageSubtitle>Conteúdo do feed da comunidade.</PageSubtitle>
        </div>

        <PrimaryButton type="button" onClick={openNew}>
          <FiPlus /> Nova publicação
        </PrimaryButton>
      </PageHead>

      <Toolbar>
        <SearchInput
          placeholder="Buscar por título, autor ou tag..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Toolbar>

      <TableWrapper>
        {list.length === 0 ? (
          <EmptyRow>Nenhuma publicação encontrada.</EmptyRow>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Publicação</th>
                <th>Autor</th>
                <th>Engajamento</th>
                <th>Data</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((post) => {
                const likes = Number(post.likes || 0) + (post.likedBy || []).length;
                const comments = Number(post.comments || 0) + (post.commentsList || []).length;

                return (
                  <tr key={post.id}>
                    <td>
                      <Cell>
                        {resolveBanner(post) && <img src={resolveBanner(post)} alt="" />}
                        <div>
                          <strong>{post.title}</strong>
                          <small>{(post.tags || []).map((tag) => `#${tag}`).join(" ")}</small>
                        </div>
                      </Cell>
                    </td>
                    <td>
                      <Cell $round>
                        <img src={post.avatar || defaultAvatar} alt="" />
                        <div>
                          <strong>{post.user}</strong>
                        </div>
                      </Cell>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <FiThumbsUp style={{ verticalAlign: "-2px" }} /> {likes}
                      {"  "}
                      <FiMessageSquare style={{ verticalAlign: "-2px", marginLeft: 10 }} /> {comments}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {formatRelativeDate(post.createdAt) || post.time}
                    </td>
                    <td>
                      <RowActions>
                        <IconButton type="button" onClick={() => openEdit(post)} title="Editar">
                          <FiEdit3 />
                        </IconButton>
                        <IconButton type="button" $danger onClick={() => handleDelete(post)} title="Excluir">
                          <FiTrash2 />
                        </IconButton>
                      </RowActions>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </TableWrapper>

      {editing && (
        <Modal title={editing === "new" ? "Nova publicação" : "Editar publicação"} onClose={close} width="720px">
          <Form onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="post-title">Título</label>
              <Input id="post-title" name="title" value={form.title} onChange={handleChange} maxLength={100} required />
            </Field>

            <Field>
              <label htmlFor="post-description">Descrição</label>
              <TextArea id="post-description" name="description" value={form.description} onChange={handleChange} maxLength={1000} />
            </Field>

            <FormRow>
              <Field>
                <label htmlFor="post-author">Autor</label>
                <Select id="post-author" value={form.userId} onChange={handleAuthorChange}>
                  <option value="">— digitar manualmente —</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <label htmlFor="post-author-name">Nome exibido</label>
                <Input id="post-author-name" name="user" value={form.user} onChange={handleChange} maxLength={60} />
              </Field>
            </FormRow>

            <FormRow>
              <Field>
                <label htmlFor="post-course">Curso vinculado</label>
                <Select id="post-course" value={form.courseId} onChange={handleCourseChange}>
                  <option value="">Nenhum</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <label htmlFor="post-course-url">Link do curso</label>
                <Input id="post-course-url" name="courseUrl" type="url" placeholder="https://..." value={form.courseUrl} onChange={handleChange} />
              </Field>
            </FormRow>

            <Field>
              <label htmlFor="post-tags">Tags</label>
              <Input id="post-tags" name="tags" placeholder="React, Hooks" value={form.tags} onChange={handleChange} />
              <small>Separadas por vírgula.</small>
            </Field>

            <BannerField
              value={{ banner: form.banner, bannerKey: form.bannerKey }}
              onChange={(banner) => setForm((current) => ({ ...current, ...banner }))}
            />

            <FormActions>
              <GhostButton type="button" onClick={close}>
                Cancelar
              </GhostButton>
              <PrimaryButton type="submit">
                {editing === "new" ? "Publicar" : "Salvar alterações"}
              </PrimaryButton>
            </FormActions>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default PostsAdmin;
