import React from "react";

interface IContent {
  children: React.ReactNode;
}

export default function Content(props: IContent) {
  return <div className="block mb-2 sm:flex gap-2">{props.children}</div>;
}
