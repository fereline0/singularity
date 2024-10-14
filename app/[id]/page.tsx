import Forum from "@/components/screens/Forum/page";
import ISection from "@/interfaces/section.interface";
import forumService from "@/services/forum.service";

export const revalidate = 0;

export default async function forum({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: number; query: string; order: string };
}) {
  const page = searchParams.page || 1;
  const limit = 20;

  const forum: ISection = await forumService(
    params.id,
    page,
    limit,
    searchParams.query,
    searchParams.order,
  );

  return <Forum forum={forum} limit={limit} total={forum._count.articles} />;
}
