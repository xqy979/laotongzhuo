import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/news/[id] - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    const existingArticle = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    const article = await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        categoryId,
        summary,
        content,
        coverImage,
        author,
        isPublished,
        publishedAt:
          isPublished && !existingArticle.publishedAt
            ? new Date()
            : existingArticle.publishedAt,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("更新文章失败:", error);
    return NextResponse.json({ error: "更新文章失败" }, { status: 500 });
  }
}

// DELETE /api/admin/news/[id] - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除文章失败" }, { status: 500 });
  }
}
