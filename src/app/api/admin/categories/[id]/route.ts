import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/categories/[id] - 更新分类
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description } = body;

    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, description },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "更新分类失败" }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[id] - 删除分类
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // 检查是否有关联产品
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: `该分类下有 ${productsCount} 个产品，无法删除` },
        { status: 400 },
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除分类失败" }, { status: 500 });
  }
}
