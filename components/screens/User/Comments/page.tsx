"use client";
import IPaginate from "@/types/paginate.type";
import Comment from "@/components/screens/Comment/page";
import IUser from "@/types/user.type";
import { useRouter } from "next/navigation";
import { formatDistance } from "date-fns";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import Replys from "./Replys/page";
import { IUserComment } from "@/types/userComment";
import Form from "./Form/page";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface IComments extends IPaginate {
  user: IUser;
}

export default function Comments(props: IComments) {
  const router = useRouter();
  const session = useSession();
  const [value, setValue] = useState("");
  const [quotedUser, setQuotedUser] = useState<IUser | undefined>();

  return (
    <>
      <Form
        userId={props.user.id}
        refreshMethod={router.refresh}
        quotedUser={quotedUser}
        setQuotedUser={setQuotedUser}
        value={value}
        setValue={setValue}
      />
      {props.user.comments.map((comment: IUserComment) => (
        <Comment
          key={comment.id}
          writer={comment.writer}
          description={formatDistance(comment.createdAt, new Date(), {
            addSuffix: true,
          })}
          value={comment.value}
          replys={
            (session.status == "authenticated" ||
              comment._count.childs > 0) && (
              <Replys id={comment.id} user={props.user} />
            )
          }
        />
      ))}
      <ServerPaginate total={props.total} limit={props.limit} />
    </>
  );
}
