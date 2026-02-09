import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/product-form";

async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductForm categories={categories} product={product} />;
}
