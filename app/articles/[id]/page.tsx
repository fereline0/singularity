import Article from "@/components/screens/Article/page";
import getArticleService from "@/services/getArticle.service";

export const revalidate = 0;

export default async function article({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const article = await getArticleService(params.id, page, limit);

  return (
    <Article article={article} total={article._count.comments} limit={20} />
  );
}
