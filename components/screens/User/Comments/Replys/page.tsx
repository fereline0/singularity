"use client";

import { useState } from "react";
import { formatDistance } from "date-fns";
import { Button, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import Actions from "../Actions/page";

import ClientPaginate from "@/components/shared/ClientPaginate/page";
import Form from "@/components/screens/Comment/Form/page";
import Marginer from "@/components/shared/Marginer/page";
import Comment from "@/components/screens/Comment/page";
import createUserCommentService from "@/services/createUserComment.service";
import updateUserCommentService from "@/services/updateUserComment.service";
import getUserCommentChildsService from "@/services/getUserCommentChilds.service";
import IUser from "@/interfaces/user.interface";
import { IUserComment } from "@/interfaces/userComment.interface";

interface IReplys {
  id: string;
  user: IUser;
}

export default function Replys(props: IReplys) {
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();
  const [visibility, setVisibility] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;
  const session = useSession();
  const { data: comment, mutate } = getUserCommentChildsService(
    visibility ? props.id : undefined,
    page,
    limit,
  );

  const {
    trigger: createUserComment,
    isMutating: createUserCommentIsMutating,
  } = createUserCommentService(
    props.user.id,
    value,
    session.data?.user.id,
    true,
    props.id,
  );

  const {
    trigger: updateUserComment,
    isMutating: updateUserCommentIsMutating,
  } = updateUserCommentService(commentForChangeId, value);

  return (
    <Marginer y={8}>
      <Button onClick={() => setVisibility(!visibility)}>
        {visibility ? "Hide" : "Show"}
      </Button>
      {visibility && (
        <div className="pl-5 border-l-2">
          <Marginer y={8}>
            {session.status == "authenticated" && (
              <Form<IUserComment>
                commentForChangeId={commentForChangeId}
                isLoading={
                  commentForChangeId
                    ? updateUserCommentIsMutating
                    : createUserCommentIsMutating
                }
                publishMethod={async () =>
                  commentForChangeId
                    ? await updateUserComment()
                    : await createUserComment()
                }
                refreshMethod={async () => await mutate()}
                setCommentForChangeId={setCommentForChangeId}
                setValue={setValue}
                value={value}
              />
            )}
            {comment ? (
              comment.childs.length > 0 && (
                <Marginer y={8}>
                  {comment.childs.map((child: IUserComment) => (
                    <Comment
                      key={child.id}
                      actions={
                        <Actions<IUserComment>
                          comment={child}
                          refreshMethod={async () => await mutate()}
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
                          <Replys id={child.id} user={props.user} />
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
                    total={comment._count.childs}
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
