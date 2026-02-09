import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import NewsForm from "@/components/admin/news-form";

async function getArticle(id: string) {
  return prisma.news.findUnique({
    where: { id },
  });
}

async function getCategories() {
  return prisma.newsCategory.findMany({
    orderBy: { name: "asc" },
  });
}

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article, categories] = await Promise.all([
    getArticle(id),
    getCategories(),
  ]);

  if (!article) {
    notFound();
  }

  return <NewsForm categories={categories} article={article} />;
}
