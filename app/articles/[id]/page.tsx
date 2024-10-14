import Article from "@/components/screens/Article/page";
import articleService from "@/services/article.service";

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
  const article = await articleService(params.id, page, limit);

  return (
    <Article article={article} limit={20} total={article._count.comments} />
  );
}
