"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import TipTap from "../TipTap/page";

import createArticleService from "@/services/createArticle.service";
import articleRequest from "@/requests/article.request";
import Marginer from "@/components/shared/Marginer/page";
import ISection from "@/interfaces/section.interface";

interface ICreateArticle {
  section: ISection;
}

export default function CreateArticle(props: ICreateArticle) {
  const router = useRouter();
  const session = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const { trigger: createArticle, isMutating: createArticleIsMutating } =
    createArticleService(
      title,
      content,
      session?.data?.user.id,
      props.section.id,
      true,
    );

  const {
    handleSubmit: successfulValidation,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleRequest),
    values: { title: title, value: content },
  });

  const handleSubmit = async () => {
    await createArticle();
    router.push(`/${props.section.id}`);
    router.refresh();
  };

  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <Input
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </CardBody>
      </Card>
      <TipTap setContent={setContent} />
      <Card>
        <CardBody>
          <Button
            color="primary"
            isLoading={createArticleIsMutating}
            onClick={async () => await successfulValidation(handleSubmit)()}
          >
            Publish
          </Button>
        </CardBody>
      </Card>
    </Marginer>
  );
}
