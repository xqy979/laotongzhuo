import type { Metadata } from "next";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const news = await prisma.news.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isPublished: true,
      },
      include: { category: true },
    });

    if (!news) {
      return {
        title: "文章不存在",
        description: "您查找的文章不存在或已下架",
      };
    }

    return {
      title: news.title,
      description: news.summary || `${news.title} - 老同桌资讯中心`,
      keywords: [news.title, news.category.name, "膏药行业", "老同桌资讯"],
      openGraph: {
        title: news.title,
        description: news.summary || `${news.category.name} - 老同桌资讯`,
        type: "article",
        publishedTime: news.publishedAt?.toISOString(),
        authors: news.author ? [news.author] : undefined,
        images: news.coverImage ? [news.coverImage] : [],
      },
    };
  } catch (error) {
    return {
      title: "资讯详情",
      description: "查看老同桌资讯详情",
    };
  }
}

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
