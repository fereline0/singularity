import Forums from "@/components/screens/Forums/page";
import IArticle from "@/interfaces/article.interface";
import ISection from "@/interfaces/section.interface";
import getArticleCommentCountService from "@/services/getArticleCommentCount.service";
import getArticlesService from "@/services/getArticles.service";
import getForumsService from "@/services/getForums.service";

export const revalidate = 0;

export default async function forums({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;

  const forums: ISection[] = await getForumsService();
  const articles: [IArticle[], number] = await getArticlesService(page, limit);
  const articleCommentCount: number = await getArticleCommentCountService();

  return (
    <Forums
      articles={articles[0]}
      forums={forums}
      articlesCount={articles[1]}
      articleCommentCount={articleCommentCount}
      total={articles[1]}
      limit={limit}
    />
  );
}
