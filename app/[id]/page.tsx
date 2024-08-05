import Forum from "@/components/screens/Forum/page";
import ISection from "@/interfaces/section.interface";
import getSectionService from "@/services/getSection.service";

export const revalidate = 0;

export default async function section({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: number; q: string };
}) {
  const page = searchParams.page || 1;
  const limit = 20;

  const section: ISection = await getSectionService(
    params.id,
    page,
    limit,
    searchParams.q
  );

  return (
    <Forum section={section} total={section._count.articles} limit={limit} />
  );
}
