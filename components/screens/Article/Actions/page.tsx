"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit, MdShare } from "react-icons/md";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/use-disclosure";

import Like from "./Like/page";

import Dialog from "@/components/shared/Dialog/page";
import IArticle from "@/interfaces/article.interface";
import IDropdownItem from "@/interfaces/dropdownItem.interface";
import useDeleteArticle from "@/hooks/useDeleteArticle";

interface IActions {
  article: IArticle;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Actions(props: IActions) {
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
    useDeleteArticle(props.article.id);

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

  const enabledDropdownItems = dropdownItems.filter((item) => !item.isDisabled);

  return (
    <div className="flex gap-2">
      <Like article={props.article} />
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
            key: "delete",
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
