import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/messages - 提交留言
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, type, content } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "姓名和电话是必填项" },
        { status: 400 },
      );
    }

    const message = await prisma.message.create({
      data: {
        name,
        phone,
        type: type || "OEM代工",
        content,
      },
    });

    return NextResponse.json(
      { success: true, message: "留言提交成功，我们会尽快与您联系！" },
      { status: 201 },
    );
  } catch (error) {
    console.error("提交留言失败:", error);
    return NextResponse.json({ error: "提交留言失败" }, { status: 500 });
  }
}
