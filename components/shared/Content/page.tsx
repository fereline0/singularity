import React from "react";

interface IContent {
  children: React.ReactNode;
}

export default function Content(props: IContent) {
  return (
    <div className="flex flex-col gap-2 break-all sm:flex-row">
      {props.children}
    </div>
  );
}
