import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { AuthHeader } from "../../components/AuthHeader";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import { emailRules, passwordRules } from "../../utils/validation";

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
  FormSuccess,
} from "../login/styles";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const senha = watch("senha");

  const onSubmit = async (formData) => {
    setFormError("");
    setLoading(true);

    try {
      const result = await resetPassword(formData);

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setFormError("Não foi possível redefinir a senha. Tente novamente.");
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
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e <span>entrar mais rápido</span> nas empresas mais
            desejadas.
          </Title>
        </Column>

        <Column>
          <Wrapper>
            <TitleLogin>Recupere sua senha</TitleLogin>
            <SubtitleLogin>Digite seu e-mail e defina uma nova senha.</SubtitleLogin>

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
                placeholder="Nova senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
                rules={passwordRules}
                errorMessage={errors.senha?.message}
                autoComplete="new-password"
              />
              <Input
                type="password"
                placeholder="Confirmar nova senha"
                leftIcon={<MdLock />}
                name="confirmSenha"
                control={control}
                rules={{
                  required: "Confirme a nova senha",
                  validate: (value) => value === senha || "As senhas não coincidem",
                }}
                errorMessage={errors.confirmSenha?.message}
                autoComplete="new-password"
              />

              {formError && <FormError role="alert">{formError}</FormError>}
              {success && (
                <FormSuccess role="status">
                  Senha atualizada! Redirecionando para o login...
                </FormSuccess>
              )}

              <Button
                title={loading ? "Salvando..." : "Redefinir senha"}
                variant="secondary"
                type="submit"
                disabled={loading || success}
              />
            </form>

            <Row>
              <EsqueciText onClick={() => navigate("/login")}>Voltar ao login</EsqueciText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export default ForgotPassword;
