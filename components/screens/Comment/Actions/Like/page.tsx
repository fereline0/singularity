import Marginer from "@/components/shared/Marginer/page";
import { IUserComment } from "@/interfaces/userComment.interface";
import { Button } from "@nextui-org/button";
import {
  Badge,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  User,
} from "@nextui-org/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

interface ILike {
  likeMethod: () => Promise<void>;
  likeMethodIsLoading: boolean;
  dislikeMethod: () => Promise<void>;
  dislikeMethodIsLoading: boolean;
  comment: IUserComment;
  userLikedThisComment: boolean;
  authedUserId: string;
}

export default function Like({
  likeMethod,
  likeMethodIsLoading,
  dislikeMethod,
  dislikeMethodIsLoading,
  comment,
  userLikedThisComment,
}: ILike) {
  if (!comment) {
    return <Spinner size="sm" />;
  }

  const handleLike = async () => {
    await likeMethod();
  };

  const handleDislike = async () => {
    await dislikeMethod();
  };

  return (
    <Popover backdrop="blur" placement="bottom">
      <PopoverTrigger>
        <Badge content={comment._count.likers} size="lg">
          <Button
            isIconOnly
            onClick={userLikedThisComment ? handleDislike : handleLike}
            isLoading={
              userLikedThisComment
                ? dislikeMethodIsLoading
                : likeMethodIsLoading
            }
            variant="light"
          >
            {userLikedThisComment ? (
              <IoMdHeart size={20} />
            ) : (
              <IoMdHeartEmpty size={20} />
            )}
          </Button>
        </Badge>
      </PopoverTrigger>
      <PopoverContent>
        {comment.likers.length > 0 ? (
          <Marginer y={8}>
            {comment.likers.map((liker) => (
              <User
                className="justify-start align-bottom"
                name={<Link href={`/users/${liker.id}`}>{liker.name}</Link>}
                avatarProps={{ src: liker.image ?? "/no-avatar.jpg" }}
              />
            ))}
            {comment.likers.length < comment._count.likers && (
              <div className="flex justify-center">
                <Link href="/">
                  And {comment._count.likers - comment.likers.length}
                </Link>
              </div>
            )}
          </Marginer>
        ) : (
          <span>No one has liked this comment yet</span>
        )}
      </PopoverContent>
    </Popover>
  );
}
