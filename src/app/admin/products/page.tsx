import prisma from "@/lib/prisma";
import ProductsClient from "./products-client";

async function getProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  // 序列化日期
  return products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ProductsClient initialProducts={products} categories={categories} />;
}
