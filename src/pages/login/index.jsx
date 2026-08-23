import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthHeader } from "../../components/AuthHeader";
import { useAuth } from "../../contexts/AuthContext";
import { emailRules, passwordRules } from "../../utils/validation";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  EsqueciText,
  CriarText,
  Row,
  Wrapper,
  FormError,
} from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  // Quem já está logado não precisa ver a tela de login.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (formData) => {
    setFormError("");
    setLoading(true);

    try {
      const result = await login(formData);

      if (result.ok) {
        // Volta para a página que o usuário tentou acessar antes do login.
        const from = location.state?.from?.pathname || "/feed";
        navigate(from, { replace: true });
        return;
      }

      setFormError(result.message);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setFormError("Não foi possível entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <Container>
        <Column>
          <Title>
            Acesse sua conta para <span>continuar aprendendo</span> e acompanhar
            seu progresso.
          </Title>
        </Column>

        <Column>
          <Wrapper>
            <TitleLogin>Bem-vindo ao DevOrbit</TitleLogin>
            <SubtitleLogin>
              Entre com seu e-mail e senha para acessar sua conta.
            </SubtitleLogin>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Input
                type="email"
                placeholder="E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
                rules={emailRules}
                errorMessage={errors.email?.message}
                autoComplete="email"
              />
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
                rules={passwordRules}
                errorMessage={errors.senha?.message}
                autoComplete="current-password"
              />

              {formError && <FormError role="alert">{formError}</FormError>}

              <Button
                title={loading ? "Entrando..." : "Entrar"}
                variant="secondary"
                type="submit"
                disabled={loading}
              />
            </form>

            <Row>
              <EsqueciText onClick={() => navigate("/forgot-password")}>
                Esqueci minha senha
              </EsqueciText>
              <CriarText onClick={() => navigate("/signup")}>Criar conta</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export default Login;
