import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/categories - 获取产品分类（公共接口）
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { products: { where: { isPublished: true } } } },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "获取分类失败" }, { status: 500 });
  }
}
