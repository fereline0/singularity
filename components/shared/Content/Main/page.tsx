interface IMain {
  children: React.ReactNode;
}

export default function Main(props: IMain) {
  return (
    <div className="w-full break-words overflow-hidden">{props.children}</div>
  );
}
