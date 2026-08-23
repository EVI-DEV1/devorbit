import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { Logo } from "../Logo";

import { Header, Container, BackButton } from "./styles";

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <Header>
      <Container>
        <Logo onClick={() => navigate("/")} />

        <BackButton type="button" onClick={() => navigate("/")}>
          <FaArrowLeft />
          Início
        </BackButton>
      </Container>
    </Header>
  );
};

export { AuthHeader };
