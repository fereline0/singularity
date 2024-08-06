import Marginer from "@/components/shared/Marginer/page";
import ISection from "@/interfaces/section.interface";
import Section from "../Section/page";
import { Card, CardBody, CardHeader, Link, User } from "@nextui-org/react";
import ArticlePreview from "../ArticlePreview/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";
import ServerSearch from "@/components/shared/ServerSearch/page";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import ServerFilter from "@/components/shared/ServerFilter/page";

interface IForum extends IPaginate {
  section: ISection;
}

export default function Forum(props: IForum) {
  return (
    <Content>
      <SideBar>
        <Marginer y={8}>
          {props.section.childs.map((section) => (
            <Section key={section.id} section={section} />
          ))}
          {props.section.supervisors.length > 0 && (
            <Card>
              <CardHeader>Supervisors</CardHeader>
              <CardBody>
                <Marginer y={8}>
                  {props.section.supervisors.map((supervisor) => (
                    <User
                      className="justify-start"
                      key={supervisor.id}
                      name={
                        <Link href={`/users/${supervisor.id}`}>
                          {supervisor.name}
                        </Link>
                      }
                      description={supervisor.role.name}
                      avatarProps={{
                        src: supervisor.image ?? "/no-avatar.jpg",
                      }}
                    />
                  ))}
                </Marginer>
              </CardBody>
            </Card>
          )}
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
          <Card>
            <CardBody>
              <h3 className="text-2xl font-semibold">{props.section.name}</h3>
              <p>{props.section.description}</p>
            </CardBody>
          </Card>
          <ServerSearch />
          {props.section.articles.map((article) => (
            <ArticlePreview key={article.id} article={article} />
          ))}
          <ServerPaginate total={props.total} limit={props.limit} />
        </Marginer>
      </Main>
    </Content>
  );
}
