import Marginer from "@/components/shared/Marginer/page";
import ISection from "@/interfaces/section.interface";
import Section from "../Section/page";
import { Card, CardBody } from "@nextui-org/react";
import ArticlePreview from "../ArticlePreview/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";

interface IForum extends IPaginate {
  section: ISection;
}

export default function Forum(props: IForum) {
  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <h3 className="text-2xl font-semibold">{props.section.name}</h3>
          <p>{props.section.description}</p>
        </CardBody>
      </Card>
      {props.section.childs.map((section) => (
        <Section key={section.id} section={section} />
      ))}
      {props.section.articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
      <ServerPaginate total={props.total} limit={props.limit} />
    </Marginer>
  );
}
