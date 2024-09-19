import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import { formatDistance } from "date-fns";

import SeparatedText from "@/components/shared/SeparatedText/page";
import IArticle from "@/interfaces/article.interface";

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
              className="font-semibold"
              href={`/articles/${props.article.id}`}
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
            avatarProps={{
              src:
                (lastComment
                  ? lastComment.writer.image
                  : props.article.writer.image) ?? "/no-avatar.jpg",
            }}
            className="justify-start sm:w-44"
            description={formatDistance(
              lastComment ? lastComment.createdAt : props.article.createdAt,
              new Date(),
              {
                includeSeconds: true,
                addSuffix: true,
              },
            )}
            name={
              <Link
                href={`/users/${lastComment ? lastComment.writer.id : props.article.writer.id}`}
              >
                {lastComment
                  ? lastComment.writer.name
                  : props.article.writer.name}
              </Link>
            }
          />
        </div>
      </CardBody>
    </Card>
  );
}
