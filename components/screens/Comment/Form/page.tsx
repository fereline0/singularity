"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";

import Marginer from "@/components/shared/Marginer/page";
import commentRequest from "@/requests/comment.request";

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
    <Card>
      <CardBody>
        <Marginer y={8}>
          {props.commentForChangeId && (
            <Button
              endContent={<IoClose size={20} />}
              radius="full"
              variant="light"
              onClick={handleReset}
            >
              Cancel change
            </Button>
          )}
          <Textarea
            disableAutosize
            fullWidth
            errorMessage={errors.value?.message}
            isInvalid={!!errors.value}
            rows={3}
            value={props.value}
            onChange={handleCommentChange}
          />
          <div className="text-right">
            <Button
              color="primary"
              isLoading={props.isLoading}
              onClick={async () => await successfulValidation(handleSubmit)()}
            >
              Publish
            </Button>
          </div>
        </Marginer>
      </CardBody>
    </Card>
  );
}
