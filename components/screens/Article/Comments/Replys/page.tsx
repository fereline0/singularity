"use client";

import Comment from "@/components/screens/Comment/page";
import { useState } from "react";
import { formatDistance } from "date-fns";
import ClientPaginate from "@/components/shared/ClientPaginate/page";
import Form from "@/components/screens/Comment/Form/page";
import { Button, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Marginer from "@/components/shared/Marginer/page";
import Actions from "../Actions/page";
import createArticleCommentService from "@/services/createArticleComment.service";
import { IArticleComment } from "@/interfaces/articleComment.interface";
import updateArticleCommentService from "@/services/updateArticleComment.service";
import getArticleCommentChildsService from "@/services/getArticleCommentChilds.service";
import IArticle from "@/interfaces/article.interface";

interface IReplys {
  id: string;
  article: IArticle;
}

export default function Replys(props: IReplys) {
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();
  const [visibility, setVisibility] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;
  const session = useSession();
  const { data: comment, mutate } = getArticleCommentChildsService(
    visibility ? props.id : undefined,
    page,
    limit
  );

  const {
    trigger: createArticleComment,
    isMutating: createArticleCommentIsMutating,
  } = createArticleCommentService(
    props.article.id,
    value,
    session.data?.user.id,
    true,
    props.id
  );

  const {
    trigger: updateArticleComment,
    isMutating: updateArticleCommentIsMutating,
  } = updateArticleCommentService(commentForChangeId, value);

  return (
    <Marginer y={8}>
      <Button onClick={() => setVisibility(!visibility)}>
        {visibility ? "Hide" : "Show"}
      </Button>
      {visibility && (
        <div className="pl-5 border-l-2">
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
                value={value}
                setValue={setValue}
                refreshMethod={async () => await mutate()}
              />
            )}
            {comment ? (
              comment.childs.length > 0 && (
                <Marginer y={8}>
                  {comment.childs.map((child: IArticleComment) => (
                    <Comment
                      key={child.id}
                      writer={child.writer}
                      description={formatDistance(child.createdAt, new Date(), {
                        addSuffix: true,
                      })}
                      value={child.value}
                      replys={
                        (session.status != "unauthenticated" ||
                          child._count.childs > 0) && (
                          <Replys id={child.id} article={props.article} />
                        )
                      }
                      actions={
                        <Actions<IArticleComment>
                          comment={child}
                          setCommentForChangeId={setCommentForChangeId}
                          setValue={setValue}
                          refreshMethod={async () => await mutate()}
                        />
                      }
                    />
                  ))}
                  <ClientPaginate
                    total={comment._count.childs}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </Marginer>
              )
            ) : (
              <div className="flex justify-center content-center">
                <Spinner />
              </div>
            )}
          </Marginer>
        </div>
      )}
    </Marginer>
  );
}
