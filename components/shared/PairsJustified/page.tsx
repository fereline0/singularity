import React from "react";
import { IRow } from "@/types/row.type";
import Row from "./Row/page";

interface IPairsJustified {
  data: IRow[];
}

export default function PairsJustified(props: IPairsJustified) {
  return (
    <div className="max-w-full md:max-w-lg mb-2">
      {props.data.map((row, index) => {
        const shouldRender = row.value || row.value === 0;

        if (shouldRender)
          return <Row key={index} label={row.label} value={row.value} />;
      })}
    </div>
  );
}
