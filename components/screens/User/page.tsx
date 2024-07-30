import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import About from "./About/page";
import Preview from "./Preview/page";
import Comments from "./Comments/page";
import Marginer from "@/components/shared/Marginer/page";
import AlertAboutBan from "./AlertAboutBan/page";
import IPaginate from "@/interfaces/paginate.interface";
import IUser from "@/interfaces/user.interface";

interface User extends IPaginate {
  user: IUser;
}

export default function User(props: User) {
  const findedActiveBan = props.user.bans.find(
    (ban) => new Date(ban.expires) > new Date() && ban.activity
  );

  return (
    <Content>
      <SideBar>
        <Preview user={props.user} />
      </SideBar>
      <Main>
        <Marginer y={8}>
          <About user={props.user} />
          {findedActiveBan && <AlertAboutBan ban={findedActiveBan} />}
          <Comments user={props.user} total={props.total} limit={props.limit} />
        </Marginer>
      </Main>
    </Content>
  );
}
