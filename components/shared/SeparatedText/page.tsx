import React from "react";

import Separator from "./Separator/page";

interface ISeparatedText {
  children: React.ReactNode;
}

export default function SeparatedText(props: ISeparatedText) {
  const childrenToArray = React.Children.toArray(props.children);

  return (
    <div className="flex items-center flex-wrap">
      {childrenToArray.map((child, index) => (
        <div key={index}>
          {child}
          {index + 1 < childrenToArray.length && <Separator />}
        </div>
      ))}
    </div>
  );
}
