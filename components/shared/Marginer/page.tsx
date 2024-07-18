import React from "react";

interface IMarginer {
  children: React.ReactNode;
  x?: number;
  y?: number;
}

export default function Marginer(props: IMarginer) {
  return (
    <div>
      {React.Children.map(props.children, (child, index) => (
        <div
          style={{
            marginLeft:
              index + 1 == React.Children.count(props.children) ? 0 : props.x,
            marginBottom:
              index + 1 == React.Children.count(props.children) ? 0 : props.y,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
