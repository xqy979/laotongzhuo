import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/cases - 获取已发布的合作案例（公共接口）
export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(cases);
  } catch (error) {
    console.error("获取案例失败:", error);
    return NextResponse.json({ error: "获取案例失败" }, { status: 500 });
  }
}
