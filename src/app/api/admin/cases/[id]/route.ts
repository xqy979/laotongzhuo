import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/cases/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      client,
      title,
      tags,
      description,
      results,
      image,
      isPublished,
      order,
    } = body;

    const caseItem = await prisma.case.update({
      where: { id },
      data: {
        client,
        title,
        tags,
        description,
        results,
        image,
        isPublished,
        order,
      },
    });

    return NextResponse.json(caseItem);
  } catch (error) {
    return NextResponse.json({ error: "更新案例失败" }, { status: 500 });
  }
}

// DELETE /api/admin/cases/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.case.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除案例失败" }, { status: 500 });
  }
}
