"use client";

import { useState } from "react";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import Actions from "../Actions/page";

import ClientPaginate from "@/components/shared/ClientPaginate/page";
import Form from "@/components/screens/Comment/Form/page";
import Marginer from "@/components/shared/Marginer/page";
import Comment from "@/components/screens/Comment/page";
import { IArticleComment } from "@/interfaces/articleComment.interface";
import useArticleCommentChilds from "@/hooks/useArticleCommentChilds";
import IArticle from "@/interfaces/article.interface";
import useCreateArticleComment from "@/hooks/useCreateArticleComment";
import useUpdateArticleComment from "@/hooks/useUpdateArticleComment";

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
  const { data: articleCommentChilds, mutate: articleCommentChildsMutate } =
    useArticleCommentChilds(visibility ? props.id : undefined, page, limit);

  const {
    trigger: createArticleComment,
    isMutating: createArticleCommentIsMutating,
  } = useCreateArticleComment(
    props.article.id,
    value,
    session.data?.user.id,
    true,
    props.id,
  );

  const {
    trigger: updateArticleComment,
    isMutating: updateArticleCommentIsMutating,
  } = useUpdateArticleComment(commentForChangeId, value, true);

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
                refreshMethod={async () => await articleCommentChildsMutate()}
                setCommentForChangeId={setCommentForChangeId}
                setValue={setValue}
                value={value}
              />
            )}
            {articleCommentChilds ? (
              articleCommentChilds.childs.length > 0 && (
                <Marginer y={8}>
                  {articleCommentChilds.childs.map((child: IArticleComment) => (
                    <Comment
                      key={child.id}
                      actions={
                        <Actions<IArticleComment>
                          comment={child}
                          refreshMethod={async () =>
                            await articleCommentChildsMutate()
                          }
                          setCommentForChangeId={setCommentForChangeId}
                          setValue={setValue}
                        />
                      }
                      description={formatDistance(child.createdAt, new Date(), {
                        addSuffix: true,
                      })}
                      replys={
                        (session.status != "unauthenticated" ||
                          child._count.childs > 0) && (
                          <Replys article={props.article} id={child.id} />
                        )
                      }
                      value={child.value}
                      writer={child.writer}
                    />
                  ))}
                  <ClientPaginate
                    limit={limit}
                    page={page}
                    setPage={setPage}
                    total={articleCommentChilds._count.childs}
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
