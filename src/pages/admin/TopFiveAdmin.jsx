import { useMemo, useState } from "react";
import { FiAward, FiRotateCcw } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { useData } from "../../contexts/DataContext";
import { getTopFive } from "../../components/TopFive";
import { UserInfo } from "../../components/UserInfo";
import { searchUsers } from "../../utils/search";

import {
  PageHead,
  PageTitle,
  PageSubtitle,
  Toolbar,
  SearchInput,
  GhostButton,
  TwoColumns,
  Panel,
  PanelTitle,
  TableWrapper,
  Table,
  Cell,
  EmptyRow,
  ScoreInput,
} from "./styles";

/*
 * O Top 5 é derivado da pontuação semanal (weeklyScore) dos usuários.
 * Aqui o admin ajusta a pontuação de qualquer usuário e vê o ranking
 * resultante na hora.
 */
const TopFiveAdmin = () => {
  const { users, updateUser } = useData();
  const [search, setSearch] = useState("");

  const ranking = useMemo(
    () =>
      [...searchUsers(users, search)].sort(
        (a, b) => Number(b.weeklyScore || 0) - Number(a.weeklyScore || 0)
      ),
    [users, search]
  );

  const topFive = useMemo(() => getTopFive(users), [users]);

  const handleScore = (user, value) => {
    const score = Math.max(0, Math.min(100, Number(value) || 0));
    updateUser(user.id, { weeklyScore: score });
  };

  const handleResetWeek = () => {
    const confirmed = window.confirm(
      "Zerar a pontuação semanal de todos os usuários? O Top 5 ficará vazio até novas pontuações."
    );
    if (!confirmed) return;
    users.forEach((user) => updateUser(user.id, { weeklyScore: 0 }));
  };

  return (
    <>
      <PageHead>
        <div>
          <PageTitle>Top 5 da semana</PageTitle>
          <PageSubtitle>
            Ajuste a pontuação semanal (0–100). Os cinco maiores aparecem no feed.
          </PageSubtitle>
        </div>

        <GhostButton type="button" onClick={handleResetWeek}>
          <FiRotateCcw /> Nova semana
        </GhostButton>
      </PageHead>

      <TwoColumns>
        <Panel>
          <PanelTitle>
            <FiAward /> Como os usuários veem
          </PanelTitle>

          {topFive.length === 0 ? (
            <EmptyRow>Nenhum usuário pontuou ainda.</EmptyRow>
          ) : (
            topFive.map((user, index) => (
              <UserInfo
                key={user.id}
                position={index + 1}
                nome={user.name}
                image={user.avatar}
                role={user.profession}
                percentual={Number(user.weeklyScore)}
              />
            ))
          )}
        </Panel>

        <div>
          <Toolbar>
            <SearchInput
              placeholder="Buscar usuário..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Toolbar>

          <TableWrapper>
            {ranking.length === 0 ? (
              <EmptyRow>Nenhum usuário encontrado.</EmptyRow>
            ) : (
              <Table style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Usuário</th>
                    <th style={{ textAlign: "right" }}>Pontuação</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((user, index) => (
                    <tr key={user.id}>
                      <td>{String(index + 1).padStart(2, "0")}</td>
                      <td>
                        <Cell $round>
                          <img src={user.avatar || defaultAvatar} alt="" />
                          <div>
                            <strong>{user.name}</strong>
                            <small>{user.profession || user.email}</small>
                          </div>
                        </Cell>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <ScoreInput
                          type="number"
                          min="0"
                          max="100"
                          value={Number(user.weeklyScore || 0)}
                          onChange={(event) => handleScore(user, event.target.value)}
                          aria-label={`Pontuação de ${user.name}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </TableWrapper>
        </div>
      </TwoColumns>
    </>
  );
};

export default TopFiveAdmin;
