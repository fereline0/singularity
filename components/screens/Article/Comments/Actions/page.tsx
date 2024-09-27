"use client";

import { IoMdHeart, IoMdHeartEmpty, IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit, MdShare } from "react-icons/md";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/use-disclosure";

import IDropdownItem from "@/interfaces/dropdownItem.interface";
import Dialog from "@/components/shared/Dialog/page";
import { IArticleComment } from "@/interfaces/articleComment.interface";
import deleteArticleCommentService from "@/services/deleteArticleComment.service";
import createArticleCommentLikerService from "@/services/createArticleCommentLiker.service";
import deleteArticleCommentLikerService from "@/services/deleteArticleCommentLiker.service";
import userLikedArticleCommentService from "@/services/userLikedArticleComment.service";

interface IActions<T> {
  comment: IArticleComment;
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
    trigger: deleteArticleComment,
    isMutating: deleteArticleCommentIsMutating,
  } = deleteArticleCommentService(props.comment.id);

  const handleDeleteArticleComment = async () => {
    await deleteArticleComment();
    onOpenChangeDeleteModal();
    const refreshMethod = props.refreshMethod();

    if (refreshMethod instanceof Promise) {
      await refreshMethod;
    }
  };

  const {
    data: userLikedArticleComment,
    mutate: userLikedArticleCommentMutate,
  } = userLikedArticleCommentService(props.comment.id, session.data?.user.id);

  const {
    trigger: createArticleCommentLiker,
    isMutating: createArticleCommentLikerIsMutating,
  } = createArticleCommentLikerService(props.comment.id, session.data?.user.id);

  const {
    trigger: deleteArticleCommentLiker,
    isMutating: deleteArticleCommentLikerIsMutating,
  } = deleteArticleCommentLikerService(props.comment.id, session.data?.user.id);

  const handleLike = async () => {
    await createArticleCommentLiker();
    await userLikedArticleCommentMutate();
  };

  const handleDislike = async () => {
    await deleteArticleCommentLiker();
    await userLikedArticleCommentMutate();
  };

  const userLikedThisComment =
    userLikedArticleComment && userLikedArticleComment[0];
  const likesCount = userLikedArticleComment && userLikedArticleComment[1];

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
            ? deleteArticleCommentLikerIsMutating
            : createArticleCommentLikerIsMutating
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
              key: "delete",
              children: "Delete",
              onClick: async () => await handleDeleteArticleComment(),
              color: "danger",
              isLoading: deleteArticleCommentIsMutating,
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
