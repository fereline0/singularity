import Forum from "@/components/screens/Forum/page";
import ISection from "@/interfaces/section.interface";
import getSectionService from "@/services/getSection.service";

export const revalidate = 0;

export default async function section({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: number; query: string; order: string };
}) {
  const page = searchParams.page || 1;
  const limit = 1;

  const section: ISection = await getSectionService(
    params.id,
    page,
    limit,
    searchParams.query,
    searchParams.order
  );

  return (
    <Forum section={section} total={section._count.articles} limit={limit} />
  );
}
