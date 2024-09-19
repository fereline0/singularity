"use client";

import { Pagination } from "@nextui-org/pagination";

import IPaginate from "@/interfaces/paginate.interface";

interface IClientPaginate extends IPaginate {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ClientPaginate(props: IClientPaginate) {
  const totalPageCount = Math.ceil(props.total / props.limit);

  return (
    <Pagination
      initialPage={props.page}
      total={totalPageCount}
      onChange={(page: number) => props.setPage(page)}
    />
  );
}
