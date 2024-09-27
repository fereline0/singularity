"use client";

import { formatDistance } from "date-fns";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { useState } from "react";

import TipTap from "../TipTap/page";

import Comments from "./Comments/page";
import Actions from "./Actions/page";

import Marginer from "@/components/shared/Marginer/page";
import IArticle from "@/interfaces/article.interface";
import SeparatedText from "@/components/shared/SeparatedText/page";
import IPaginate from "@/interfaces/paginate.interface";
import { Button } from "@nextui-org/button";
import Dialog from "@/components/shared/Dialog/page";
import { useDisclosure } from "@nextui-org/use-disclosure";

interface Article extends IPaginate {
  article: IArticle;
}

export default function Article(props: Article) {
  const {
    isOpen: isOpenCancelingChangesModal,
    onOpen: onOpenCancelingChangesModal,
    onOpenChange: onOpenChangeCancelingChangesModal,
  } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <div className="flex gap-2 justify-between">
            <div className="overflow-hidden">
              <h1 className="text-3xl font-semibold">{props.article.title}</h1>
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
      <TipTap content={props.article.value} readOnly={!isEditing} />
      {isEditing && (
        <>
          <Card>
            <CardBody>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="light"
                  onClick={onOpenChangeCancelingChangesModal}
                  color="danger"
                >
                  Cancel change
                </Button>
                <Button color="primary">Publish</Button>
              </div>
            </CardBody>
          </Card>
          <Dialog
            actions={[
              {
                children: "Delete",
                color: "danger",
              },
            ]}
            description="Are you sure you want to permanently delete this article?"
            isOpen={isOpenCancelingChangesModal}
            title="Delete"
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
