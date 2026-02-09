import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/cases
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 分页参数
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;

    // 筛选参数
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    // 构建查询条件
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { client: { contains: search } },
      ];
    }

    if (status === "published") {
      where.isPublished = true;
    } else if (status === "draft") {
      where.isPublished = false;
    }

    // 并行查询数据和总数
    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        orderBy: { order: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.case.count({ where }),
    ]);

    return NextResponse.json({
      cases,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("获取案例失败:", error);
    return NextResponse.json({ error: "获取案例失败" }, { status: 500 });
  }
}

// POST /api/admin/cases
export async function POST(request: NextRequest) {
  try {
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

    if (!client || !title) {
      return NextResponse.json(
        { error: "客户名称和案例标题是必填项" },
        { status: 400 },
      );
    }

    const caseItem = await prisma.case.create({
      data: {
        client,
        title,
        tags,
        description,
        results,
        image,
        isPublished: isPublished || false,
        order: order || 0,
      },
    });

    return NextResponse.json(caseItem, { status: 201 });
  } catch (error) {
    console.error("创建案例失败:", error);
    return NextResponse.json({ error: "创建案例失败" }, { status: 500 });
  }
}
