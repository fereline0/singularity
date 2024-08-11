import Dialog from "@/components/shared/Dialog/page";
import banRequest from "@/requests/ban.request";
import createUserBanService from "@/services/createUserBan.service";
import deleteUserBansService from "@/services/deleteUserBans.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DateInput, Input, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getLocalTimeZone, now } from "@internationalized/date";
import IUser from "@/interfaces/user.interface";

interface IBan {
  user: IUser;
  authedUserId: string;
}

export default function Ban(props: IBan) {
  const router = useRouter();

  const findedActiveBan = props.user.bans.find(
    (ban) => new Date(ban.expires) > new Date() && ban.activity
  );

  const {
    isOpen: isOpenBanModal,
    onOpen: onOpenBanModal,
    onOpenChange: onOpenChangeBanModal,
  } = useDisclosure();

  const {
    isOpen: isOpenUnbanModal,
    onOpen: onOpenUnbanModal,
    onOpenChange: onOpenChangeUnbanModal,
  } = useDisclosure();

  const [reason, setReason] = useState("");
  const [expires, setExpires] = useState(now(getLocalTimeZone()));

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const {
    handleSubmit: successfulValidation,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(banRequest),
    values: { reason: reason, expires: new Date(expires.toDate()) },
  });

  const handleCreateUserBan = async () => {
    await createUserBan();
    onOpenChangeBanModal();
    router.refresh();
  };

  const handleDeleteUserBans = async () => {
    await deleteUserBans();
    onOpenChangeUnbanModal();
    router.refresh();
  };

  const { trigger: createUserBan, isMutating: createUserBanIsMutating } =
    createUserBanService(
      props.user.id,
      reason,
      new Date(expires.toDate()).toString(),
      props.authedUserId
    );

  const { trigger: deleteUserBans, isMutating: deleteUserBansIsMutating } =
    deleteUserBansService(props.user.id);

  return (
    <>
      {findedActiveBan ? (
        <>
          <Button onClick={onOpenUnbanModal} color="danger" fullWidth>
            Unban
          </Button>
          <Dialog
            title="Unban"
            description="Are you sure that you want to restore the user access to this resource?"
            action={async () => await handleDeleteUserBans()}
            isOpen={isOpenUnbanModal}
            onOpenChange={onOpenChangeUnbanModal}
            isLoading={deleteUserBansIsMutating}
          />
        </>
      ) : (
        <>
          <Button onClick={onOpenBanModal} color="danger" fullWidth>
            Ban
          </Button>
          <Dialog
            title="Ban"
            description="Are you sure that you want to restrict user access to this resource for the period you select?"
            action={async () =>
              await successfulValidation(handleCreateUserBan)()
            }
            isOpen={isOpenBanModal}
            onOpenChange={onOpenChangeBanModal}
            isLoading={createUserBanIsMutating}
          >
            <Input
              autoFocus
              placeholder="Reason"
              onChange={handleReasonChange}
              isInvalid={!!errors.reason}
              errorMessage={errors.reason?.message?.toString()}
            />
            <DateInput
              aria-label="Expires"
              value={expires}
              granularity="minute"
              onChange={setExpires}
              isInvalid={!!errors.expires}
              errorMessage={errors.expires?.message?.toString()}
            />
          </Dialog>
        </>
      )}
    </>
  );
}
