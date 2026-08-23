import { useMemo, useState } from "react";
import {
  FiThumbsUp,
  FiMessageCircle,
  FiBookmark,
  FiShare2,
  FiPlayCircle,
  FiSend,
  FiUserCheck,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";

import defaultAvatar from "../../assets/avatar-default.svg";
import { resolveBanner } from "../../data/banners";
import { formatRelativeDate } from "../../utils/date";
import { useNow } from "../../hooks/useNow";

import {
  CardContainer,
  ImageBackground,
  Content,
  UserInfo,
  UserPicture,
  PostInfo,
  HasInfo,
  Actions,
  ActionButton,
  CommentArea,
  CommentForm,
  CommentInput,
  SendCommentButton,
  CommentList,
  CommentItem,
  CommentHeader,
  CommentDeleteButton,
  EmptyComments,
  AdminActions,
  AdminButton,
  CourseArea,
  SubscribersCount,
  CourseButtons,
  SubscribeButton,
  AccessCourseButton,
} from "./styles";

/*
 * Card de publicação do feed.
 *
 * Props:
 *  post          dados da publicação
 *  currentUser   usuário logado (ou null)
 *  isAdmin       habilita editar/excluir post e moderar comentários
 *  onUpdate      (changes) => void   — alterações parciais no post
 *  onDelete      (postId) => void
 *  onEdit        (post) => void      — opcional (abre editor do admin)
 *  onAccessCourse(post) => void      — opcional (registra progresso)
 *  courseUrl     link do curso vinculado (fallback de post.courseUrl)
 */
const Card = ({
  post,
  currentUser,
  isAdmin = false,
  onUpdate,
  onDelete,
  onEdit,
  onAccessCourse,
  courseUrl,
}) => {
  const now = useNow();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const currentUserId = String(currentUser?.id || currentUser?.email || "visitante");

  const likedBy = post.likedBy || [];
  const savedBy = post.savedBy || [];
  const subscribedBy = post.subscribedBy || [];
  const commentsList = post.commentsList || [];

  const isLiked = likedBy.includes(currentUserId);
  const isSaved = savedBy.includes(currentUserId);
  const isSubscribed = subscribedBy.includes(currentUserId);

  const totalLikes = useMemo(
    () => Number(post.likes || 0) + likedBy.length,
    [post.likes, likedBy.length]
  );

  const totalComments = useMemo(
    () => Number(post.comments || 0) + commentsList.length,
    [post.comments, commentsList.length]
  );

  const totalSubscribers = useMemo(
    () => Number(post.subscribers || 0) + subscribedBy.length,
    [post.subscribers, subscribedBy.length]
  );

  const banner = resolveBanner(post);
  // Sempre calculado a partir da data real de publicação (atualiza a cada minuto).
  const postedAt = formatRelativeDate(post.createdAt, now) || post.time || "Agora mesmo";

  const updatePost = (changes) => {
    onUpdate?.(changes);
  };

  const handleLike = () => {
    updatePost({
      likedBy: isLiked
        ? likedBy.filter((userId) => userId !== currentUserId)
        : [...likedBy, currentUserId],
    });
  };

  const handleSave = () => {
    updatePost({
      savedBy: isSaved
        ? savedBy.filter((userId) => userId !== currentUserId)
        : [...savedBy, currentUserId],
    });
  };

  const handleSubscribe = () => {
    if (!currentUser?.id && !currentUser?.email) {
      alert("Faça login para se inscrever no curso.");
      return;
    }

    updatePost({
      subscribedBy: isSubscribed
        ? subscribedBy.filter((userId) => userId !== currentUserId)
        : [...subscribedBy, currentUserId],
    });
  };

  const handleAccessCourse = () => {
    if (!isSubscribed) {
      alert("Inscreva-se para acessar a aula completa.");
      return;
    }

    const url = post.courseUrl || courseUrl;

    if (!url) {
      alert("A aula deste curso ainda não está disponível.");
      return;
    }

    onAccessCourse?.(post);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleComment = (event) => {
    event.preventDefault();

    if (!commentText.trim()) return;

    if (!currentUser) {
      alert("Faça login para comentar.");
      return;
    }

    const newComment = {
      id: Date.now(),
      userId: currentUserId,
      user: currentUser?.name || "Usuário",
      avatar: currentUser?.avatar || "",
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    };

    updatePost({ commentsList: [...commentsList, newComment] });
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    const confirmed = window.confirm("Deseja excluir este comentário?");
    if (!confirmed) return;

    updatePost({
      commentsList: commentsList.filter((comment) => comment.id !== commentId),
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: `${window.location.origin}/feed#post-${post.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link da publicação copiado!");
        return;
      }

      alert("Não foi possível compartilhar esta publicação.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Erro ao compartilhar:", error);
      }
    }
  };

  const canDeleteComment = (comment) =>
    isAdmin || String(comment.userId) === currentUserId;

  return (
    <CardContainer id={`post-${post.id}`}>
      {banner && <ImageBackground src={banner} alt={`Banner da publicação ${post.title}`} />}

      <Content>
        {isAdmin && (
          <AdminActions>
            {onEdit && (
              <AdminButton
                type="button"
                onClick={() => onEdit(post)}
                aria-label="Editar publicação"
                title="Editar publicação"
              >
                <FiEdit3 />
              </AdminButton>
            )}

            <AdminButton
              type="button"
              $danger
              onClick={() => onDelete?.(post.id)}
              aria-label="Excluir publicação"
              title="Excluir publicação"
            >
              <FiTrash2 />
            </AdminButton>
          </AdminActions>
        )}

        <UserInfo>
          <UserPicture src={post.avatar || defaultAvatar} alt={post.user || "Usuário"} />

          <div>
            <h4>{post.user || "Usuário"}</h4>
            <p>{postedAt}</p>
          </div>
        </UserInfo>

        <PostInfo>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
        </PostInfo>

        {post.tags?.length > 0 && (
          <HasInfo>
            {post.tags.map((tag) => (
              <span key={`${post.id}-${tag}`}>#{tag}</span>
            ))}
          </HasInfo>
        )}

        <CourseArea>
          <SubscribersCount>
            <FiUserCheck />
            <span>
              {totalSubscribers} {totalSubscribers === 1 ? "inscrito" : "inscritos"}
            </span>
          </SubscribersCount>

          <CourseButtons>
            <SubscribeButton
              type="button"
              $subscribed={isSubscribed}
              onClick={handleSubscribe}
            >
              <FiUserCheck />
              {isSubscribed ? "Inscrito" : "Inscrever-se"}
            </SubscribeButton>

            <AccessCourseButton
              type="button"
              $locked={!isSubscribed}
              onClick={handleAccessCourse}
            >
              <FiPlayCircle />
              Acessar curso
            </AccessCourseButton>
          </CourseButtons>
        </CourseArea>

        <Actions>
          <ActionButton
            type="button"
            $active={isLiked}
            onClick={handleLike}
            title={isLiked ? "Remover curtida" : "Curtir"}
            aria-pressed={isLiked}
          >
            <FiThumbsUp />
            <span>{totalLikes}</span>
          </ActionButton>

          <ActionButton
            type="button"
            $active={showComments}
            onClick={() => setShowComments((current) => !current)}
            title="Comentários"
          >
            <FiMessageCircle />
            <span>{totalComments}</span>
          </ActionButton>

          <ActionButton
            type="button"
            $active={isSaved}
            onClick={handleSave}
            title={isSaved ? "Remover dos salvos" : "Salvar"}
            aria-pressed={isSaved}
          >
            <FiBookmark />
            <span>{isSaved ? "Salvo" : "Salvar"}</span>
          </ActionButton>

          <ActionButton type="button" onClick={handleShare} title="Compartilhar">
            <FiShare2 />
            <span>Enviar</span>
          </ActionButton>
        </Actions>

        {showComments && (
          <CommentArea>
            <CommentForm onSubmit={handleComment}>
              <CommentInput
                placeholder="Digite seu comentário..."
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                maxLength={300}
              />

              <SendCommentButton type="submit" aria-label="Enviar comentário">
                <FiSend />
              </SendCommentButton>
            </CommentForm>

            <CommentList>
              {commentsList.length === 0 ? (
                <EmptyComments>Seja a primeira pessoa a comentar.</EmptyComments>
              ) : (
                commentsList.map((comment) => (
                  <CommentItem key={comment.id}>
                    <img src={comment.avatar || defaultAvatar} alt={comment.user || "Usuário"} />

                    <div>
                      <CommentHeader>
                        <strong>{comment.user}</strong>
                        <time dateTime={comment.createdAt}>
                          {formatRelativeDate(comment.createdAt, now)}
                        </time>

                        {canDeleteComment(comment) && (
                          <CommentDeleteButton
                            type="button"
                            onClick={() => handleDeleteComment(comment.id)}
                            aria-label="Excluir comentário"
                            title="Excluir comentário"
                          >
                            <FiTrash2 />
                          </CommentDeleteButton>
                        )}
                      </CommentHeader>

                      <p>{comment.text}</p>
                    </div>
                  </CommentItem>
                ))
              )}
            </CommentList>
          </CommentArea>
        )}
      </Content>
    </CardContainer>
  );
};

export { Card };
