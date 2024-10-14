import CreateArticle from "@/components/screens/CreateArticle/page";
import sectionService from "@/services/section.service";

export default async function createArticle({
  params,
}: {
  params: { id: string };
}) {
  const section = await sectionService(params.id);

  return <CreateArticle section={section} />;
}
