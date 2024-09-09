import CreateArticle from "@/components/screens/CreateArticle/page";
import getSectionService from "@/services/getSection.service";

export default async function createArticle({
  params,
}: {
  params: { id: string };
}) {
  const section = await getSectionService(params.id);

  return <CreateArticle section={section} />;
}
