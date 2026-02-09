import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/product-form";

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return <ProductForm categories={categories} />;
}
