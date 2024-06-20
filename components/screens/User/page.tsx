import IUser from "@/types/user.type";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import About from "./About/page";
import Preview from "./Preview/page";

interface User {
  user: IUser;
}

export default function User(props: User) {
  return (
    <Content>
      <SideBar>
        <Preview user={props.user} />
      </SideBar>
      <Main>
        <About user={props.user} />
      </Main>
    </Content>
  );
}
