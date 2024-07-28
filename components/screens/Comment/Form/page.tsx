"use client";

import Marginer from "@/components/shared/Marginer/page";
import commentRequest from "@/requests/comment.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

interface IForm<T> {
  publishMethod: () => Promise<void | T> | void;
  isLoading: boolean;
  commentForChangeId: string | undefined;
  setCommentForChangeId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => Promise<void | T> | void;
}

export default function Form<T>(props: IForm<T>) {
  const {
    handleSubmit: successfulValidation,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentRequest),
    values: { value: props.value },
  });

  const handleReset = () => {
    props.setCommentForChangeId(undefined);
    props.setValue("");
  };

  const handleSubmit = async () => {
    await props.publishMethod();
    handleReset();

    const refreshMethod = props.refreshMethod();
    if (refreshMethod instanceof Promise) {
      await refreshMethod;
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <Card shadow="none">
      <CardBody>
        <Marginer y={8}>
          {props.commentForChangeId && (
            <Button
              onClick={handleReset}
              radius="full"
              variant="light"
              endContent={<IoClose size={20} />}
            >
              Cancel change
            </Button>
          )}
          <Textarea
            value={props.value}
            onChange={handleCommentChange}
            isInvalid={!!errors.value}
            errorMessage={errors.value?.message?.toString()}
            rows={3}
            disableAutosize
          />
          <Button
            color="primary"
            onClick={async () => await successfulValidation(handleSubmit)()}
            isLoading={props.isLoading}
          >
            Publish
          </Button>
        </Marginer>
      </CardBody>
    </Card>
  );
}
