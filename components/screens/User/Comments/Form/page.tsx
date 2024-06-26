"use client";

import commentRequest from "@/requests/comment.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Link, Textarea } from "@nextui-org/react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { createUserComment } from "@/services/userComment";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import IUser from "@/types/user.type";

interface IForm {
  userId: string;
  quotedUser: IUser | undefined;
  setQuotedUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => void;
  parentId?: string;
}

export default function Form(props: IForm) {
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentRequest),
  });

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  if (session.status != "authenticated") {
    return null;
  }

  return (
    <Card shadow="none" className="mb-2">
      <CardBody>
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmit(async () => {
              await createUserComment(
                props.userId,
                session.data.user.id,
                props.value,
                props.parentId
              );
              props.setValue("");
              props.refreshMethod();
            })();
          }}
          className="flex gap-2 flex-col sm:flex-row"
        >
          <div className="w-full">
            {props.quotedUser && (
              <div className="flex justify-between items-center gap-2 sm:justify-normal">
                <div>
                  Reply to{" "}
                  <Link href={`/users/${props.quotedUser.id}`}>
                    {props.quotedUser.name}
                  </Link>
                </div>
                <Button
                  isIconOnly
                  onClick={() => props.setQuotedUser(undefined)}
                  radius="full"
                  variant="light"
                >
                  <IoClose size={20} />
                </Button>
              </div>
            )}
            <Textarea
              {...register("value")}
              value={props.value}
              onChange={handleCommentChange}
              isInvalid={!!errors.value}
              errorMessage={errors.value?.message?.toString()}
            />
          </div>
          <Button type="submit" color="primary">
            Publish
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
