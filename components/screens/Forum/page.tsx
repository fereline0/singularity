import Marginer from "@/components/shared/Marginer/page";
import ISection from "@/interfaces/section.interface";
import Section from "../Section/page";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  User,
} from "@nextui-org/react";
import ArticlePreview from "../ArticlePreview/page";
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
              <ServerSelectFilter
                label="Order by"
                param="order"
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
          <ServerPaginate total={props.total} limit={props.limit} />
        </Marginer>
      </Main>
    </Content>
  );
}
