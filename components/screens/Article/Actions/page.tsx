"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty, IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit, MdShare } from "react-icons/md";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/use-disclosure";

import Dialog from "@/components/shared/Dialog/page";
import IArticle from "@/interfaces/article.interface";
import IDropdownItem from "@/interfaces/dropdownItem.interface";
import createArticleLikerService from "@/services/createArticleLiker.service";
import deleteArticleService from "@/services/deleteArticle.service";
import deleteArticleLikerService from "@/services/deleteArticleLiker.service";
import userLikedArticleService from "@/services/userLikedArticle.service";

interface IActions {
  article: IArticle;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Actions(props: IActions) {
  const session = useSession();
  const router = useRouter();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const handleShare = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/${props.article.id}`,
    );
    toast.success("Link copied to clipboard");
  };

  const { trigger: deleteArticle, isMutating: deleteArticleIsMutating } =
    deleteArticleService(props.article.id);

  const handleDeleteArticle = async () => {
    await deleteArticle();
    onOpenChangeDeleteModal();
    router.refresh();
  };

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
      onClick: () => props.setIsEditing(true),
      isDisabled: props.isEditing,
    },
    {
      key: "delete",
      children: "Delete",
      startContent: <MdDelete size={20} />,
      onClick: () => onOpenDeleteModal(),
      color: "danger",
      isDisabled: false,
    },
  ];

  const { data: userLikedArticle, mutate: userLikedArticleMutate } =
    userLikedArticleService(props.article.id, session.data?.user.id);

  const {
    trigger: createArticleLiker,
    isMutating: createArticleLikerIsMutating,
  } = createArticleLikerService(props.article.id, session.data?.user.id);

  const {
    trigger: deleteArticleLiker,
    isMutating: deleteArticleLikerIsMutating,
  } = deleteArticleLikerService(props.article.id, session.data?.user.id);

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

  const enabledDropdownItems = dropdownItems.filter((item) => !item.isDisabled);

  return (
    <div className="flex gap-2">
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
          session.status == "authenticated"
            ? userLikedThisArticle
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
      <Dialog
        actions={[
          {
            children: "Delete",
            onClick: async () => await handleDeleteArticle(),
            color: "danger",
            isLoading: deleteArticleIsMutating,
          },
        ]}
        description="Are you sure you want to permanently delete this article?"
        isOpen={isOpenDeleteModal}
        title="Delete"
        onOpenChange={onOpenChangeDeleteModal}
      />
    </div>
  );
}
