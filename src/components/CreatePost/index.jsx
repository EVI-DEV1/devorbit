import { useRef, useState } from "react";
import {
  FiEdit3,
  FiImage,
  FiX,
  FiLink,
} from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";

import {
  Container,
  OpenButton,
  Composer,
  Header,
  UserAvatar,
  UserInfo,
  Form,
  Input,
  TextArea,
  Actions,
  ImageButton,
  PublishButton,
  CancelButton,
  HiddenInput,
  PreviewContainer,
  PreviewImage,
  RemoveImageButton,
  HelperText,
  FieldGroup,
  Label,
  Select,
} from "./styles";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const CreatePost = ({ user, onCreate, courses = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    courseUrl: "",
    courseId: "",
  });

  const [image, setImage] = useState("");

  const linkedCourse = courses.find(
    (course) => String(course.id) === String(formData.courseId)
  );

  // Ao vincular um curso, sugere link e tags a partir dele.
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    const course = courses.find((item) => String(item.id) === courseId);

    setFormData((currentData) => ({
      ...currentData,
      courseId,
      courseUrl: currentData.courseUrl || course?.url || "",
      tags: currentData.tags || (course?.tags || []).join(", "),
    }));
  };

  const imageInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = () => {
        reject(new Error("Não foi possível ler a imagem."));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleImageSelected = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Selecione somente um arquivo de imagem.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("A imagem deve ter no máximo 2 MB.");
      event.target.value = "";
      return;
    }

    try {
      const imageBase64 = await convertToBase64(file);

      setImage(imageBase64);
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar a imagem.");
    } finally {
      event.target.value = "";
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: "",
      courseUrl: "",
      courseId: "",
    });

    setImage("");
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Informe o título da publicação.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Escreva uma descrição para a publicação.");
      return;
    }

    if (
      formData.courseUrl &&
      !formData.courseUrl.startsWith("http://") &&
      !formData.courseUrl.startsWith("https://")
    ) {
      alert("Digite um link válido começando com http:// ou https://.");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onCreate({
      title: formData.title.trim(),
      description: formData.description.trim(),
      tags,
      banner: image,
      bannerKey: !image && linkedCourse ? linkedCourse.bannerKey : "",
      courseUrl: formData.courseUrl.trim(),
      courseId: linkedCourse ? linkedCourse.id : null,
    });

    resetForm();
  };

  if (!isOpen) {
    return (
      <Container>
        <OpenButton
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <FiEdit3 />

          <span>Escrever uma publicação</span>
        </OpenButton>
      </Container>
    );
  }

  return (
    <Container>
      <Composer>
        <Header>
          <UserAvatar
            src={user?.avatar || defaultAvatar}
            alt={user?.name || "Usuário"}
          />

          <UserInfo>
            <strong>{user?.name || "Administrador"}</strong>

            <span>
              Adicione um novo curso à comunidade
            </span>
          </UserInfo>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="post-title">
              Título do curso
            </Label>

            <Input
              id="post-title"
              name="title"
              placeholder="Ex.: Curso completo de React"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="post-description">
              Descrição
            </Label>

            <TextArea
              id="post-description"
              name="description"
              placeholder="Descreva o conteúdo do curso..."
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
            />

            <HelperText>
              {formData.description.length}/1000 caracteres
            </HelperText>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="post-tags">
              Tecnologias
            </Label>

            <Input
              id="post-tags"
              name="tags"
              placeholder="Ex.: React, Hooks, JavaScript"
              value={formData.tags}
              onChange={handleChange}
            />
          </FieldGroup>

          {courses.length > 0 && (
            <FieldGroup>
              <Label htmlFor="post-course">Curso vinculado (opcional)</Label>

              <Select
                id="post-course"
                name="courseId"
                value={formData.courseId}
                onChange={handleCourseChange}
              >
                <option value="">Nenhum — publicação livre</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} · {course.category}
                  </option>
                ))}
              </Select>

              <HelperText>
                Inscrições nesta publicação matriculam o usuário no curso e, sem capa
                própria, o banner do curso é usado.
              </HelperText>
            </FieldGroup>
          )}

          <FieldGroup>
            <Label htmlFor="course-url">
              Link direto do curso
            </Label>

            <div style={{ position: "relative" }}>
              <FiLink
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#00e676",
                }}
              />

              <Input
                id="course-url"
                name="courseUrl"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.courseUrl}
                onChange={handleChange}
                style={{
                  paddingLeft: "44px",
                }}
              />
            </div>

            <HelperText>
              Cole o link do primeiro vídeo com a playlist ou o link direto da
              playlist.
            </HelperText>
          </FieldGroup>

          {image && (
            <PreviewContainer>
              <PreviewImage
                src={image}
                alt="Pré-visualização da publicação"
              />

              <RemoveImageButton
                type="button"
                onClick={() => setImage("")}
                aria-label="Remover imagem"
              >
                <FiX />
              </RemoveImageButton>
            </PreviewContainer>
          )}

          <Actions>
            <ImageButton
              type="button"
              onClick={() => imageInputRef.current?.click()}
            >
              <FiImage />
              Adicionar capa
            </ImageButton>

            <div>
              <CancelButton
                type="button"
                onClick={resetForm}
              >
                Cancelar
              </CancelButton>

              <PublishButton type="submit">
                Publicar curso
              </PublishButton>
            </div>
          </Actions>

          <HiddenInput
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelected}
          />
        </Form>
      </Composer>
    </Container>
  );
};

export { CreatePost };