"use client";

import IGetParam from "@/interfaces/getParam.interface";
import pushSearchParams from "@/utils/pushSearchParams";
import { Select, SelectItem, VariantProps } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
    [searchParams]
  );

  useEffect(() => {
    router.push(`?${pushQueryParams(props.param, Array.from(selected))}`);
  }, [selected]);

  return (
    <Select
      disallowEmptySelection
      selectionMode={props.selectionMode}
      items={props.data}
      label={props.label}
      selectedKeys={selected}
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
