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
import createUserCommentService from "@/services/createUserComment.service";
import updateUserCommentService from "@/services/updateUserComment.service";
import { IUserComment } from "@/interfaces/userComment.interface";
import IPaginate from "@/interfaces/paginate.interface";
import IUser from "@/interfaces/user.interface";

interface IComments extends IPaginate {
  user: IUser;
}

export default function Comments(props: IComments) {
  const router = useRouter();
  const session = useSession();
  console.log(session.data);
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();

  const {
    trigger: createUserComment,
    isMutating: createUserCommentIsMutating,
  } = createUserCommentService(props.user.id, value, session?.data?.user.id);

  const {
    trigger: updateUserComment,
    isMutating: updateUserCommentIsMutating,
  } = updateUserCommentService(value, commentForChangeId);

  return (
    <Marginer y={8}>
      {session.status === "authenticated" && (
        <Form<IUserComment>
          publishMethod={async () =>
            commentForChangeId
              ? await updateUserComment()
              : await createUserComment()
          }
          isLoading={
            commentForChangeId
              ? updateUserCommentIsMutating
              : createUserCommentIsMutating
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
