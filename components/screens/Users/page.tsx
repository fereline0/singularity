"use client";

import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import IUser from "@/interfaces/user.interface";
import { Card, CardBody, CardHeader, Link, User } from "@nextui-org/react";
import IPaginate from "@/interfaces/paginate.interface";
import { formatDistance } from "date-fns";
import Marginer from "@/components/shared/Marginer/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import ServerSearch from "@/components/shared/ServerSearch/page";
import ServerFilter from "@/components/shared/ServerFilter/page";

interface IUsers extends IPaginate {
  users: IUser[];
  newUsers: IUser[];
  usersCount: number;
}

export default function Users(props: IUsers) {
  return (
    <Content>
      <SideBar>
        <Marginer y={8}>
          <Card>
            <CardHeader>New users</CardHeader>
            <CardBody>
              <Marginer y={8}>
                {props.newUsers.map((user) => (
                  <User
                    className="align-bottom"
                    key={user.id}
                    name={<Link href={`/users/${user.id}`}>{user.name}</Link>}
                    description={formatDistance(user.createdAt, new Date(), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                    avatarProps={{
                      src: user.image ?? "/no-avatar.jpg",
                    }}
                  />
                ))}
              </Marginer>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Filters</CardHeader>
            <CardBody>
              <ServerFilter
                label="Сортировать"
                param="order"
                data={[
                  {
                    label: "По возрастанию",
                    value: "desc",
                  },
                  {
                    label: "По убыванию",
                    value: "asc",
                  },
                ]}
              />
            </CardBody>
          </Card>
        </Marginer>
      </SideBar>
      <Main>
        <Marginer y={8}>
          <ServerSearch />
          {props.users.map((user) => (
            <Card key={user.id}>
              <CardBody>
                <User
                  className="justify-start"
                  name={<Link href={`/users/${user.id}`}>{user.name}</Link>}
                  description={user.role.name}
                  avatarProps={{
                    src: user.image ?? "/no-avatar.jpg",
                  }}
                />
              </CardBody>
            </Card>
          ))}
          <ServerPaginate total={props.total} limit={props.limit} />
        </Marginer>
      </Main>
    </Content>
  );
}
