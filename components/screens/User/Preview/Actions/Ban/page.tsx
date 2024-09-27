import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { DateInput } from "@nextui-org/date-input";

import deleteUserBansService from "@/services/deleteUserBans.service";
import createUserBanService from "@/services/createUserBan.service";
import banRequest from "@/requests/ban.request";
import Dialog from "@/components/shared/Dialog/page";
import IUser from "@/interfaces/user.interface";

interface IBan {
  user: IUser;
  authedUserId: string;
}

export default function Ban(props: IBan) {
  const router = useRouter();

  const findedActiveBan = props.user.bans.find(
    (ban) => new Date(ban.expires) > new Date() && ban.activity,
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
      props.authedUserId,
    );

  const { trigger: deleteUserBans, isMutating: deleteUserBansIsMutating } =
    deleteUserBansService(props.user.id);

  return (
    <>
      {findedActiveBan ? (
        <>
          <Button fullWidth color="danger" onClick={onOpenUnbanModal}>
            Unban
          </Button>
          <Dialog
            actions={[
              {
                key: "unbun",
                children: "Unban",
                onClick: async () => await handleDeleteUserBans(),
                color: "danger",
                isLoading: deleteUserBansIsMutating,
              },
            ]}
            description="Are you sure that you want to restore the user access to this resource?"
            isOpen={isOpenUnbanModal}
            title="Unban"
            onOpenChange={onOpenChangeUnbanModal}
          />
        </>
      ) : (
        <>
          <Button fullWidth color="danger" onClick={onOpenBanModal}>
            Ban
          </Button>
          <Dialog
            actions={[
              {
                key: "ban",
                children: "Ban",
                onClick: async () =>
                  await successfulValidation(handleCreateUserBan)(),
                color: "danger",
                isLoading: createUserBanIsMutating,
              },
            ]}
            description="Are you sure that you want to restrict user access to this resource for the period you select?"
            isOpen={isOpenBanModal}
            title="Ban"
            onOpenChange={onOpenChangeBanModal}
          >
            <Input
              errorMessage={errors.reason?.message?.toString()}
              isInvalid={!!errors.reason}
              placeholder="Reason"
              onChange={handleReasonChange}
            />
            <DateInput
              aria-label="Expires"
              errorMessage={errors.expires?.message?.toString()}
              granularity="minute"
              isInvalid={!!errors.expires}
              value={expires}
              onChange={setExpires}
            />
          </Dialog>
        </>
      )}
    </>
  );
}
