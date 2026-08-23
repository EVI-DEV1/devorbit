import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import bannerImage from "../../assets/banner.png";
import { Button } from "../../components/Button";
import Header from "../../components/Header";


import {
  Container,
  Title,
  TitleHighlight,
  TextContent,
  HeroActions,
  TechContainer,
  Tech,
  StatsSection,
  StatCard,
  Banner,
} from "./styles";

import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
} from "react-icons/si";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClickSignIn = () => {
    navigate(isAuthenticated ? "/feed" : "/login");
  };

  return (
    <>
      <Header variant="home" />
      

      <Container>
        <div>
          <Title>
            Aprenda com os <br />
            <TitleHighlight>melhores especialistas</TitleHighlight>
            <br />
            e transforme sua carreira.
          </Title>

          <TextContent>
           Aprenda novas tecnologias, publique seus projetos,
           compartilhe conhecimento e evolua junto com a comunidade.
          </TextContent>

          <HeroActions>
            <Button
              title="Começar agora"
              variant="secondary"
              onClick={handleClickSignIn}
            />
          </HeroActions>

          <TechContainer>
            <Tech>
              <FaReact color="#61DAFB" />
              React
            </Tech>

            <Tech>
              <SiJavascript color="#F7DF1E" />
              JavaScript
            </Tech>

            <Tech>
              <FaNodeJs color="#68A063" />
              Node.js
            </Tech>

            <Tech>
              <FaJava color="#F89820" />
              Java
            </Tech>

            <Tech>
              <SiTypescript color="#3178C6" />
              TypeScript
            </Tech>

            <Tech>
              <FaGitAlt color="#F1502F" />
              Git
            </Tech>

            <Tech>
              <FaDocker color="#2496ED" />
              Docker
            </Tech>
          </TechContainer>
        </div>

        <div>
          <Banner src={bannerImage} alt="Desenvolvedores colaborando" />
        </div>
      </Container>
      <StatsSection>

    <StatCard>
        <h2>+500</h2>
        <h3>Cursos</h3>
        <p>Conteúdos atualizados para acelerar seu aprendizado.</p>
    </StatCard>

    <StatCard>
        <h2>+10 mil</h2>
        <h3>Alunos</h3>
        <p>Uma comunidade ativa aprendendo todos os dias.</p>
    </StatCard>

    <StatCard>
        <h2>+50</h2>
        <h3>Especialistas</h3>
        <p>Profissionais compartilhando experiência de mercado.</p>
    </StatCard>

    <StatCard>
        <h2>95%</h2>
        <h3>Satisfação</h3>
        <p>Alunos recomendam a plataforma para outros desenvolvedores.</p>
    </StatCard>

</StatsSection>
      
    </>
  );
};

export default Home;