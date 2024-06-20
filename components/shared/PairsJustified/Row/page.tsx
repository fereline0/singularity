import { IRow } from "@/types/row.type";
import { Link } from "@nextui-org/react";

export default function Row(props: IRow) {
  return (
    <div className="flex justify-between">
      <div>{props.label}:</div>
      <div className="text-right overflow-hidden whitespace-nowrap text-ellipsis">
        {props.link ? (
          <Link href={props.link}>{props.value}</Link>
        ) : (
          props.value
        )}
      </div>
    </div>
  );
}
