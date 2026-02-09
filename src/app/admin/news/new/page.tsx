import prisma from "@/lib/prisma";
import NewsForm from "@/components/admin/news-form";

async function getCategories() {
  return prisma.newsCategory.findMany({
    orderBy: { name: "asc" },
  });
}

export default async function NewNewsPage() {
  const categories = await getCategories();

  return <NewsForm categories={categories} />;
}
