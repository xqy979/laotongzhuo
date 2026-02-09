import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/dashboard - 获取仪表盘统计数据
export async function GET() {
  try {
    // 获取统计数据
    const [
      productCount,
      newsCount,
      caseCount,
      publishedProducts,
      publishedNews,
      messageCount,
      unreadMessageCount,
      recentMessages,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.news.count(),
      prisma.case.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.news.count({ where: { isPublished: true } }),
      prisma.message.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      stats: {
        productCount,
        newsCount,
        caseCount,
        publishedProducts,
        publishedNews,
        messageCount,
        unreadMessageCount,
      },
      recentMessages,
    });
  } catch (error) {
    console.error("获取仪表盘数据失败:", error);
    return NextResponse.json({ error: "获取仪表盘数据失败" }, { status: 500 });
  }
}
