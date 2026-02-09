import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/messages - 获取所有留言
export async function GET() {
  try {
    // 并行获取留言和统计数据
    const [messages, total, unread, unhandled] = await Promise.all([
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.message.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.message.count({ where: { isHandled: false } }),
    ]);

    return NextResponse.json({
      messages,
      stats: { total, unread, unhandled },
    });
  } catch (error) {
    console.error("获取留言失败:", error);
    return NextResponse.json({ error: "获取留言失败" }, { status: 500 });
  }
}
