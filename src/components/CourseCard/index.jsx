import { FiPlayCircle, FiCheckCircle, FiClock, FiLayers, FiPlus } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { resolveBanner } from "../../data/banners";
import { ProgressBar } from "../ProgressBar";
import { useAuth } from "../../contexts/AuthContext";
import { useCourseProgress } from "../../hooks/useCourseProgress";

import {
  Container,
  Banner,
  StatusTag,
  Body,
  Badges,
  Badge,
  Name,
  Author,
  Description,
  Tags,
  Meta,
  ProgressArea,
  Actions,
  PrimaryButton,
  SecondaryButton,
} from "./styles";

const LEVEL_COLORS = {
  Iniciante: "#00E676",
  Intermediário: "#FFB547",
  Avançado: "#FF5C7A",
};

/*
 * Card de curso (catálogo e resultados de busca).
 *  compact = versão menor para listas dentro do feed.
 */
const CourseCard = ({ course, compact = false }) => {
  const { user } = useAuth();
  const { getProgress, isEnrolled, enroll, advance } = useCourseProgress();

  const percent = getProgress(course.id);
  const enrolled = isEnrolled(course.id);
  const completed = percent >= 100;
  const comingSoon = course.status === "Em breve";
  const banner = resolveBanner(course);

  const handleStart = () => {
    if (!user) {
      alert("Faça login para se matricular.");
      return;
    }
    enroll(course.id);
  };

  const handleContinue = () => {
    if (!course.url) {
      alert("As aulas deste curso ainda não estão disponíveis.");
      return;
    }
    advance(course.id, 10);
    window.open(course.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container $compact={compact}>
      {banner && <Banner src={banner} alt={`Banner do curso ${course.name}`} $compact={compact} />}

      {comingSoon && <StatusTag>Em breve</StatusTag>}
      {completed && !comingSoon && (
        <StatusTag $done>
          <FiCheckCircle /> Concluído
        </StatusTag>
      )}

      <Body $compact={compact}>
        <Badges>
          <Badge>{course.category}</Badge>
          <Badge $color={LEVEL_COLORS[course.level]}>{course.level}</Badge>
        </Badges>

        <Name $compact={compact}>{course.name}</Name>

        <Author>
          <img src={course.authorAvatar || defaultAvatar} alt={course.author} />
          <span>{course.author}</span>
        </Author>

        {!compact && <Description>{course.description}</Description>}

        {course.tags?.length > 0 && (
          <Tags>
            {course.tags.slice(0, compact ? 3 : 6).map((tag) => (
              <span key={`${course.id}-${tag}`}>#{tag}</span>
            ))}
          </Tags>
        )}

        {!compact && (
          <Meta>
            {course.duration && (
              <span>
                <FiClock /> {course.duration}
              </span>
            )}
            {course.lessons && (
              <span>
                <FiLayers /> {course.lessons} aulas
              </span>
            )}
          </Meta>
        )}

        {enrolled && (
          <ProgressArea>
            <ProgressBar label="Progresso" value={percent} />
          </ProgressArea>
        )}

        <Actions>
          {comingSoon ? (
            <SecondaryButton type="button" disabled>
              <FiClock /> Disponível em breve
            </SecondaryButton>
          ) : enrolled ? (
            <PrimaryButton type="button" onClick={handleContinue} $done={completed}>
              <FiPlayCircle />
              {completed ? "Rever curso" : percent > 0 ? "Continuar" : "Começar"}
            </PrimaryButton>
          ) : (
            <SecondaryButton type="button" onClick={handleStart}>
              <FiPlus /> Matricular-se
            </SecondaryButton>
          )}
        </Actions>
      </Body>
    </Container>
  );
};

export { CourseCard };
