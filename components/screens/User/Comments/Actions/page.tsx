"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { IoMdHeart, IoMdHeartEmpty, IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit, MdShare } from "react-icons/md";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import Dialog from "@/components/shared/Dialog/page";
import deleteUserCommentService from "@/services/deleteUserComment.service";
import { IUserComment } from "@/interfaces/userComment.interface";
import userLikedUserCommentService from "@/services/userLikedUserComment.service";
import createUserCommentLikerService from "@/services/createUserCommentLiker.service";
import deleteUserCommentLikerService from "@/services/deleteUserCommentLiker.service";
import IDropdownItem from "@/interfaces/dropdownItem.interface";

interface IActions<T> {
  comment: IUserComment;
  setCommentForChangeId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => Promise<void | T> | void;
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

  const handleShare = async () => {
    await navigator.clipboard.writeText("/");
    toast.success("Link copied to clipboard");
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
    trigger: createUserCommentLiker,
    isMutating: createUserCommentLikerIsMutating,
  } = createUserCommentLikerService(props.comment.id, session.data?.user.id);

  const {
    trigger: deleteUserCommentLiker,
    isMutating: deleteUserCommentLikerIsMutating,
  } = deleteUserCommentLikerService(props.comment.id, session.data?.user.id);

  const handleLike = async () => {
    await createUserCommentLiker();
    await userLikedUserCommentMutate();
  };

  const handleDislike = async () => {
    await deleteUserCommentLiker();
    await userLikedUserCommentMutate();
  };

  const userLikedThisComment = userLikedUserComment && userLikedUserComment[0];
  const likesCount = userLikedUserComment && userLikedUserComment[1];

  const dropdownItems: IDropdownItem[] = [
    {
      key: "share",
      children: "Share",
      startContent: <MdShare size={20} />,
      onClick: async () => await handleShare(),
      color: "primary",
    },
    {
      key: "edit",
      children: "Edit",
      startContent: <MdModeEdit size={20} />,
      onClick: handleChange,
      isDisabled: session.status != "authenticated",
    },
    {
      key: "delete",
      children: "Delete",
      startContent: <MdDelete size={20} />,
      onClick: onOpenDeleteModal,
      color: "danger",
      isDisabled: session.status != "authenticated",
    },
  ];

  const enabledDropdownItems = dropdownItems.filter((item) => !item.isDisabled);

  return (
    <div className="flex gap-2">
      <Button
        isDisabled={session.status != "authenticated"}
        isLoading={
          userLikedThisComment
            ? deleteUserCommentLikerIsMutating
            : createUserCommentLikerIsMutating
        }
        startContent={
          userLikedThisComment ? (
            <IoMdHeart size={20} />
          ) : (
            <IoMdHeartEmpty size={20} />
          )
        }
        variant="light"
        onClick={async () =>
          session.status == "authenticated"
            ? userLikedThisComment
              ? await handleDislike()
              : await handleLike()
            : null
        }
      >
        {likesCount}
      </Button>
      <Dropdown backdrop="blur" placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <IoMdMore size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow">
          {enabledDropdownItems.map(({ isDisabled, key, ...item }) => (
            <DropdownItem key={key} {...item} />
          ))}
        </DropdownMenu>
      </Dropdown>
      {session.status == "authenticated" && (
        <Dialog
          actions={[
            {
              children: "Delete",
              onClick: async () => await handleDeleteUserComment(),
              color: "danger",
              isLoading: deleteUserCommentIsMutating,
            },
          ]}
          description="Are you sure you want to permanently delete this comment?"
          isOpen={isOpenDeleteModal}
          title="Delete"
          onOpenChange={onOpenChangeDeleteModal}
        />
      )}
    </div>
  );
}
