import Marginer from "@/components/shared/Marginer/page";
import IArticle from "@/interfaces/article.interface";
import { Card, CardBody, Link } from "@nextui-org/react";
import TipTap from "../TipTap/page";
import { formatDistance } from "date-fns";
import SeparatedText from "@/components/shared/SeparatedText/page";
import IPaginate from "@/interfaces/paginate.interface";
import Comments from "./Comments/page";

interface Article extends IPaginate {
  article: IArticle;
}

export default function Article(props: Article) {
  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <div>
            <h1 className="text-3xl font-semibold">{props.article.title}</h1>
            <SeparatedText>
              <Link href={`/users/${props.article.writer.id}`}>
                {props.article.writer.name}
              </Link>
              <p>
                {formatDistance(props.article.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </p>
            </SeparatedText>
          </div>
        </CardBody>
      </Card>
      <TipTap content={props.article.value} readOnly />
      <Comments
        article={props.article}
        total={props.total}
        limit={props.limit}
      />
    </Marginer>
  );
}
