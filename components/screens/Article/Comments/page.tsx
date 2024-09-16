"use client";

import { useRouter } from "next/navigation";
import { formatDistance } from "date-fns";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Replys from "./Replys/page";
import Actions from "./Actions/page";

import ServerPaginate from "@/components/shared/ServerPaginate/page";
import Form from "@/components/screens/Comment/Form/page";
import Marginer from "@/components/shared/Marginer/page";
import Comment from "@/components/screens/Comment/page";
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
    true,
  );

  const {
    trigger: updateArticleComment,
    isMutating: updateArticleCommentIsMutating,
  } = updateArticleCommentService(commentForChangeId, value);

  return (
    <Marginer y={8}>
      {session.status == "authenticated" && (
        <Form<IArticleComment>
          commentForChangeId={commentForChangeId}
          isLoading={
            commentForChangeId
              ? updateArticleCommentIsMutating
              : createArticleCommentIsMutating
          }
          publishMethod={async () =>
            commentForChangeId
              ? await updateArticleComment()
              : await createArticleComment()
          }
          refreshMethod={router.refresh}
          setCommentForChangeId={setCommentForChangeId}
          setValue={setValue}
          value={value}
        />
      )}
      {props.total > 0 && (
        <Marginer y={8}>
          {props.article.comments.map((comment: IArticleComment) => (
            <Comment
              key={comment.id}
              actions={
                <Actions
                  comment={comment}
                  refreshMethod={router.refresh}
                  setCommentForChangeId={setCommentForChangeId}
                  setValue={setValue}
                />
              }
              description={formatDistance(comment.createdAt, new Date(), {
                addSuffix: true,
              })}
              replys={
                (session.status == "authenticated" ||
                  comment._count.childs > 0) && (
                  <Replys article={props.article} id={comment.id} />
                )
              }
              value={comment.value}
              writer={comment.writer}
            />
          ))}
          <ServerPaginate limit={props.limit} total={props.total} />
        </Marginer>
      )}
    </Marginer>
  );
}
