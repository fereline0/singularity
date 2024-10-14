"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import useCreateArticleLiker from "@/hooks/useCreateArticleLiker";
import useDeleteArticleCommentLiker from "@/hooks/useDeleteArticleCommentLiker";
import useUserLikedArticle from "@/hooks/useUserLikedArticle";
import IArticle from "@/interfaces/article.interface";

interface ILike {
  article: IArticle;
}

export default function Like(props: ILike) {
  const session = useSession();

  const { data: userLikedArticle, mutate: userLikedArticleMutate } =
    useUserLikedArticle(props.article.id, session.data?.user.id);

  const {
    trigger: createArticleLiker,
    isMutating: createArticleLikerIsMutating,
  } = useCreateArticleLiker(props.article.id, session.data?.user.id);

  const {
    trigger: deleteArticleLiker,
    isMutating: deleteArticleLikerIsMutating,
  } = useDeleteArticleCommentLiker(props.article.id, session.data?.user.id);

  const handleLike = async () => {
    await createArticleLiker();
    await userLikedArticleMutate();
  };

  const handleDislike = async () => {
    await deleteArticleLiker();
    await userLikedArticleMutate();
  };

  const userLikedThisArticle = userLikedArticle && userLikedArticle[0];
  const likesCount = userLikedArticle && userLikedArticle[1];

  return (
    <Button
      isDisabled={session.status != "authenticated"}
      isLoading={
        userLikedThisArticle
          ? deleteArticleLikerIsMutating
          : createArticleLikerIsMutating
      }
      startContent={
        userLikedThisArticle ? (
          <IoMdHeart size={20} />
        ) : (
          <IoMdHeartEmpty size={20} />
        )
      }
      variant="light"
      onClick={async () =>
        session.status == "authenticated" && userLikedThisArticle
          ? await handleDislike()
          : await handleLike()
      }
    >
      {likesCount}
    </Button>
  );
}
