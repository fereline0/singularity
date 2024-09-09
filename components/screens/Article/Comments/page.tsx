"use client";

import Comment from "@/components/screens/Comment/page";
import { useRouter } from "next/navigation";
import { formatDistance } from "date-fns";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import Replys from "./Replys/page";
import Form from "@/components/screens/Comment/Form/page";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Marginer from "@/components/shared/Marginer/page";
import Actions from "./Actions/page";
import IPaginate from "@/interfaces/paginate.interface";
import IArticle from "@/interfaces/article.interface";
import createArticleCommentService from "@/services/createArticleComment.service";
import updateArticleCommentService from "@/services/updateArticleComment.service";
import { IArticleComment } from "@/interfaces/articleComment.interface";

interface IComments extends IPaginate {
  article: IArticle;
}

export default function Comments(props: IComments) {
  const router = useRouter();
  const session = useSession();
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();

  const {
    trigger: createArticleComment,
    isMutating: createArticleCommentIsMutating,
  } = createArticleCommentService(
    props.article.id,
    value,
    session?.data?.user.id,
    true
  );

  const {
    trigger: updateArticleComment,
    isMutating: updateArticleCommentIsMutating,
  } = updateArticleCommentService(commentForChangeId, value);

  return (
    <Marginer y={8}>
      {session.status == "authenticated" && (
        <Form<IArticleComment>
          publishMethod={async () =>
            commentForChangeId
              ? await updateArticleComment()
              : await createArticleComment()
          }
          isLoading={
            commentForChangeId
              ? updateArticleCommentIsMutating
              : createArticleCommentIsMutating
          }
          commentForChangeId={commentForChangeId}
          setCommentForChangeId={setCommentForChangeId}
          refreshMethod={router.refresh}
          value={value}
          setValue={setValue}
        />
      )}
      {props.total > 0 && (
        <Marginer y={8}>
          {props.article.comments.map((comment: IArticleComment) => (
            <Comment
              key={comment.id}
              writer={comment.writer}
              description={formatDistance(comment.createdAt, new Date(), {
                addSuffix: true,
              })}
              value={comment.value}
              replys={
                (session.status == "authenticated" ||
                  comment._count.childs > 0) && (
                  <Replys id={comment.id} article={props.article} />
                )
              }
              actions={
                <Actions
                  comment={comment}
                  setCommentForChangeId={setCommentForChangeId}
                  setValue={setValue}
                  refreshMethod={router.refresh}
                />
              }
            />
          ))}
          <ServerPaginate total={props.total} limit={props.limit} />
        </Marginer>
      )}
    </Marginer>
  );
}
