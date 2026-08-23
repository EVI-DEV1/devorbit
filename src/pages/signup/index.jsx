import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { AuthHeader } from "../../components/AuthHeader";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import { emailRules, passwordRules, nameRules } from "../../utils/validation";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  EsqueciText,
  Row,
  Wrapper,
  FormError,
} from "../login/styles";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (formData) => {
    setFormError("");
    setLoading(true);

    try {
      const result = await signup(formData);

      if (result.ok) {
        // Já entra logado: não faz sentido pedir a senha de novo logo após o cadastro.
        navigate("/feed", { replace: true });
        return;
      }

      setFormError(result.message);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setFormError("Não foi possível criar a conta. Tente novamente.");
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
            Comece sua jornada na programação e desenvolva habilidades para{" "}
            <span>conquistar novas oportunidades</span>.
          </Title>
        </Column>

        <Column>
          <Wrapper>
            <TitleLogin>Crie sua conta</TitleLogin>
            <SubtitleLogin>
              Preencha seus dados para criar sua conta gratuitamente.
            </SubtitleLogin>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Input
                placeholder="Nome completo"
                leftIcon={<MdPerson />}
                name="name"
                control={control}
                rules={nameRules}
                errorMessage={errors.name?.message}
                autoComplete="name"
              />
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
                autoComplete="new-password"
              />

              {formError && <FormError role="alert">{formError}</FormError>}

              <Button
                title={loading ? "Criando conta..." : "Criar conta"}
                variant="secondary"
                type="submit"
                disabled={loading}
              />
            </form>

            <Row>
              <EsqueciText onClick={() => navigate("/login")}>
                Já tenho conta — voltar ao login
              </EsqueciText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export default Signup;
