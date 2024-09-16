"use client";

import { Card, CardBody, CardHeader, Link, User } from "@nextui-org/react";
import { formatDistance } from "date-fns";

import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import IUser from "@/interfaces/user.interface";
import IPaginate from "@/interfaces/paginate.interface";
import Marginer from "@/components/shared/Marginer/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import ServerSearch from "@/components/shared/ServerSearch/page";
import ServerSelectFilter from "@/components/shared/ServerSelectFilter/page";

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
                    key={user.id}
                    avatarProps={{
                      src: user.image ?? "/no-avatar.jpg",
                    }}
                    className="align-bottom"
                    description={formatDistance(user.createdAt, new Date(), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                    name={<Link href={`/users/${user.id}`}>{user.name}</Link>}
                  />
                ))}
              </Marginer>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Filters</CardHeader>
            <CardBody>
              <ServerSelectFilter
                data={[
                  {
                    label: "Descending",
                    value: "desc",
                  },
                  {
                    label: "Ascending",
                    value: "asc",
                  },
                ]}
                label="Order by"
                param="order"
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
                  avatarProps={{
                    src: user.image ?? "/no-avatar.jpg",
                  }}
                  className="justify-start"
                  description={user.role.name}
                  name={<Link href={`/users/${user.id}`}>{user.name}</Link>}
                />
              </CardBody>
            </Card>
          ))}
          <ServerPaginate limit={props.limit} total={props.total} />
        </Marginer>
      </Main>
    </Content>
  );
}
