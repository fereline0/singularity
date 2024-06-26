"use client";

import { getUserCommentChilds } from "@/services/userComment";
import Comment from "@/components/screens/Comment/page";
import { IUserComment } from "@/types/userComment";
import { useState } from "react";
import { formatDistance } from "date-fns";
import ClientPaginate from "@/components/shared/ClientPaginate/page";
import Form from "../Form/page";
import { Button, Spinner } from "@nextui-org/react";

interface IReplys {
  id: string;
  userId: string;
}

export default function Replys(props: IReplys) {
  const [value, setValue] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: comment, mutate } = getUserCommentChilds(
    visibility ? props.id : null,
    page,
    limit
  );

  return (
    <>
      <Button onClick={() => setVisibility(!visibility)} className="mb-2">
        {visibility ? "Hide" : "Show"}
      </Button>
      {visibility && (
        <div className="pl-5 border-l-2 mb-5">
          <Form
            value={value}
            setValue={setValue}
            userId={props.userId}
            refreshMethod={mutate}
            parentId={props.id}
          />
          {comment ? (
            <>
              {comment.childs.map((child: IUserComment) => (
                <Comment
                  key={child.id}
                  writer={child.writer}
                  description={formatDistance(child.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                  value={child.value}
                  replys={<Replys id={child.id} userId={props.userId} />}
                />
              ))}
              <ClientPaginate
                total={comment._count.childs}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </>
          ) : (
            <div className="flex justify-center content-center">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </>
  );
}
