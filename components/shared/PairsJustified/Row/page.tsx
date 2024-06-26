import { IRow } from "@/types/row.type";
import { Link } from "@nextui-org/react";

export default function Row(props: IRow) {
  return (
    <div className="flex justify-between flex-wrap">
      <div>{props.label}:</div>
      <div>
        {props.link ? (
          <Link href={props.link}>{props.value}</Link>
        ) : (
          props.value
        )}
      </div>
    </div>
  );
}
