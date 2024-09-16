"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import Dialog from "@/components/shared/Dialog/page";
import IUser from "@/interfaces/user.interface";
import deleteUserService from "@/services/deleteUser.service";

interface IDelete {
  user: IUser;
}

export default function Delete(props: IDelete) {
  const router = useRouter();

  const { trigger: deleteUser, isMutating: deleteUserIsMutating } =
    deleteUserService(props.user.id);

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const handleDeleteUser = async () => {
    await deleteUser();
    onOpenChangeDeleteModal();
    router.refresh();
  };

  return (
    <>
      <Button
        fullWidth
        color="danger"
        isLoading={deleteUserIsMutating}
        onClick={onOpenDeleteModal}
      >
        Delete
      </Button>
      <Dialog
        action={async () => await handleDeleteUser()}
        color="danger"
        description="Are you sure you want to delete the user account from the database? This action is irreversible!"
        isLoading={deleteUserIsMutating}
        isOpen={isOpenDeleteModal}
        title="Delete"
        onOpenChange={onOpenChangeDeleteModal}
      />
    </>
  );
}
