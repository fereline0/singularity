import React from "react";

import Marginer from "../Marginer/page";

import Row from "./Row/page";

import { IRow } from "@/interfaces/row.interface";

interface IPairsJustified {
  data: IRow[];
  y?: number;
}

export default function PairsJustified(props: IPairsJustified) {
  return (
    <div className="max-w-full md:max-w-lg">
      <Marginer y={props.y}>
        {props.data.map((row, index) => {
          const shouldRender = row.value || row.value === 0;

          if (shouldRender)
            return (
              <Row
                key={index}
                label={row.label}
                value={row.value}
                y={props.y}
              />
            );
        })}
      </Marginer>
    </div>
  );
}
