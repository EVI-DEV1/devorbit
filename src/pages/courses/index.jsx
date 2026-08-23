import { useMemo, useState } from "react";

import Header from "../../components/Header";
import { CourseCard } from "../../components/CourseCard";
import { useData } from "../../contexts/DataContext";
import { useCourseProgress } from "../../hooks/useCourseProgress";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "../../data/courses";
import { searchCourses } from "../../utils/search";

import {
  Container,
  PageHeader,
  Title,
  Subtitle,
  Filters,
  FilterChip,
  FilterGroup,
  Grid,
  EmptyState,
  SectionTitle,
} from "./styles";

const ALL = "Todos";

const Courses = () => {
  const { courses } = useData();
  const { isEnrolled, getProgress } = useCourseProgress();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [onlyMine, setOnlyMine] = useState(false);

  const published = useMemo(
    () => courses.filter((course) => course.status !== "Rascunho"),
    [courses]
  );

  const filtered = useMemo(() => {
    let list = searchCourses(published, search);

    if (category !== ALL) list = list.filter((course) => course.category === category);
    if (level !== ALL) list = list.filter((course) => course.level === level);
    if (onlyMine) list = list.filter((course) => isEnrolled(course.id));

    return list;
  }, [published, search, category, level, onlyMine, isEnrolled]);

  const inProgress = useMemo(
    () =>
      published.filter(
        (course) => isEnrolled(course.id) && getProgress(course.id) < 100
      ),
    [published, isEnrolled, getProgress]
  );

  const showContinue = !search && category === ALL && level === ALL && !onlyMine;

  return (
    <>
      <Header variant="feed" search={search} setSearch={setSearch} />

      <Container>
        <PageHeader>
          <Title>Cursos</Title>
          <Subtitle>
            Trilhas criadas pela comunidade para você evoluir do básico ao
            avançado. Matricule-se e acompanhe seu progresso.
          </Subtitle>
        </PageHeader>

        <Filters>
          <FilterGroup aria-label="Categoria">
            {[ALL, ...COURSE_CATEGORIES].map((item) => (
              <FilterChip
                key={item}
                type="button"
                $active={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup aria-label="Nível">
            {[ALL, ...COURSE_LEVELS].map((item) => (
              <FilterChip
                key={item}
                type="button"
                $active={level === item}
                onClick={() => setLevel(item)}
              >
                {item}
              </FilterChip>
            ))}

            <FilterChip
              type="button"
              $active={onlyMine}
              $accent
              onClick={() => setOnlyMine((current) => !current)}
            >
              Meus cursos
            </FilterChip>
          </FilterGroup>
        </Filters>

        {showContinue && inProgress.length > 0 && (
          <>
            <SectionTitle>Continuar aprendendo</SectionTitle>
            <Grid>
              {inProgress.map((course) => (
                <CourseCard key={`progress-${course.id}`} course={course} />
              ))}
            </Grid>
            <SectionTitle>Todos os cursos</SectionTitle>
          </>
        )}

        {filtered.length === 0 ? (
          <EmptyState>Nenhum conteúdo encontrado.</EmptyState>
        ) : (
          <Grid>
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Courses;
