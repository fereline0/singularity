import React from "react";

interface IMarginer {
  children: React.ReactNode;
  x?: number;
  y?: number;
}

export default function Marginer(props: IMarginer) {
  const childrenToArray = React.Children.toArray(props.children);

  return (
    <>
      {childrenToArray.map((child, index) => (
        <div
          key={index}
          className="w-full"
          style={{
            marginLeft: index + 1 == childrenToArray.length ? 0 : props.x,
            marginBottom: index + 1 == childrenToArray.length ? 0 : props.y,
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
}
