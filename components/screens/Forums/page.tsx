import { Card, CardBody, CardHeader } from "@nextui-org/react";

import Section from "../Section/page";
import ArticlePreview from "../ArticlePreview/page";

import Marginer from "@/components/shared/Marginer/page";
import ISection from "@/interfaces/section.interface";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import PairsJustified from "@/components/shared/PairsJustified/page";
import IArticle from "@/interfaces/article.interface";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";

interface IForums extends IPaginate {
  articles: IArticle[];
  forums: ISection[];
  articlesCount: number;
  articleCommentCount: number;
}

export default function Forums(props: IForums) {
  return (
    <Content>
      <SideBar>
        <Marginer y={8}>
          {props.forums.map((forum) => (
            <Section key={forum.id} section={forum} />
          ))}
          <Card>
            <CardHeader>Statistics</CardHeader>
            <CardBody>
              <PairsJustified
                data={[
                  {
                    label: "Articles",
                    value: props.articlesCount,
                  },
                  {
                    label: "Comments",
                    value: props.articleCommentCount,
                  },
                ]}
              />
            </CardBody>
          </Card>
        </Marginer>
      </SideBar>
      <Main>
        <Marginer y={8}>
          {props.articles.map((article) => (
            <ArticlePreview key={article.id} article={article} />
          ))}
          <ServerPaginate limit={props.limit} total={props.total} />
        </Marginer>
      </Main>
    </Content>
  );
}
