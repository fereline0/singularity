"use client";

import { IUserComment } from "@/interfaces/userComment.interface";
import connectLikeToUserCommentService from "@/services/connectLikeToUserComment.service";
import disconnectLikeToUserCommentService from "@/services/disconnectLikeToUserComment.service";
import userLikedUserCommentService from "@/services/userLikedUserComment.service";
import { Button } from "@nextui-org/button";
import { Link, Spinner, Tooltip } from "@nextui-org/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

interface ILike {
  comment: IUserComment;
  authedUserId: string;
}

export default function Like(props: ILike) {
  const { data, mutate } = userLikedUserCommentService(
    props.comment.id,
    props.authedUserId
  );

  const {
    trigger: connectLikeToUserComment,
    isMutating: connectLikeToUserCommentIsMutating,
  } = connectLikeToUserCommentService(props.comment.id, props.authedUserId);

  const {
    trigger: disconnectLikeToUserComment,
    isMutating: disconnectLikeToUserCommentIsMutating,
  } = disconnectLikeToUserCommentService(props.comment.id, props.authedUserId);

  const handleLike = async () => {
    await connectLikeToUserComment();
    await mutate();
  };

  const handleDislike = async () => {
    await disconnectLikeToUserComment();
    await mutate();
  };

  if (!data) {
    return <Spinner size="sm" />;
  }

  return (
    <Tooltip
      placement="bottom"
      content={
        <div>
          {data[1]._count.likers < 1 ? (
            "No one has"
          ) : data[1]._count.likers == 1 ? (
            <Link
              key={data[1].likers[0].id}
              href={`/users/${data[1].likers[0].id}`}
            >
              {data[1].likers[0].name}
            </Link>
          ) : (
            <>
              {data[1].likers.map((liker, index) => (
                <span key={liker.id}>
                  <Link href={`/users/${liker.id}`}>{liker.name}</Link>
                  {index + 1 < data[1].likers.length ? ", " : " "}
                </span>
              ))}
              {data[1]._count.likers - data[1].likers.length > 0 && (
                <Link href="/">
                  {`and ${data[1]._count.likers - data[1].likers.length} others`}
                </Link>
              )}
            </>
          )}
          {" liked this comment"}
        </div>
      }
    >
      {data[0].likers.length > 0 ? (
        <Button
          isIconOnly
          onClick={async () => await handleDislike()}
          isLoading={disconnectLikeToUserCommentIsMutating}
          variant="light"
        >
          <IoMdHeart size={20} />
        </Button>
      ) : (
        <Button
          isIconOnly
          onClick={async () => await handleLike()}
          isLoading={connectLikeToUserCommentIsMutating}
          variant="light"
        >
          <IoMdHeartEmpty size={20} />
        </Button>
      )}
    </Tooltip>
  );
}
