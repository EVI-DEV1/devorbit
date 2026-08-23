import { useMemo, useState } from "react";
import { FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { Modal } from "../../components/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import { COURSE_CATEGORIES, COURSE_LEVELS, COURSE_STATUS } from "../../data/courses";
import { resolveBanner } from "../../data/banners";
import { searchCourses } from "../../utils/search";

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
  Badge,
  EmptyRow,
  Form,
  FormRow,
  Field,
  Input,
  TextArea,
  Select,
  FormActions,
} from "./styles";

const STATUS_COLORS = {
  Publicado: "#00E676",
  Rascunho: "#A9A4B8",
  "Em breve": "#FFB547",
};

const emptyCourse = {
  name: "",
  description: "",
  author: "",
  authorAvatar: "",
  category: COURSE_CATEGORIES[0],
  level: COURSE_LEVELS[0],
  status: "Publicado",
  tags: "",
  duration: "",
  lessons: "",
  url: "",
  banner: "",
  bannerKey: "",
};

const toForm = (course) => ({
  ...emptyCourse,
  ...course,
  tags: (course.tags || []).join(", "),
  lessons: course.lessons ?? "",
});

const CoursesAdmin = () => {
  const { user: admin } = useAuth();
  const { courses, users, createCourse, updateCourse, deleteCourse } = useData();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null | "new" | course
  const [form, setForm] = useState(emptyCourse);

  const list = useMemo(() => searchCourses(courses, search), [courses, search]);

  const openNew = () => {
    setForm({ ...emptyCourse, author: admin?.name || "", authorAvatar: admin?.avatar || "" });
    setEditing("new");
  };

  const openEdit = (course) => {
    setForm(toForm(course));
    setEditing(course);
  };

  const close = () => setEditing(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  // Selecionar um usuário como autor preenche nome e avatar.
  const handleAuthorSelect = (event) => {
    const user = users.find((item) => String(item.id) === event.target.value);
    if (!user) return;
    setForm((current) => ({ ...current, author: user.name, authorAvatar: user.avatar || "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Informe o nome do curso.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      author: form.author.trim() || "DevOrbit",
      authorAvatar: form.authorAvatar,
      category: form.category,
      level: form.level,
      status: form.status,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      duration: form.duration.trim(),
      lessons: form.lessons === "" ? "" : Number(form.lessons),
      url: form.url.trim(),
      banner: form.banner,
      bannerKey: form.bannerKey,
    };

    if (editing === "new") {
      createCourse(payload);
    } else {
      updateCourse(editing.id, payload);
    }

    close();
  };

  const handleDelete = (course) => {
    const confirmed = window.confirm(
      `Excluir o curso "${course.name}"? O progresso dos alunos neste curso deixará de aparecer.`
    );
    if (!confirmed) return;
    deleteCourse(course.id);
  };

  return (
    <>
      <PageHead>
        <div>
          <PageTitle>Cursos</PageTitle>
          <PageSubtitle>
            Crie, edite e organize o catálogo. Cursos em rascunho não aparecem para os
            usuários.
          </PageSubtitle>
        </div>

        <PrimaryButton type="button" onClick={openNew}>
          <FiPlus /> Novo curso
        </PrimaryButton>
      </PageHead>

      <Toolbar>
        <SearchInput
          placeholder="Buscar por nome, autor, categoria ou tag..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Toolbar>

      <TableWrapper>
        {list.length === 0 ? (
          <EmptyRow>Nenhum curso encontrado.</EmptyRow>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Nível</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((course) => (
                <tr key={course.id}>
                  <td>
                    <Cell>
                      {resolveBanner(course) && (
                        <img src={resolveBanner(course)} alt="" />
                      )}
                      <div>
                        <strong>{course.name}</strong>
                        <small>{(course.tags || []).map((tag) => `#${tag}`).join(" ")}</small>
                      </div>
                    </Cell>
                  </td>
                  <td>
                    <Cell $round>
                      <img src={course.authorAvatar || defaultAvatar} alt="" />
                      <div>
                        <strong>{course.author}</strong>
                      </div>
                    </Cell>
                  </td>
                  <td>{course.category}</td>
                  <td>{course.level}</td>
                  <td>
                    <Badge $color={STATUS_COLORS[course.status]}>{course.status}</Badge>
                  </td>
                  <td>
                    <RowActions>
                      <IconButton type="button" onClick={() => openEdit(course)} title="Editar">
                        <FiEdit3 />
                      </IconButton>
                      <IconButton type="button" $danger onClick={() => handleDelete(course)} title="Excluir">
                        <FiTrash2 />
                      </IconButton>
                    </RowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>

      {editing && (
        <Modal title={editing === "new" ? "Novo curso" : "Editar curso"} onClose={close} width="720px">
          <Form onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="course-name">Nome do curso</label>
              <Input id="course-name" name="name" value={form.name} onChange={handleChange} maxLength={80} required />
            </Field>

            <Field>
              <label htmlFor="course-description">Descrição</label>
              <TextArea id="course-description" name="description" value={form.description} onChange={handleChange} maxLength={600} />
            </Field>

            <FormRow>
              <Field>
                <label htmlFor="course-author-select">Autor (usuário)</label>
                <Select id="course-author-select" value="" onChange={handleAuthorSelect}>
                  <option value="">— selecionar da lista —</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <label htmlFor="course-author">Nome do autor</label>
                <Input id="course-author" name="author" value={form.author} onChange={handleChange} maxLength={60} />
              </Field>
            </FormRow>

            <FormRow $cols={3}>
              <Field>
                <label htmlFor="course-category">Categoria</label>
                <Select id="course-category" name="category" value={form.category} onChange={handleChange}>
                  {COURSE_CATEGORIES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>

              <Field>
                <label htmlFor="course-level">Nível</label>
                <Select id="course-level" name="level" value={form.level} onChange={handleChange}>
                  {COURSE_LEVELS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>

              <Field>
                <label htmlFor="course-status">Status</label>
                <Select id="course-status" name="status" value={form.status} onChange={handleChange}>
                  {COURSE_STATUS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
            </FormRow>

            <Field>
              <label htmlFor="course-tags">Tecnologias / tags</label>
              <Input id="course-tags" name="tags" placeholder="React, Hooks, JavaScript" value={form.tags} onChange={handleChange} />
              <small>Separadas por vírgula.</small>
            </Field>

            <FormRow $cols={3}>
              <Field>
                <label htmlFor="course-duration">Duração</label>
                <Input id="course-duration" name="duration" placeholder="Ex.: 24h" value={form.duration} onChange={handleChange} />
              </Field>

              <Field>
                <label htmlFor="course-lessons">Aulas</label>
                <Input id="course-lessons" name="lessons" type="number" min="0" value={form.lessons} onChange={handleChange} />
              </Field>

              <Field>
                <label htmlFor="course-url">Link das aulas</label>
                <Input id="course-url" name="url" type="url" placeholder="https://..." value={form.url} onChange={handleChange} />
              </Field>
            </FormRow>

            <BannerField
              value={{ banner: form.banner, bannerKey: form.bannerKey }}
              onChange={(banner) => setForm((current) => ({ ...current, ...banner }))}
            />

            <FormActions>
              <GhostButton type="button" onClick={close}>
                Cancelar
              </GhostButton>
              <PrimaryButton type="submit">
                {editing === "new" ? "Criar curso" : "Salvar alterações"}
              </PrimaryButton>
            </FormActions>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default CoursesAdmin;
