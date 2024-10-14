"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import useUserLikedUserComment from "@/hooks/useUserLikedUserComment";
import { IUserComment } from "@/interfaces/userComment.interface";
import useCreateUserCommentLiker from "@/hooks/useCreateUserCommentLiker";
import useDeleteUserCommentLiker from "@/hooks/useDeleteUserCommentLiker";

interface ILike {
  comment: IUserComment;
}

export default function Like(props: ILike) {
  const session = useSession();

  const { data: userLikedUserComment, mutate: userLikedUserCommentMutate } =
    useUserLikedUserComment(props.comment.id, session.data?.user.id);

  const {
    trigger: createUserCommentLiker,
    isMutating: createUserCommentLikerIsMutating,
  } = useCreateUserCommentLiker(props.comment.id, session.data?.user.id);

  const {
    trigger: deleteUserCommentLiker,
    isMutating: deleteUserCommentLikerIsMutating,
  } = useDeleteUserCommentLiker(props.comment.id, session.data?.user.id);

  const handleLike = async () => {
    await createUserCommentLiker();
    await userLikedUserCommentMutate();
  };

  const handleDislike = async () => {
    await deleteUserCommentLiker();
    await userLikedUserCommentMutate();
  };

  const useUserLikedThisComment =
    userLikedUserComment && userLikedUserComment[0];
  const likesCount = userLikedUserComment && userLikedUserComment[1];

  return (
    <Button
      isDisabled={session.status != "authenticated"}
      isLoading={
        useUserLikedThisComment
          ? deleteUserCommentLikerIsMutating
          : createUserCommentLikerIsMutating
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
