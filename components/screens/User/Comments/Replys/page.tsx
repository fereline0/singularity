"use client";

import {
  createUserComment,
  getUserCommentChilds,
  updateUserComment,
} from "@/services/userComment";
import Comment from "@/components/screens/Comment/page";
import { IUserComment } from "@/types/userComment";
import { useState } from "react";
import { formatDistance } from "date-fns";
import ClientPaginate from "@/components/shared/ClientPaginate/page";
import Form from "@/components/screens/Comment/Form/page";
import { Button, Spinner } from "@nextui-org/react";
import IUser from "@/types/user.type";
import { useSession } from "next-auth/react";
import Marginer from "@/components/shared/Marginer/page";
import Actions from "../Actions/page";

interface IReplys {
  id: string;
  user: IUser;
}

export default function Replys(props: IReplys) {
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();
  const [visibility, setVisibility] = useState(false);
  const session = useSession();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: comment, mutate } = getUserCommentChilds(
    visibility ? props.id : null,
    page,
    limit
  );

  return (
    <Marginer y={8}>
      <Button onClick={() => setVisibility(!visibility)}>
        {visibility ? "Hide" : "Show "}
      </Button>
      {visibility && (
        <div className="pl-5 border-l-2">
          <Marginer y={8}>
            {session.status === "authenticated" && (
              <Form
                publishMethod={async () =>
                  commentForChangeId
                    ? await updateUserComment(commentForChangeId, value)
                    : await createUserComment(
                        props.user.id,
                        session.data.user.id,
                        value,
                        props.id
                      )
                }
                commentForChangeId={commentForChangeId}
                setCommentForChangeId={setCommentForChangeId}
                value={value}
                setValue={setValue}
                refreshMethod={mutate}
              />
            )}
            {comment ? (
              comment.childs.length > 0 && (
                <>
                  <Marginer y={8}>
                    {comment.childs.map((child: IUserComment) => (
                      <Comment
                        key={child.id}
                        writer={child.writer}
                        description={formatDistance(
                          child.createdAt,
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                        value={child.value}
                        replys={
                          (session.status !== "unauthenticated" ||
                            child._count.childs > 0) && (
                            <Replys id={child.id} user={props.user} />
                          )
                        }
                        actions={
                          <Actions
                            comment={child}
                            setCommentForChangeId={setCommentForChangeId}
                            setValue={setValue}
                            refreshMethod={mutate}
                          />
                        }
                      />
                    ))}
                  </Marginer>
                  <ClientPaginate
                    total={comment._count.childs}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </>
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
