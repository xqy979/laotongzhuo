import { Package, Newspaper, Eye, TrendingUp, Briefcase } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getStats() {
  const [productCount, newsCount, caseCount, publishedProducts, publishedNews] =
    await Promise.all([
      prisma.product.count(),
      prisma.news.count(),
      prisma.case.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.news.count({ where: { isPublished: true } }),
    ]);

  return {
    productCount,
    newsCount,
    caseCount,
    publishedProducts,
    publishedNews,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      title: "产品总数",
      value: stats.productCount,
      subtext: `${stats.publishedProducts} 已发布`,
      icon: Package,
      color: "bg-blue-500",
      href: "/admin/products",
    },
    {
      title: "新闻文章",
      value: stats.newsCount,
      subtext: `${stats.publishedNews} 已发布`,
      icon: Newspaper,
      color: "bg-green-500",
      href: "/admin/news",
    },
    {
      title: "合作案例",
      value: stats.caseCount,
      subtext: "展示中",
      icon: Briefcase,
      color: "bg-purple-500",
      href: "/admin/cases",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">仪表盘</h1>
        <p className="text-slate-600 mt-1">欢迎回来，管理员</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {card.value}
                </p>
                <p className="text-sm text-slate-400 mt-1">{card.subtext}</p>
              </div>
              <div
                className={`h-12 w-12 rounded-xl ${card.color} flex items-center justify-center`}
              >
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4">快捷操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <Package className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-slate-700">添加产品</span>
          </Link>
          <Link
            href="/admin/news/new"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <Newspaper className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-slate-700">发布文章</span>
          </Link>
          <Link
            href="/admin/cases/new"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <Briefcase className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-slate-700">添加案例</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <Eye className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-slate-700">预览网站</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
