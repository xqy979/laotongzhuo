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
    const { name, description, order } = body;

    if (!name) {
      return NextResponse.json({ error: "分类名称是必填项" }, { status: 400 });
    }

    // 自动生成唯一 slug（使用时间戳确保唯一性）
    const slug = `category-${Date.now()}`;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        order: order || 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("创建分类失败:", error);
    return NextResponse.json({ error: "创建分类失败" }, { status: 500 });
  }
}
