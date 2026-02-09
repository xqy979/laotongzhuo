import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "hot") {
      const hotNews = await prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { views: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
        },
      });
      return NextResponse.json(hotNews);
    }

    // pagination params
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [news, total] = await prisma.$transaction([
      prisma.news.findMany({
        where: { isPublished: true },
        include: { category: true },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.news.count({ where: { isPublished: true } }),
    ]);

    return NextResponse.json({
      data: news,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
