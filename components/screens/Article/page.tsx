"use client";

import { formatDistance } from "date-fns";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TipTap from "../TipTap/page";

import Comments from "./Comments/page";
import Actions from "./Actions/page";

import Marginer from "@/components/shared/Marginer/page";
import IArticle from "@/interfaces/article.interface";
import SeparatedText from "@/components/shared/SeparatedText/page";
import IPaginate from "@/interfaces/paginate.interface";
import Dialog from "@/components/shared/Dialog/page";
import articleRequest from "@/requests/article.request";
import useUpdateArticle from "@/hooks/useUpdateArticle";

interface Article extends IPaginate {
  article: IArticle;
}

export default function Article(props: Article) {
  const {
    isOpen: isOpenCancelingChangesModal,
    onOpen: onOpenCancelingChangesModal,
    onOpenChange: onOpenChangeCancelingChangesModal,
  } = useDisclosure();

  const [title, setTitle] = useState(props.article.title);
  const [content, setContent] = useState(props.article.value);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const {
    handleSubmit: successfulValidation,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleRequest),
    values: { title: title, value: content },
  });

  const { trigger: updateArticle, isMutating: updateArticleIsMutating } =
    useUpdateArticle(props.article.id, title, content, true);

  const handleSubmit = async () => {
    await updateArticle();
    setIsEditing(false);
  };

  const handleCancelingChanges = () => {
    setTitle(props.article.title);
    setContent(props.article.value);
    setIsEditing(false);
    onOpenChangeCancelingChangesModal();
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <div className="flex gap-2 justify-between">
            <div className="w-full overflow-hidden">
              {isEditing ? (
                <Input
                  className="mb-2"
                  defaultValue={title}
                  errorMessage={errors.title?.message}
                  isInvalid={!!errors.title}
                  placeholder="Title"
                  onChange={handleTitleChange}
                />
              ) : (
                <h1 className="text-3xl font-semibold">{title}</h1>
              )}
              <SeparatedText>
                <Link href={`/users/${props.article.writer.id}`}>
                  {props.article.writer.name}
                </Link>
                <p>
                  {formatDistance(props.article.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </SeparatedText>
            </div>
            <Actions
              article={props.article}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </CardBody>
      </Card>
      <TipTap content={content} readOnly={!isEditing} setContent={setContent} />
      {isEditing && (
        <>
          <Card>
            <CardBody>
              <div className="flex gap-2 justify-end">
                <Button
                  color="danger"
                  variant="light"
                  onClick={onOpenCancelingChangesModal}
                >
                  Cancel change
                </Button>
                <Button
                  color="primary"
                  isLoading={updateArticleIsMutating}
                  onClick={async () =>
                    await successfulValidation(handleSubmit)()
                  }
                >
                  Publish
                </Button>
              </div>
            </CardBody>
          </Card>
          <Dialog
            actions={[
              {
                key: "cancelChange",
                children: "Cancel change",
                onClick: handleCancelingChanges,
                color: "danger",
              },
            ]}
            description="Are you sure you want to rollback the changes you made? This action is irreversible!"
            isOpen={isOpenCancelingChangesModal}
            title="Cancel change"
            onOpenChange={onOpenChangeCancelingChangesModal}
          />
        </>
      )}
      <Comments
        article={props.article}
        limit={props.limit}
        total={props.total}
      />
    </Marginer>
  );
}
