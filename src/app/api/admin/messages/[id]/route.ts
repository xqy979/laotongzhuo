import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/messages/[id] - 更新留言状态
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { isRead, isHandled, note } = body;

    const message = await prisma.message.update({
      where: { id: params.id },
      data: {
        isRead,
        isHandled,
        note,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("更新留言失败:", error);
    return NextResponse.json({ error: "更新留言失败" }, { status: 500 });
  }
}

// DELETE /api/admin/messages/[id] - 删除留言
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    await prisma.message.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除留言失败:", error);
    return NextResponse.json({ error: "删除留言失败" }, { status: 500 });
  }
}
