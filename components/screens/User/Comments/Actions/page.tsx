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

interface IActions {
  comment: IUserComment;
  setCommentForChangeId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => void;
}

export default function Actions(props: IActions) {
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const handleChange = () => {
    props.setCommentForChangeId(props.comment.id);
    props.setValue(props.comment.value);
  };

  return (
    <>
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <IoMdMore size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User comment actions" variant="shadow">
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
        action={() => {
          deleteUserComment(props.comment.id);
          props.refreshMethod();
        }}
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
      />
    </>
  );
}
