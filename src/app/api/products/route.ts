import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products - 获取已发布的产品列表（公共接口）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: {
      isPublished: boolean;
      category?: { slug: string };
    } = {
      isPublished: true,
    };

    if (category && category !== "all") {
      where.category = { slug: category };
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: [{ isHot: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "获取产品失败" }, { status: 500 });
  }
}
