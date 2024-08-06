import SeparatedText from "@/components/shared/SeparatedText/page";
import IArticle from "@/interfaces/article.interface";
import { Card, CardBody, Link, User } from "@nextui-org/react";
import { formatDistance } from "date-fns";

interface IArticlePreview {
  article: IArticle;
}

export default function ArticlePreview(props: IArticlePreview) {
  const lastComment = props.article.comments[0];

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
            className="justify-start sm:w-44"
            name={
              <Link
                href={`/users/${lastComment ? lastComment.writer.id : props.article.writer.id}`}
              >
                {lastComment
                  ? lastComment.writer.name
                  : props.article.writer.name}
              </Link>
            }
            description={formatDistance(
              lastComment ? lastComment.createdAt : props.article.createdAt,
              new Date(),
              {
                includeSeconds: true,
                addSuffix: true,
              }
            )}
            avatarProps={{
              src:
                (lastComment
                  ? lastComment.writer.image
                  : props.article.writer.image) ?? "/no-avatar.jpg",
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
