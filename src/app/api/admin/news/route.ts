import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/news - 获取所有文章
export async function GET() {
  try {
    const [news, categories] = await Promise.all([
      prisma.news.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.newsCategory.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    return NextResponse.json({ news, categories });
  } catch (error) {
    return NextResponse.json({ error: "获取文章失败" }, { status: 500 });
  }
}

// POST /api/admin/news - 创建文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      categoryId,
      summary,
      content,
      coverImage,
      author,
      isPublished,
    } = body;

    if (!title || !categoryId) {
      return NextResponse.json(
        { error: "标题和分类是必填项" },
        { status: 400 },
      );
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const article = await prisma.news.create({
      data: {
        title,
        slug: finalSlug,
        categoryId,
        summary,
        content,
        coverImage,
        author,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("创建文章失败:", error);
    return NextResponse.json({ error: "创建文章失败" }, { status: 500 });
  }
}
