import prisma from "@/lib/prisma";
import CategoriesClient from "./categories-client";

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return <CategoriesClient initialCategories={categories} />;
}
