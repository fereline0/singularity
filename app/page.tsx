import Forums from "@/components/screens/Forums/page";
import IArticle from "@/interfaces/article.interface";
import ISection from "@/interfaces/section.interface";
import getArticleCommentsCountService from "@/services/getArticleCommentsCount.service";
import getArticlesService from "@/services/getArticles.service";
import getArticlesCountService from "@/services/getArticlesCount.service";
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
  const articles: IArticle[] = await getArticlesService(page, limit);
  const articlesCount: number = await getArticlesCountService();
  const articleCommentsCount: number = await getArticleCommentsCountService();

  return (
    <Forums
      articles={articles}
      sections={sections}
      articlesCount={articlesCount}
      articleCommentsCount={articleCommentsCount}
      total={articlesCount}
      limit={limit}
    />
  );
}
