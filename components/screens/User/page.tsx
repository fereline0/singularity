import IUser from "@/types/user.type";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import About from "./About/page";
import Preview from "./Preview/page";
import Comments from "./Comments/page";
import IPaginate from "@/types/paginate.type";

interface User extends IPaginate {
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
        <Comments user={props.user} total={props.total} limit={props.limit} />
      </Main>
    </Content>
  );
}
