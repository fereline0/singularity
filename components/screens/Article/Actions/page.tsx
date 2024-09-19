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
      value: "Share",
      icon: <MdShare size={20} />,
      action: async () => await handleShare(),
      color: "primary",
    },
    {
      key: "edit",
      value: "Edit",
      icon: <MdModeEdit size={20} />,
      action: () => console.log("edit"),
      isDisabled: false,
    },
    {
      key: "delete",
      value: "Delete",
      icon: <MdDelete size={20} />,
      action: () => onOpenDeleteModal(),
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
          {enabledDropdownItems.map(({ key, value, icon, action, color }) => (
            <DropdownItem
              key={key}
              color={color}
              startContent={icon}
              onClick={action}
            >
              {value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Dialog
        action={async () => await handleDeleteArticle()}
        color="danger"
        description="Are you sure you want to permanently delete this article?"
        isLoading={deleteArticleIsMutating}
        isOpen={isOpenDeleteModal}
        title="Delete"
        onOpenChange={onOpenChangeDeleteModal}
      />
    </div>
  );
}
