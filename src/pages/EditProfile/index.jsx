import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";

import {
  Container,
  Card,
  Title,
  Label,
  Input,
  TextArea,
  Button,
  SecondaryButton,
  Actions,
  Helper,
} from "./styles";

// Projetos são editados em texto: uma linha por projeto, "Nome - descrição".
const projectsToText = (projects = []) =>
  projects.map((project) => `${project.name}${project.description ? ` - ${project.description}` : ""}`).join("\n");

const textToProjects = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split(" - ");
      return { name: name.trim(), description: rest.join(" - ").trim() };
    });

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    profession: user?.profession || "",
    location: user?.location || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    portfolio: user?.portfolio || "",
    bio: user?.bio || "",
    skills: (user?.skills || []).join(", "),
    projects: projectsToText(user?.projects),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Informe seu nome.");
      return;
    }

    try {
      setSaving(true);

      updateProfile({
        name: formData.name.trim(),
        profession: formData.profession.trim(),
        location: formData.location.trim(),
        github: formData.github.trim(),
        linkedin: formData.linkedin.trim(),
        portfolio: formData.portfolio.trim(),
        bio: formData.bio.trim(),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        projects: textToProjects(formData.projects),
      });

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />

      <Container>
        <Card as="form" onSubmit={handleSave}>
          <Title>Editar perfil</Title>

          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} maxLength={80} />

          <Label htmlFor="profession">Cargo / profissão</Label>
          <Input
            id="profession"
            name="profession"
            placeholder="Ex.: Desenvolvedora Frontend"
            value={formData.profession}
            onChange={handleChange}
            maxLength={60}
          />

          <Label htmlFor="location">Cidade</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} maxLength={60} />

          <Label htmlFor="github">GitHub</Label>
          <Input id="github" name="github" type="url" placeholder="https://github.com/usuario" value={formData.github} onChange={handleChange} />

          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/usuario" value={formData.linkedin} onChange={handleChange} />

          <Label htmlFor="portfolio">Portfólio</Label>
          <Input id="portfolio" name="portfolio" type="url" placeholder="https://..." value={formData.portfolio} onChange={handleChange} />

          <Label htmlFor="bio">Biografia</Label>
          <TextArea id="bio" name="bio" rows={4} placeholder="Conte um pouco sobre você..." value={formData.bio} onChange={handleChange} maxLength={500} />

          <Label htmlFor="skills">Habilidades</Label>
          <Input
            id="skills"
            name="skills"
            placeholder="Separadas por vírgula. Ex: React, JavaScript, CSS"
            value={formData.skills}
            onChange={handleChange}
          />

          <Label htmlFor="projects">Projetos</Label>
          <TextArea
            id="projects"
            name="projects"
            rows={4}
            placeholder={"Um por linha: Nome - descrição\nEx.: DevOrbit - Plataforma de comunidade"}
            value={formData.projects}
            onChange={handleChange}
          />
          <Helper>Um projeto por linha, no formato “Nome - descrição”.</Helper>

          <Actions>
            <SecondaryButton type="button" onClick={() => navigate("/profile")}>
              Cancelar
            </SecondaryButton>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar perfil"}
            </Button>
          </Actions>
        </Card>
      </Container>
    </>
  );
};

export default EditProfile;
