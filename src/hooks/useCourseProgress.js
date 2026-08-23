import { useCallback, useMemo } from "react";

import { useAuth } from "../contexts/AuthContext";

const XP_PER_ENROLL = 100;
const XP_PER_STEP = 50;
const XP_COMPLETION_BONUS = 200;

/*
 * Progresso do usuário logado nos cursos.
 * O progresso fica em user.progress = { [courseId]: percentual }.
 */
export const useCourseProgress = () => {
  const { user, updateProfile } = useAuth();

  const progress = useMemo(() => user?.progress || {}, [user]);

  const getProgress = useCallback(
    (courseId) => Number(progress[courseId] ?? progress[String(courseId)] ?? 0),
    [progress]
  );

  const isEnrolled = useCallback(
    (courseId) =>
      Object.prototype.hasOwnProperty.call(progress, courseId) ||
      Object.prototype.hasOwnProperty.call(progress, String(courseId)),
    [progress]
  );

  // Matricula (cria a entrada com 0%) sem alterar progresso existente.
  const enroll = useCallback(
    (courseId) => {
      if (!user || isEnrolled(courseId)) return;
      updateProfile({
        progress: { ...progress, [courseId]: 0 },
        xp: Number(user.xp || 0) + XP_PER_ENROLL,
      });
    },
    [user, isEnrolled, progress, updateProfile]
  );

  const unenroll = useCallback(
    (courseId) => {
      if (!user || !isEnrolled(courseId)) return;
      const next = { ...progress };
      delete next[courseId];
      delete next[String(courseId)];
      updateProfile({
        progress: next,
        xp: Math.max(0, Number(user.xp || 0) - XP_PER_ENROLL),
      });
    },
    [user, isEnrolled, progress, updateProfile]
  );

  // Avança o progresso (simula assistir uma aula) e concede XP.
  const advance = useCallback(
    (courseId, step = 10) => {
      if (!user) return;

      const current = getProgress(courseId);
      if (current >= 100) return;

      const next = Math.min(100, current + step);
      const bonus = next === 100 ? XP_COMPLETION_BONUS : 0;

      updateProfile({
        progress: { ...progress, [courseId]: next },
        xp: Number(user.xp || 0) + XP_PER_STEP + bonus,
        weeklyScore: Math.min(100, Number(user.weeklyScore || 0) + 2),
      });
    },
    [user, getProgress, progress, updateProfile]
  );

  return { getProgress, isEnrolled, enroll, unenroll, advance };
};
