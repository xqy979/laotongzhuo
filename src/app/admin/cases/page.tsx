import { Suspense } from "react";
import prisma from "@/lib/prisma";
import CasesClient from "./cases-client";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    status?: string;
  }>;
}

function CasesLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
      <div className="h-12 bg-slate-200 rounded mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

async function CasesContent({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const pageSize = parseInt(params.pageSize || "10", 10);
  const search = params.search || "";
  const status = params.status || "";

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

  // 并行查询
  const [cases, total] = await Promise.all([
    prisma.case.findMany({
      where,
      orderBy: { order: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.case.count({ where }),
  ]);

  // 序列化日期
  const serializedCases = cases.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return (
    <CasesClient
      initialData={{
        cases: serializedCases,
        total,
        page,
        pageSize,
      }}
    />
  );
}

export default function CasesPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<CasesLoading />}>
      <CasesContent searchParams={searchParams} />
    </Suspense>
  );
}
