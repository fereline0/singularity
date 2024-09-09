"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { IoMdHeart, IoMdHeartEmpty, IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit, MdShare } from "react-icons/md";
import Dialog from "@/components/shared/Dialog/page";
import { useSession } from "next-auth/react";
import IDropdownItem from "@/interfaces/dropdownItem.interface";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
      value: "Share",
      icon: <MdShare size={20} />,
      action: async () => await handleShare(),
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

  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        startContent={
          userLikedThisComment ? (
            <IoMdHeart size={20} />
          ) : (
            <IoMdHeartEmpty size={20} />
          )
        }
        onClick={
          session.status != "authenticated"
            ? () => router.push("/login")
            : async () =>
                userLikedThisComment
                  ? await handleDislike()
                  : await handleLike()
        }
        isLoading={
          userLikedThisComment
            ? deleteArticleCommentLikerIsMutating
            : createArticleCommentLikerIsMutating
        }
        variant="light"
      >
        {likesCount}
      </Button>
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
          color="danger"
          description="Are you sure you want to permanently delete this comment?"
          action={async () => await handleDeleteArticleComment()}
          isLoading={deleteArticleCommentIsMutating}
          isOpen={isOpenDeleteModal}
          onOpenChange={onOpenChangeDeleteModal}
        />
      )}
    </div>
  );
}
