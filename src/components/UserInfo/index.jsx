import defaultAvatar from "../../assets/avatar-default.svg";
import { ProgressBar } from "../ProgressBar";

import { Container, Position, UserPicture, Info, NameText, RoleText } from "./styles";

/*
 * Linha de usuário com posição e percentual (usada no Top 5 da semana).
 *  <UserInfo position={1} nome="Isabela" image="..." percentual={97} />
 */
const UserInfo = ({ position, nome, image, percentual, role }) => {
  return (
    <Container>
      {position != null && (
        <Position $top={position <= 3}>{String(position).padStart(2, "0")}</Position>
      )}

      <UserPicture src={image || defaultAvatar} alt={nome} />

      <Info>
        <NameText>{nome}</NameText>
        {role && <RoleText>{role}</RoleText>}
        <ProgressBar value={percentual} height={6} showValue={false} />
      </Info>

      <strong>{Math.round(percentual)}%</strong>
    </Container>
  );
};

export { UserInfo };
