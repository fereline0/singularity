import SeparatedText from "@/components/shared/SeparatedText/page";
import IArticle from "@/interfaces/article.interface";
import { Card, CardBody, Link, User } from "@nextui-org/react";
import { formatDistance } from "date-fns";

interface IArticlePreview {
  article: IArticle;
}

export default function ArticlePreview(props: IArticlePreview) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <div className="w-fit">
            <Link
              href={`/articles/${props.article.id}`}
              className="font-semibold"
            >
              {props.article.title}
            </Link>
            <SeparatedText>
              <Link href={`/users/${props.article.writer.id}`}>
                {props.article.writer.name}
              </Link>
              {props.article.section && (
                <Link href={`/${props.article.section.id}`}>
                  {props.article.section.name}
                </Link>
              )}
              <p>
                {formatDistance(props.article.createdAt, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </p>
            </SeparatedText>
          </div>
          <User
            className="w-fit sm:w-52"
            name={
              <Link href={`/users/${props.article.writer.id}`}>
                {props.article.writer.name}
              </Link>
            }
            description={"Lorem"}
            avatarProps={{
              src: props.article.writer.image ?? "/no-avatar.jpg",
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
