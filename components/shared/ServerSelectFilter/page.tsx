"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { VariantProps } from "@nextui-org/react";

import pushSearchParams from "@/utils/pushSearchParams";
import IGetParam from "@/interfaces/getParam.interface";

interface IServerSelectFilter {
  label: string;
  param: string;
  data: IGetParam[];
  selectionMode?: VariantProps<typeof Select>["selectionMode"];
}

export default function ServerSelectFilter(props: IServerSelectFilter) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(props.param);
  const defaultSelected = defaultValue ? defaultValue.split("&") : [];
  const [selected, setSelected] = useState(new Set(defaultSelected));

  const pushQueryParams = useCallback(
    (name: string, value: string[]) => {
      return pushSearchParams(searchParams, name, value);
    },
    [searchParams],
  );

  useEffect(() => {
    router.push(`?${pushQueryParams(props.param, Array.from(selected))}`);
  }, [selected]);

  return (
    <Select
      disallowEmptySelection
      items={props.data}
      label={props.label}
      selectedKeys={selected}
      selectionMode={props.selectionMode}
      onSelectionChange={setSelected}
    >
      {(element) => (
        <SelectItem key={element.value} value={element.value}>
          {element.label}
        </SelectItem>
      )}
    </Select>
  );
}
