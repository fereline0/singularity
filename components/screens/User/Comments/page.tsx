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

  const { trigger: createData, isMutating: createIsMutating } =
    createUserComment(props.user.id, value, session?.data?.user.id);

  const { trigger: updateData, isMutating: updateIsMutating } =
    updateUserComment(value, commentForChangeId);

  return (
    <Marginer y={8}>
      {session.status === "authenticated" && (
        <Form<IUserComment>
          publishMethod={async () =>
            commentForChangeId ? await updateData() : await createData()
          }
          isLoading={commentForChangeId ? updateIsMutating : createIsMutating}
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
