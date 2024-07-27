"use client";

import Marginer from "@/components/shared/Marginer/page";
import IUser from "@/types/user.type";
import { stringToCurrentDate } from "@/utils/stringToCurrentDate";
import createUserBanService from "@/services/createUserBan.service";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import deleteUserBansService from "@/services/deleteUserBans.service";
import deleteUserService from "@/services/deleteUser.service";
import Dialog from "@/components/shared/Dialog/page";
import { useState } from "react";

interface IActions {
  user: IUser;
}

export default function Actions(props: IActions) {
  const session = useSession();

  const router = useRouter();

  const findedActiveBan = props.user.bans.find(
    (ban) => new Date(ban.expires) > new Date() && ban.activity
  );

  const {
    isOpen: isOpenBanModal,
    onOpen: onOpenBanModal,
    onOpenChange: onOpenChangeBanModal,
  } = useDisclosure();

  const [reason, setReason] = useState("");

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const { trigger: createUserBan, isMutating: createUserBanIsMutating } =
    createUserBanService(
      props.user.id,
      reason,
      stringToCurrentDate("+ 30 minutes").toString(),
      session.data?.user.id
    );

  const { trigger: deleteUserBans, isMutating: deleteUserBansIsMutating } =
    deleteUserBansService(props.user.id);

  const { trigger: deleteUser, isMutating: deleteUserIsMutating } =
    deleteUserService(props.user.id);

  return (
    <Marginer y={8}>
      <Button fullWidth>Subscribe</Button>
      {findedActiveBan ? (
        <Button
          onClick={async () => {
            await deleteUserBans();
            router.refresh();
          }}
          color="danger"
          fullWidth
          isLoading={deleteUserBansIsMutating}
        >
          Unban
        </Button>
      ) : (
        <>
          <Button
            onClick={onOpenBanModal}
            color="danger"
            fullWidth
            isLoading={deleteUserBansIsMutating}
          >
            Ban
          </Button>
          <Dialog
            title="Ban"
            action={async () => {
              await createUserBan();
              router.refresh();
            }}
            isOpen={isOpenBanModal}
            onOpenChange={onOpenChangeBanModal}
            isLoading={createUserBanIsMutating}
          >
            <Input
              autoFocus
              placeholder="Reason"
              onChange={handleReasonChange}
            />
          </Dialog>
        </>
      )}
      <Button
        onClick={async () => {
          await deleteUser();
          router.refresh();
        }}
        isLoading={deleteUserIsMutating}
        color="danger"
        fullWidth
      >
        Delete
      </Button>
    </Marginer>
  );
}
