import { useMemo, useState } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiShield } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { Modal } from "../../components/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import { USER_ROLES } from "../../data/users";
import { searchUsers } from "../../utils/search";
import { EMAIL_REGEX } from "../../utils/validation";
import { formatDate } from "../../utils/date";

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

const emptyUser = {
  name: "",
  email: "",
  senha: "",
  role: "user",
  profession: "",
  avatar: "",
  bio: "",
  skills: "",
  xp: 0,
  weeklyScore: 0,
};

const toForm = (user) => ({
  ...emptyUser,
  ...user,
  senha: "",
  skills: (user.skills || []).join(", "),
  xp: user.xp ?? 0,
  weeklyScore: user.weeklyScore ?? 0,
});

const ROLE_LABEL = { admin: "Administrador", user: "Usuário" };

const UsersAdmin = () => {
  const { user: admin } = useAuth();
  const { users, courses, createUser, updateUser, deleteUser } = useData();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyUser);

  const list = useMemo(() => searchUsers(users, search), [users, search]);

  const openNew = () => {
    setForm(emptyUser);
    setEditing("new");
  };

  const openEdit = (user) => {
    setForm(toForm(user));
    setEditing(user);
  };

  const close = () => setEditing(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();

    if (!form.name.trim()) {
      alert("Informe o nome.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    const duplicated = users.find(
      (item) =>
        item.email?.toLowerCase() === email &&
        (editing === "new" || String(item.id) !== String(editing.id))
    );

    if (duplicated) {
      alert("Já existe um usuário com este e-mail.");
      return;
    }

    if (editing === "new" && form.senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (editing !== "new" && form.senha && form.senha.length < 6) {
      alert("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      email,
      role: form.role,
      profession: form.profession.trim(),
      avatar: form.avatar.trim(),
      bio: form.bio.trim(),
      skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      xp: Number(form.xp) || 0,
      weeklyScore: Math.max(0, Math.min(100, Number(form.weeklyScore) || 0)),
    };

    if (form.senha) payload.senha = form.senha;

    if (editing === "new") {
      createUser({
        ...payload,
        cover: "",
        location: "",
        github: "",
        linkedin: "",
        portfolio: "",
        projects: [],
        progress: {},
      });
    } else {
      updateUser(editing.id, payload);
    }

    close();
  };

  const handleDelete = (user) => {
    if (String(user.id) === String(admin?.id)) {
      alert("Você não pode excluir a própria conta por aqui.");
      return;
    }

    const confirmed = window.confirm(`Excluir o usuário "${user.name}"?`);
    if (!confirmed) return;
    deleteUser(user.id);
  };

  const countCourses = (user) => Object.keys(user.progress || {}).length;

  return (
    <>
      <PageHead>
        <div>
          <PageTitle>Usuários</PageTitle>
          <PageSubtitle>
            Cadastre, edite e defina permissões. {courses.length} cursos disponíveis para
            matrícula.
          </PageSubtitle>
        </div>

        <PrimaryButton type="button" onClick={openNew}>
          <FiPlus /> Novo usuário
        </PrimaryButton>
      </PageHead>

      <Toolbar>
        <SearchInput
          placeholder="Buscar por nome, e-mail, cargo ou habilidade..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Toolbar>

      <TableWrapper>
        {list.length === 0 ? (
          <EmptyRow>Nenhum usuário encontrado.</EmptyRow>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Perfil</th>
                <th>XP</th>
                <th>Cursos</th>
                <th>Semana</th>
                <th>Cadastro</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Cell $round>
                      <img src={user.avatar || defaultAvatar} alt="" />
                      <div>
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                    </Cell>
                  </td>
                  <td>
                    <Badge $color={user.role === "admin" ? "#8B5CF6" : undefined}>
                      {user.role === "admin" && <FiShield style={{ verticalAlign: "-2px" }} />}{" "}
                      {ROLE_LABEL[user.role] || "Usuário"}
                    </Badge>
                  </td>
                  <td>{Number(user.xp || 0).toLocaleString("pt-BR")}</td>
                  <td>{countCourses(user)}</td>
                  <td>{Number(user.weeklyScore || 0)}%</td>
                  <td style={{ whiteSpace: "nowrap" }}>{formatDate(user.createdAt) || "—"}</td>
                  <td>
                    <RowActions>
                      <IconButton type="button" onClick={() => openEdit(user)} title="Editar">
                        <FiEdit3 />
                      </IconButton>
                      <IconButton
                        type="button"
                        $danger
                        onClick={() => handleDelete(user)}
                        title="Excluir"
                        disabled={String(user.id) === String(admin?.id)}
                      >
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
        <Modal title={editing === "new" ? "Novo usuário" : "Editar usuário"} onClose={close}>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <Field>
                <label htmlFor="user-name">Nome</label>
                <Input id="user-name" name="name" value={form.name} onChange={handleChange} maxLength={80} required />
              </Field>

              <Field>
                <label htmlFor="user-email">E-mail</label>
                <Input id="user-email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </Field>
            </FormRow>

            <FormRow>
              <Field>
                <label htmlFor="user-password">
                  {editing === "new" ? "Senha" : "Nova senha (opcional)"}
                </label>
                <Input
                  id="user-password"
                  name="senha"
                  type="password"
                  autoComplete="new-password"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder={editing === "new" ? "Mínimo 6 caracteres" : "Deixe em branco para manter"}
                />
              </Field>

              <Field>
                <label htmlFor="user-role">Permissão</label>
                <Select
                  id="user-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={editing !== "new" && String(editing.id) === String(admin?.id)}
                >
                  {USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {ROLE_LABEL[role]}
                    </option>
                  ))}
                </Select>
                {editing !== "new" && String(editing.id) === String(admin?.id) && (
                  <small>Você não pode remover a própria permissão de administrador.</small>
                )}
              </Field>
            </FormRow>

            <FormRow>
              <Field>
                <label htmlFor="user-profession">Cargo</label>
                <Input id="user-profession" name="profession" value={form.profession} onChange={handleChange} maxLength={60} />
              </Field>

              <Field>
                <label htmlFor="user-avatar">URL do avatar</label>
                <Input id="user-avatar" name="avatar" type="url" placeholder="https://..." value={form.avatar} onChange={handleChange} />
              </Field>
            </FormRow>

            <Field>
              <label htmlFor="user-bio">Biografia</label>
              <TextArea id="user-bio" name="bio" value={form.bio} onChange={handleChange} maxLength={500} />
            </Field>

            <Field>
              <label htmlFor="user-skills">Habilidades</label>
              <Input id="user-skills" name="skills" placeholder="React, Node.js" value={form.skills} onChange={handleChange} />
            </Field>

            <FormRow>
              <Field>
                <label htmlFor="user-xp">XP</label>
                <Input id="user-xp" name="xp" type="number" min="0" value={form.xp} onChange={handleChange} />
              </Field>

              <Field>
                <label htmlFor="user-weekly">Pontuação da semana (Top 5)</label>
                <Input id="user-weekly" name="weeklyScore" type="number" min="0" max="100" value={form.weeklyScore} onChange={handleChange} />
                <small>0 a 100. Os 5 maiores aparecem no Top 5.</small>
              </Field>
            </FormRow>

            <FormActions>
              <GhostButton type="button" onClick={close}>
                Cancelar
              </GhostButton>
              <PrimaryButton type="submit">
                {editing === "new" ? "Cadastrar" : "Salvar alterações"}
              </PrimaryButton>
            </FormActions>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default UsersAdmin;
