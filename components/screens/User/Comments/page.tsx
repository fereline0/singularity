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
import { createUserComment, updateUserComment } from "@/services/userComment";
import Marginer from "@/components/shared/Marginer/page";
import Actions from "./Actions/page";

interface IComments extends IPaginate {
  user: IUser;
}

export default function Comments(props: IComments) {
  const router = useRouter();
  const session = useSession();
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();

  return (
    <Marginer y={8}>
      {session.status === "authenticated" && (
        <Form
          publishMethod={async () =>
            commentForChangeId
              ? await updateUserComment(commentForChangeId, value)
              : await createUserComment(
                  props.user.id,
                  session.data.user.id,
                  value
                )
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
          {props.user.comments.map((comment: IUserComment) => (
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
