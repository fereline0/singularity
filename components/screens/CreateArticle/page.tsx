"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const [HTML, setHTML] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const { trigger: createArticle, isMutating: createArticleIsMutating } =
    createArticleService(
      title,
      HTML,
      session?.data?.user.id,
      props.section.id,
      true,
    );

  const {
    handleSubmit: successfulValidation,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleRequest),
    values: { title: title, value: HTML },
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
      <TipTap setHTML={setHTML} />
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
