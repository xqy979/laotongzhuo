import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[id] - 获取单个产品详情（公共接口）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // 尝试按 ID 或 slug 查找
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isPublished: true,
      },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "获取产品失败" }, { status: 500 });
  }
}
