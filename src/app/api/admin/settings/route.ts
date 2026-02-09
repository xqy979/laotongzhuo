import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/settings - 获取所有设置
export async function GET() {
  try {
    const settings = await prisma.setting.findMany();

    // 转换为键值对对象
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value || "";
    });

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error("获取设置失败:", error);
    return NextResponse.json({ error: "获取设置失败" }, { status: 500 });
  }
}

// POST /api/admin/settings - 批量保存设置
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 批量更新或创建设置
    const updates = Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      }),
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("保存设置失败:", error);
    return NextResponse.json({ error: "保存设置失败" }, { status: 500 });
  }
}
