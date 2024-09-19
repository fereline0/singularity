import { formatDistance } from "date-fns";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import TipTap from "../TipTap/page";

import Comments from "./Comments/page";
import Actions from "./Actions/page";

import Marginer from "@/components/shared/Marginer/page";
import IArticle from "@/interfaces/article.interface";
import SeparatedText from "@/components/shared/SeparatedText/page";
import IPaginate from "@/interfaces/paginate.interface";

interface Article extends IPaginate {
  article: IArticle;
}

export default function Article(props: Article) {
  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <div className="flex gap-2 justify-between">
            <div className="overflow-hidden">
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
            <Actions article={props.article} />
          </div>
        </CardBody>
      </Card>
      <TipTap readOnly content={props.article.value} />
      <Comments
        article={props.article}
        limit={props.limit}
        total={props.total}
      />
    </Marginer>
  );
}
