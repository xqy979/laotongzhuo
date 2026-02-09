import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id, isPublished: true },
      include: { category: true },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Increment views
    await prisma.news.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
