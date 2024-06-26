interface ISideBar {
  children: React.ReactNode;
}

export default function SideBar(props: ISideBar) {
  return (
    <div className="max-w-full w-screen mb-2 sm:max-w-60">{props.children}</div>
  );
}
