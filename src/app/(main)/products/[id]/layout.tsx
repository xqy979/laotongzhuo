import type { Metadata } from "next";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isPublished: true,
      },
      include: { category: true },
    });

    if (!product) {
      return {
        title: "产品不存在",
        description: "您查找的产品不存在或已下架",
      };
    }

    const parseTags = (tags: string | null): string[] => {
      if (!tags) return [];
      try {
        return JSON.parse(tags);
      } catch {
        return [];
      }
    };

    const tags = parseTags(product.tags);

    return {
      title: product.name,
      description:
        product.summary ||
        `${product.name} - ${product.category.name}，安徽老同桌膏药代加工产品`,
      keywords: [
        product.name,
        product.category.name,
        ...tags,
        "膏药OEM",
        "老同桌",
      ],
      openGraph: {
        title: product.name,
        description: product.summary || `${product.category.name} - 老同桌膏药`,
        type: "website",
        images: product.image ? [product.image] : [],
      },
    };
  } catch (error) {
    return {
      title: "产品详情",
      description: "查看老同桌膏药产品详情",
    };
  }
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
