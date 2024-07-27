"use client";

import { deleteUserComment } from "@/services/userComment";
import { IUserComment } from "@/types/userComment";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Dialog from "@/components/shared/Dialog/page";

interface IActions<T> {
  comment: IUserComment;
  setCommentForChangeId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => Promise<void | T> | void;
}

export default function Actions<T>(props: IActions<T>) {
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const handleChange = () => {
    props.setCommentForChangeId(props.comment.id);
    props.setValue(props.comment.value);
  };

  const { trigger: deleteData, isMutating: deleteIsMutating } =
    deleteUserComment(props.comment.id);

  return (
    <>
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <IoMdMore size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow">
          <DropdownItem
            onClick={handleChange}
            startContent={<MdModeEdit size={20} />}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            onClick={onOpenDeleteModal}
            color="danger"
            startContent={<MdDelete size={20} />}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dialog
        title="Delete"
        description="Are you sure you want to permanently delete this comment?"
        action={async () => {
          await deleteData();

          const refreshMethod = props.refreshMethod();

          if (refreshMethod instanceof Promise) {
            await refreshMethod;
          }
        }}
        isLoading={deleteIsMutating}
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
      />
    </>
  );
}
