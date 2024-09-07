"use client";

import Dialog from "@/components/shared/Dialog/page";
import IUser from "@/interfaces/user.interface";
import deleteUserService from "@/services/deleteUser.service";
import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

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
        onClick={onOpenDeleteModal}
        isLoading={deleteUserIsMutating}
        color="danger"
        fullWidth
      >
        Delete
      </Button>
      <Dialog
        title="Delete"
        description="Are you sure you want to delete the user account from the database? This action is irreversible!"
        color="danger"
        action={async () => await handleDeleteUser()}
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
        isLoading={deleteUserIsMutating}
      />
    </>
  );
}
