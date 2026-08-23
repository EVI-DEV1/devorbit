import { FiCheck } from "react-icons/fi";

import { resolveBanner } from "../../data/banners";

import { Container, Title, Grid, Badge, BadgeImage, BadgeName, BadgeLevel, EmptyText, DoneMark } from "./styles";

/*
 * Insígnias dos cursos em que o usuário está inscrito.
 *  courses = [{ id, name, level, bannerKey|banner, percent }]
 */
const ProfileCourses = ({ title = "Cursos", courses = [] }) => {
  return (
    <Container>
      <Title>{title}</Title>

      {courses.length === 0 ? (
        <EmptyText>Nenhuma inscrição ainda. Inscreva-se em um curso no feed ou em Cursos.</EmptyText>
      ) : (
        <Grid>
          {courses.map((course) => {
            const image = resolveBanner(course);
            const done = Number(course.percent) >= 100;

            return (
              <Badge key={course.id || course.name} title={course.name} $done={done}>
                <BadgeImage $done={done}>
                  {image ? <img src={image} alt="" /> : <span>{course.name.slice(0, 2)}</span>}
                  {done && (
                    <DoneMark aria-label="Concluído">
                      <FiCheck />
                    </DoneMark>
                  )}
                </BadgeImage>
                <BadgeName>{course.name}</BadgeName>
                {course.level && <BadgeLevel>{course.level}</BadgeLevel>}
              </Badge>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export { ProfileCourses };
