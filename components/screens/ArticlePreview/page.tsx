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
          {props.article.comments[0] ? (
            <User
              className="justify-start sm:w-48"
              name={
                <Link href={`/users/${props.article.comments[0].writer.id}`}>
                  {props.article.writer.name}
                </Link>
              }
              description={formatDistance(
                props.article.comments[0].createdAt,
                new Date(),
                {
                  includeSeconds: true,
                  addSuffix: true,
                }
              )}
              avatarProps={{
                src: props.article.comments[0].writer.image ?? "/no-avatar.jpg",
              }}
            />
          ) : (
            <User
              className="justify-start sm:w-48"
              name={
                <Link href={`/users/${props.article.writer.id}`}>
                  {props.article.writer.name}
                </Link>
              }
              description={formatDistance(props.article.createdAt, new Date(), {
                includeSeconds: true,
                addSuffix: true,
              })}
              avatarProps={{
                src: props.article.writer.image ?? "/no-avatar.jpg",
              }}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
