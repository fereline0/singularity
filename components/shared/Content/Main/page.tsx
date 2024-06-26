interface IMain {
  children: React.ReactNode;
}

export default function Main(props: IMain) {
  return <div className="w-full">{props.children}</div>;
}
