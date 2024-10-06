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
  const [value, setValue] = useState("");
  const [commentForChangeId, setCommentForChangeId] = useState<string>();

  const {
    trigger: createUserComment,
    isMutating: createUserCommentIsMutating,
  } = createUserCommentService(
    props.user.id,
    value,
    session?.data?.user.id,
    true
  );

  const {
    trigger: updateUserComment,
    isMutating: updateUserCommentIsMutating,
  } = updateUserCommentService(commentForChangeId, value, true);

  return (
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
          refreshMethod={router.refresh}
          setCommentForChangeId={setCommentForChangeId}
          setValue={setValue}
          value={value}
        />
      )}
      {props.total > 0 && (
        <Marginer y={8}>
          {props.user.comments.map((comment: IUserComment) => (
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
                  <Replys id={comment.id} user={props.user} />
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
