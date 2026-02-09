import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/categories - 获取所有分类
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "获取分类失败" }, { status: 500 });
  }
}

// POST /api/admin/categories - 创建分类
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description } = body;

    if (!name) {
      return NextResponse.json({ error: "分类名称是必填项" }, { status: 400 });
    }

    // 确保 slug 唯一
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const existingCategory = await prisma.category.findUnique({
      where: { slug: finalSlug },
    });
    if (existingCategory) {
      return NextResponse.json({ error: "URL 别名已被使用" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
        description,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("创建分类失败:", error);
    return NextResponse.json({ error: "创建分类失败" }, { status: 500 });
  }
}
