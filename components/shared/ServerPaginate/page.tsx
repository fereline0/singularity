"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@nextui-org/pagination";
import { useCallback } from "react";

import IPaginate from "@/interfaces/paginate.interface";
import pushSearchParams from "@/utils/pushSearchParams";

export default function ServerPaginate(props: IPaginate) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(props.total / props.limit);
  const point = Number(searchParams.get("page")) || 1;

  const pushQueryParams = useCallback(
    (name: string, value: string) => {
      return pushSearchParams(searchParams, name, value);
    },
    [searchParams],
  );

  return (
    <Pagination
      initialPage={point}
      total={totalPageCount}
      onChange={(page: number) =>
        router.push(`?${pushQueryParams("page", page.toString())}`)
      }
    />
  );
}
