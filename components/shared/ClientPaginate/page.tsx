"use client";

import IPaginate from "@/types/paginate.type";
import { Pagination } from "@nextui-org/react";

interface IClientPaginate extends IPaginate {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ClientPaginate(props: IClientPaginate) {
  const totalPageCount = Math.ceil(props.total / props.limit);

  return (
    <Pagination
      total={totalPageCount}
      onChange={(page: number) => props.setPage(page)}
      initialPage={props.page}
    />
  );
}
