import Forums from "@/components/screens/Forums/page";
import IArticle from "@/interfaces/article.interface";
import ISection from "@/interfaces/section.interface";
import articleCommentCountService from "@/services/articleCommentCount.service";
import articlesService from "@/services/articles.service";
import forumsService from "@/services/forums.service";

export const revalidate = 0;

export default async function forums({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;

  const forums: ISection[] = await forumsService();
  const articles: [IArticle[], number] = await articlesService(page, limit);
  const articleCommentCount: number = await articleCommentCountService();

  return (
    <Forums
      articleCommentCount={articleCommentCount}
      articles={articles[0]}
      articlesCount={articles[1]}
      forums={forums}
      limit={limit}
      total={articles[1]}
    />
  );
}
