import { useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { useData } from "../../contexts/DataContext";
import { matchesSearch } from "../../utils/search";
import { formatDateTime } from "../../utils/date";

import {
  PageHead,
  PageTitle,
  PageSubtitle,
  Toolbar,
  SearchInput,
  TableWrapper,
  Table,
  Cell,
  RowActions,
  IconButton,
  EmptyRow,
} from "./styles";

/*
 * Moderação: lista todos os comentários de todas as publicações.
 */
const CommentsAdmin = () => {
  const { posts, updatePost } = useData();
  const [search, setSearch] = useState("");

  const comments = useMemo(() => {
    const all = posts.flatMap((post) =>
      (post.commentsList || []).map((comment) => ({
        ...comment,
        postId: post.id,
        postTitle: post.title,
      }))
    );

    return all
      .filter((comment) => matchesSearch(search, [comment.user, comment.text, comment.postTitle]))
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [posts, search]);

  const handleDelete = (comment) => {
    const confirmed = window.confirm(`Excluir o comentário de ${comment.user}?`);
    if (!confirmed) return;

    updatePost(comment.postId, (post) => ({
      commentsList: (post.commentsList || []).filter((item) => item.id !== comment.id),
    }));
  };

  return (
    <>
      <PageHead>
        <div>
          <PageTitle>Comentários</PageTitle>
          <PageSubtitle>{comments.length} comentários nas publicações.</PageSubtitle>
        </div>
      </PageHead>

      <Toolbar>
        <SearchInput
          placeholder="Buscar por autor, texto ou publicação..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Toolbar>

      <TableWrapper>
        {comments.length === 0 ? (
          <EmptyRow>Nenhum comentário encontrado.</EmptyRow>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Autor</th>
                <th>Comentário</th>
                <th>Publicação</th>
                <th>Data</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={`${comment.postId}-${comment.id}`}>
                  <td>
                    <Cell $round>
                      <img src={comment.avatar || defaultAvatar} alt="" />
                      <div>
                        <strong>{comment.user}</strong>
                      </div>
                    </Cell>
                  </td>
                  <td style={{ maxWidth: 360, overflowWrap: "anywhere" }}>{comment.text}</td>
                  <td>
                    <a href={`/feed#post-${comment.postId}`}>{comment.postTitle}</a>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{formatDateTime(comment.createdAt)}</td>
                  <td>
                    <RowActions>
                      <IconButton
                        type="button"
                        $danger
                        onClick={() => handleDelete(comment)}
                        title="Excluir comentário"
                      >
                        <FiTrash2 />
                      </IconButton>
                    </RowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>
    </>
  );
};

export default CommentsAdmin;
