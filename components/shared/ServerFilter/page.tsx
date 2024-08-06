"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface IFilterData {
  label: string;
  value: string;
}

interface IServerFilter {
  label: string;
  param: string;
  data: IFilterData[];
}

export default function ServerFilter(props: IServerFilter) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const defaultValue = searchParams.get(props.param);

  return (
    <Select
      defaultSelectedKeys={defaultValue ? [defaultValue] : []}
      disallowEmptySelection
      items={props.data}
      label={props.label}
    >
      {(element) => (
        <SelectItem
          key={element.value}
          onClick={() =>
            router.push(`?${pushSearchParams(props.param, element.value)}`)
          }
          value={element.value}
        >
          {element.label}
        </SelectItem>
      )}
    </Select>
  );
}
