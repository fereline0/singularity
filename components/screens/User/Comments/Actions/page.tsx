"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit, MdShare } from "react-icons/md";
import Dialog from "@/components/shared/Dialog/page";
import deleteUserCommentService from "@/services/deleteUserComment.service";
import { IUserComment } from "@/interfaces/userComment.interface";
import { useSession } from "next-auth/react";
import { VariantProps } from "@nextui-org/react";
import userLikedUserCommentService from "@/services/userLikedUserComment.service";
import connectLikeToUserCommentService from "@/services/connectLikeToUserComment.service";
import disconnectLikeToUserCommentService from "@/services/disconnectLikeToUserComment.service";
import Like from "@/components/screens/Comment/Actions/Like/page";

interface IActions<T> {
  comment: IUserComment;
  setCommentForChangeId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => Promise<void | T> | void;
}

interface IDropdownItem {
  key: string;
  value: string;
  icon: JSX.Element;
  action: () => void;
  color?: VariantProps<typeof DropdownItem>["color"];
  isDisabled?: boolean;
}

export default function Actions<T>(props: IActions<T>) {
  const session = useSession();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const handleChange = () => {
    props.setCommentForChangeId(props.comment.id);
    props.setValue(props.comment.value);
  };

  const {
    trigger: deleteUserComment,
    isMutating: deleteUserCommentIsMutating,
  } = deleteUserCommentService(props.comment.id);

  const handleDeleteUserComment = async () => {
    await deleteUserComment();
    onOpenChangeDeleteModal();
    const refreshMethod = props.refreshMethod();
    if (refreshMethod instanceof Promise) {
      await refreshMethod;
    }
  };

  const { data: userLikedUserComment, mutate: userLikedUserCommentMutate } =
    userLikedUserCommentService(props.comment.id, session.data?.user.id);

  const {
    trigger: connectLikeToUserComment,
    isMutating: connectLikeToUserCommentIsMutating,
  } = connectLikeToUserCommentService(props.comment.id, session.data?.user.id);

  const {
    trigger: disconnectLikeToUserComment,
    isMutating: disconnectLikeToUserCommentIsMutating,
  } = disconnectLikeToUserCommentService(
    props.comment.id,
    session.data?.user.id
  );

  const handleLike = async () => {
    await connectLikeToUserComment();
    await userLikedUserCommentMutate();
  };

  const handleDislike = async () => {
    await disconnectLikeToUserComment();
    await userLikedUserCommentMutate();
  };

  const dropdownItems: IDropdownItem[] = [
    {
      key: "share",
      value: "Share",
      icon: <MdShare size={20} />,
      action: handleChange,
      color: "primary",
    },
    {
      key: "edit",
      value: "Edit",
      icon: <MdModeEdit size={20} />,
      action: handleChange,
      isDisabled: session.status != "authenticated",
    },
    {
      key: "delete",
      value: "Delete",
      icon: <MdDelete size={20} />,
      action: onOpenDeleteModal,
      color: "danger",
      isDisabled: session.status != "authenticated",
    },
  ];

  const enabledDropdownItems = dropdownItems.filter((item) => !item.isDisabled);

  return (
    <div className="flex gap-2">
      {session.status == "authenticated" && userLikedUserComment && (
        <Like
          likeMethod={handleLike}
          likeMethodIsLoading={connectLikeToUserCommentIsMutating}
          dislikeMethod={handleDislike}
          dislikeMethodIsLoading={disconnectLikeToUserCommentIsMutating}
          userLikedThisComment={userLikedUserComment[0].likers.length > 0}
          comment={userLikedUserComment[1]}
          authedUserId={session.data.user.id}
        />
      )}
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <IoMdMore size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow">
          {enabledDropdownItems.map(({ key, value, icon, action, color }) => (
            <DropdownItem
              key={key}
              onClick={action}
              color={color}
              startContent={icon}
            >
              {value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {session.status == "authenticated" && (
        <Dialog
          title="Delete"
          description="Are you sure you want to permanently delete this comment?"
          action={async () => await handleDeleteUserComment()}
          isLoading={deleteUserCommentIsMutating}
          isOpen={isOpenDeleteModal}
          onOpenChange={onOpenChangeDeleteModal}
        />
      )}
    </div>
  );
}
