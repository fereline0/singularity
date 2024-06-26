"use client";

import commentRequest from "@/requests/comment.request";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Link,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import IComment from "@/types/comment.type";

interface IForm {
  publishMethod: () => void;
  commentForChange: IComment | undefined;
  setCommentForChange: React.Dispatch<
    React.SetStateAction<IComment | undefined>
  >;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => void;
}

export default function Form(props: IForm) {
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

  return (
    <Card shadow="none">
      <CardBody>
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmit(async () => {
              props.publishMethod();
              props.setValue("");
              props.refreshMethod();
            })();
          }}
          className="flex gap-2 flex-col sm:flex-row"
        >
          <div className="w-full">
            {props.commentForChange && (
              <>
                <Button
                  onClick={() => props.setCommentForChange(undefined)}
                  radius="full"
                  variant="light"
                  endContent={<IoClose size={20} />}
                >
                  Cancel change
                </Button>
                <Spacer y={2} />
              </>
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
