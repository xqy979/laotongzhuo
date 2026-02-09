import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/products - 获取所有产品
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "获取产品失败" }, { status: 500 });
  }
}

// POST /api/admin/products - 创建产品
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      categoryId,
      image,
      tags,
      specs,
      summary,
      description,
      isPublished,
      isHot,
    } = body;

    // 验证必填字段
    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "产品名称和分类是必填项" },
        { status: 400 },
      );
    }

    // 检查 slug 是否唯一
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });
    if (existingProduct) {
      return NextResponse.json({ error: "URL 别名已被使用" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        categoryId,
        image,
        tags,
        specs,
        summary,
        description,
        isPublished: isPublished || false,
        isHot: isHot || false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("创建产品失败:", error);
    return NextResponse.json({ error: "创建产品失败" }, { status: 500 });
  }
}
