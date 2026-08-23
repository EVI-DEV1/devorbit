import { useMemo } from "react";
import { FiAward } from "react-icons/fi";

import { UserInfo } from "../UserInfo";
import { useData } from "../../contexts/DataContext";

import { Container, Header, Title, List, EmptyText } from "./styles";

// Os 5 usuários com maior pontuação semanal (campo weeklyScore,
// administrado pelo painel admin em "Top 5").
export const getTopFive = (users) =>
  [...users]
    .filter((user) => Number(user.weeklyScore) > 0)
    .sort((a, b) => Number(b.weeklyScore) - Number(a.weeklyScore))
    .slice(0, 5);

const TopFive = () => {
  const { users } = useData();

  const topUsers = useMemo(() => getTopFive(users), [users]);

  return (
    <Container>
      <Header>
        <FiAward />
        <Title>Top 5 da semana</Title>
      </Header>

      {topUsers.length === 0 ? (
        <EmptyText>Ainda não há ranking nesta semana.</EmptyText>
      ) : (
        <List>
          {topUsers.map((user, index) => (
            <UserInfo
              key={user.id}
              position={index + 1}
              nome={user.name}
              image={user.avatar}
              role={user.profession}
              percentual={Number(user.weeklyScore)}
            />
          ))}
        </List>
      )}
    </Container>
  );
};

export { TopFive };
