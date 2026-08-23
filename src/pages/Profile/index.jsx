import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import defaultAvatar from "../../assets/avatar-default.svg";

import Header from "../../components/Header";
import { ProfileHeader } from "../../components/ProfileHeader";
import { ProfileStats } from "../../components/ProfileStats";
import { ProfileSkills } from "../../components/ProfileSkills";
import { ProfileProjects } from "../../components/ProfileProjects";
import { ProfileCourses } from "../../components/ProfileCourses";
import { ImageViewer } from "../../components/ImageViewer";
import { ImageMenu } from "../../components/ImageMenu";

import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";

import {
  Container,
  ProfileContentCard,
  Bio,
  Location,
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
  AdminTag,
} from "./styles";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAdmin, updateProfile } = useAuth();
  const { courses, posts } = useData();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageMenu, setImageMenu] = useState(null);
  const [isSavingImage, setIsSavingImage] = useState(false);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Cursos com progresso do usuário (para estatísticas e lista).
  const myCourses = useMemo(() => {
    const progress = user?.progress || {};

    return courses
      .filter((course) => Object.prototype.hasOwnProperty.call(progress, course.id) ||
        Object.prototype.hasOwnProperty.call(progress, String(course.id)))
      .map((course) => ({
        ...course,
        percent: Number(progress[course.id] ?? progress[String(course.id)] ?? 0),
      }))
      .sort((a, b) => b.percent - a.percent);
  }, [courses, user]);

  const completedCourses = myCourses.filter((course) => course.percent >= 100).length;

  const savedPosts = useMemo(() => {
    const id = String(user?.id || user?.email);
    return posts.filter((post) => (post.savedBy || []).includes(id)).length;
  }, [posts, user]);

  const statsItems = [
    { label: "XP", value: `⭐ ${Number(user?.xp || 0).toLocaleString("pt-BR")}` },
    { label: "Cursos", value: `📚 ${myCourses.length}` },
    { label: "Concluídos", value: `🎓 ${completedCourses}` },
    { label: "Projetos", value: `🏆 ${(user?.projects || []).length}` },
    { label: "Salvos", value: `🔖 ${savedPosts}` },
  ];

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
      reader.readAsDataURL(file);
    });

  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem.");
      return false;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("A imagem deve ter no máximo 2 MB.");
      return false;
    }

    return true;
  };

  const saveImage = async (field, imageBase64) => {
    try {
      setIsSavingImage(true);
      updateProfile({ [field]: imageBase64 });
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      alert("Não foi possível salvar a imagem.");
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleImageSelected = async (event, field) => {
    const file = event.target.files?.[0];

    if (!file || !validateImage(file)) {
      event.target.value = "";
      return;
    }

    try {
      const imageBase64 = await convertToBase64(file);
      await saveImage(field, imageBase64);
    } catch (error) {
      console.error(error);
      alert("Não foi possível processar a imagem.");
    } finally {
      event.target.value = "";
    }
  };

  const handleViewImage = () => {
    if (imageMenu === "avatar") {
      setSelectedImage(user?.avatar || defaultAvatar);
    }

    if (imageMenu === "cover") {
      if (!user?.cover) {
        alert("Nenhuma foto de capa foi adicionada.");
      } else {
        setSelectedImage(user.cover);
      }
    }

    setImageMenu(null);
  };

  const handleUploadImage = () => {
    if (imageMenu === "avatar") avatarInputRef.current?.click();
    if (imageMenu === "cover") coverInputRef.current?.click();
    setImageMenu(null);
  };

  const handleRemoveImage = async () => {
    const confirmed = window.confirm(
      imageMenu === "avatar"
        ? "Deseja remover sua foto de perfil?"
        : "Deseja remover sua foto de capa?"
    );

    if (!confirmed) return;

    await saveImage(imageMenu, "");
    setImageMenu(null);
  };

  if (!user) {
    return (
      <>
        <Header variant="home" />
        <Container>
          <ProfileContentCard>
            <p>Sua sessão terminou. Faça login novamente.</p>
            <ButtonRow>
              <PrimaryButton type="button" onClick={() => navigate("/login")}>
                Ir para o login
              </PrimaryButton>
            </ButtonRow>
          </ProfileContentCard>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header variant="feed" />

      <Container>
        <ProfileHeader
          user={user}
          onAvatarClick={() => setSelectedImage(user.avatar || defaultAvatar)}
          onCoverClick={() => {
            if (user.cover) setSelectedImage(user.cover);
          }}
          onAvatarCameraClick={() => setImageMenu("avatar")}
          onCoverCameraClick={() => setImageMenu("cover")}
        />

        <ProfileContentCard>
          {isAdmin && <AdminTag>Administrador</AdminTag>}

          {user.profession && <Location as="p">{user.profession}</Location>}

          <Bio>{user.bio || "Nenhuma biografia cadastrada."}</Bio>

          {user.location && <Location>📍 {user.location}</Location>}

          <ProfileStats items={statsItems} />

          <ProfileSkills skills={user.skills || []} />

          <ProfileCourses title="Minhas insígnias" courses={myCourses} />

          <ProfileProjects projects={user.projects || []} />
        </ProfileContentCard>

        <ButtonRow>
          <PrimaryButton type="button" onClick={() => navigate("/profile/edit")}>
            Editar perfil
          </PrimaryButton>

          <SecondaryButton type="button" onClick={() => navigate("/feed")}>
            Voltar ao feed
          </SecondaryButton>
        </ButtonRow>
      </Container>

      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {imageMenu && (
        <ImageMenu
          onView={handleViewImage}
          onUpload={handleUploadImage}
          onRemove={handleRemoveImage}
          onClose={() => setImageMenu(null)}
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={avatarInputRef}
        style={{ display: "none" }}
        disabled={isSavingImage}
        onChange={(event) => handleImageSelected(event, "avatar")}
      />

      <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        style={{ display: "none" }}
        disabled={isSavingImage}
        onChange={(event) => handleImageSelected(event, "cover")}
      />
    </>
  );
};

export default Profile;
