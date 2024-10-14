"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import useCreateArticleCommentLiker from "@/hooks/useCreateArticleCommentLiker";
import useDeleteArticleCommentLiker from "@/hooks/useDeleteArticleCommentLiker";
import useUserLikedArticleComment from "@/hooks/useUserLikedArticleComment";
import { IArticleComment } from "@/interfaces/articleComment.interface";

interface ILike {
  comment: IArticleComment;
}

export default function Like(props: ILike) {
  const session = useSession();

  const {
    data: userLikedArticleComment,
    mutate: userLikedArticleCommentMutate,
  } = useUserLikedArticleComment(props.comment.id, session.data?.user.id);

  const {
    trigger: createArticleCommentLiker,
    isMutating: createArticleCommentLikerIsMutating,
  } = useCreateArticleCommentLiker(props.comment.id, session.data?.user.id);

  const {
    trigger: deleteArticleCommentLiker,
    isMutating: deleteArticleCommentLikerIsMutating,
  } = useDeleteArticleCommentLiker(props.comment.id, session.data?.user.id);

  const handleLike = async () => {
    await createArticleCommentLiker();
    await userLikedArticleCommentMutate();
  };

  const handleDislike = async () => {
    await deleteArticleCommentLiker();
    await userLikedArticleCommentMutate();
  };

  const useUserLikedThisComment =
    userLikedArticleComment && userLikedArticleComment[0];
  const likesCount = userLikedArticleComment && userLikedArticleComment[1];

  return (
    <Button
      isDisabled={session.status != "authenticated"}
      isLoading={
        useUserLikedThisComment
          ? deleteArticleCommentLikerIsMutating
          : createArticleCommentLikerIsMutating
      }
      startContent={
        useUserLikedThisComment ? (
          <IoMdHeart size={20} />
        ) : (
          <IoMdHeartEmpty size={20} />
        )
      }
      variant="light"
      onClick={async () =>
        session.status == "authenticated" && useUserLikedThisComment
          ? await handleDislike()
          : await handleLike()
      }
    >
      {likesCount}
    </Button>
  );
}
