import Forums from "@/components/screens/Forums/page";
import IArticle from "@/interfaces/article.interface";
import ISection from "@/interfaces/section.interface";
import getArticleCommentCountService from "@/services/getArticleCommentCount.service";
import getArticlesService from "@/services/getArticles.service";
import getSectionsService from "@/services/getSections.service";

export const revalidate = 0;

export default async function sections({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;

  const sections: ISection[] = await getSectionsService();
  const articles: [IArticle[], number] = await getArticlesService(page, limit);
  const articleCommentCount: number = await getArticleCommentCountService();

  return (
    <Forums
      articles={articles[0]}
      sections={sections}
      articlesCount={articles[1]}
      articleCommentCount={articleCommentCount}
      total={articles[1]}
      limit={limit}
    />
  );
}
