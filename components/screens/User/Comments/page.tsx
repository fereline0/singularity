"use client";

import IPaginate from "@/types/paginate.type";
import Comment from "@/components/screens/Comment/page";
import IUser from "@/types/user.type";
import { useRouter } from "next/navigation";
import { formatDistance } from "date-fns";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import Replys from "./Replys/page";
import { IUserComment } from "@/types/userComment";
import Form from "@/components/screens/Comment/Form/page";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createUserComment } from "@/services/userComment";
import IComment from "@/types/comment.type";
import { Spacer } from "@nextui-org/react";

interface IComments extends IPaginate {
  user: IUser;
}

export default function Comments(props: IComments) {
  const router = useRouter();
  const session = useSession();
  const [value, setValue] = useState("");
  const [commentForChange, setCommentForChange] = useState<
    IComment | undefined
  >();

  return (
    <>
      {session.status === "authenticated" && (
        <>
          <Form
            publishMethod={async () =>
              await createUserComment(
                props.user.id,
                session.data.user.id,
                value
              )
            }
            commentForChange={commentForChange}
            setCommentForChange={setCommentForChange}
            refreshMethod={router.refresh}
            value={value}
            setValue={setValue}
          />
          <Spacer y={2} />
        </>
      )}
      {props.total > 0 && (
        <>
          {props.user.comments.map((comment: IUserComment) => (
            <>
              <Comment
                key={comment.id}
                writer={comment.writer}
                description={formatDistance(comment.createdAt, new Date(), {
                  addSuffix: true,
                })}
                value={comment.value}
                replys={
                  (session.status === "authenticated" ||
                    comment._count.childs > 0) && (
                    <Replys id={comment.id} user={props.user} />
                  )
                }
              />
              <Spacer y={5} />
            </>
          ))}
          <ServerPaginate total={props.total} limit={props.limit} />
        </>
      )}
    </>
  );
}
