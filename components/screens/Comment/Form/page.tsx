"use client";

import Marginer from "@/components/shared/Marginer/page";
import commentRequest from "@/requests/comment.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

interface IForm {
  publishMethod: () => void;
  commentForChangeId: string | undefined;
  setCommentForChangeId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  refreshMethod: () => void;
}

export default function Form(props: IForm) {
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
    props.publishMethod();
    handleReset();
    props.refreshMethod();
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <Card shadow="none">
      <CardBody>
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            successfulValidation(handleSubmit)();
          }}
          className="flex gap-2 flex-col sm:flex-row"
        >
          <div className="w-full">
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
            </Marginer>
          </div>
          <Button type="submit" color="primary">
            Publish
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
