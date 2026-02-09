import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/products/[id] - 获取单个产品
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
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

// PUT /api/admin/products/[id] - 更新产品
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    // 检查产品是否存在
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    // 检查 slug 是否被其他产品使用
    if (slug && slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findFirst({
        where: { slug, NOT: { id } },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "URL 别名已被使用" },
          { status: 400 },
        );
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
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
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("更新产品失败:", error);
    return NextResponse.json({ error: "更新产品失败" }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id] - 删除产品
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除产品失败" }, { status: 500 });
  }
}
