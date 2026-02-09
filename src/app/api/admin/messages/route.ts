import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/messages - 获取所有留言
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("获取留言失败:", error);
    return NextResponse.json({ error: "获取留言失败" }, { status: 500 });
  }
}
