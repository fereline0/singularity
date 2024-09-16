import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  User,
} from "@nextui-org/react";

import Section from "../Section/page";
import ArticlePreview from "../ArticlePreview/page";

import Marginer from "@/components/shared/Marginer/page";
import ISection from "@/interfaces/section.interface";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";
import ServerSearch from "@/components/shared/ServerSearch/page";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import ServerSelectFilter from "@/components/shared/ServerSelectFilter/page";

interface IForum extends IPaginate {
  forum: ISection;
}

export default function Forum(props: IForum) {
  return (
    <Content>
      <SideBar>
        <Marginer y={8}>
          {props.forum.childs.map((forum) => (
            <Section key={forum.id} section={forum} />
          ))}
          <Card>
            <CardHeader>
              <Button
                fullWidth
                as={Link}
                color="primary"
                href={`/${props.forum.id}/createArticle`}
              >
                Create article
              </Button>
            </CardHeader>
          </Card>
          {props.forum.supervisors.length > 0 && (
            <Card>
              <CardHeader>Supervisors</CardHeader>
              <CardBody>
                <Marginer y={8}>
                  {props.forum.supervisors.map((supervisor) => (
                    <User
                      key={supervisor.id}
                      avatarProps={{
                        src: supervisor.image ?? "/no-avatar.jpg",
                      }}
                      className="justify-start"
                      description={supervisor.role.name}
                      name={
                        <Link href={`/users/${supervisor.id}`}>
                          {supervisor.name}
                        </Link>
                      }
                    />
                  ))}
                </Marginer>
              </CardBody>
            </Card>
          )}
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
          <Card>
            <CardBody>
              <h3 className="text-2xl font-semibold">{props.forum.name}</h3>
              <p>{props.forum.description}</p>
            </CardBody>
          </Card>
          <ServerSearch />
          {props.forum.articles.map((article) => (
            <ArticlePreview key={article.id} article={article} />
          ))}
          <ServerPaginate limit={props.limit} total={props.total} />
        </Marginer>
      </Main>
    </Content>
  );
}
