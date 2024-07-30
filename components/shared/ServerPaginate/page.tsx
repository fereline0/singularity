"use client";

import { useRouter, useSearchParams } from "next/navigation";
import IPaginate from "@/interfaces/paginate.interfaces";
import { Pagination } from "@nextui-org/react";
import { useCallback } from "react";

export default function ServerPaginate(props: IPaginate) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(props.total / props.limit);
  const point = Number(searchParams.get("page")) || 1;

  const pushSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Pagination
      total={totalPageCount}
      onChange={(page: number) =>
        router.push(`?${pushSearchParams("page", page.toString())}`)
      }
      initialPage={point}
    />
  );
}
