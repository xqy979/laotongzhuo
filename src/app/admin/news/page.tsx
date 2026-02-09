import Link from "next/link";
import { Plus, Search, Edit, Eye, EyeOff, Calendar } from "lucide-react";
import prisma from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";

async function getNews() {
  return prisma.news.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

async function getCategories() {
  return prisma.newsCategory.findMany({
    orderBy: { name: "asc" },
  });
}

export default async function NewsPage() {
  const [news, categories] = await Promise.all([getNews(), getCategories()]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">资讯中心</h1>
          <p className="text-slate-600 mt-1">共 {news.length} 篇文章</p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          发布文章
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索文章标题..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option value="">全部分类</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {news.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 mb-4">暂无文章</p>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <Plus className="h-4 w-4" />
              发布第一篇文章
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {news.map((article) => (
              <div
                key={article.id}
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {article.category.name}
                      </span>
                      {article.isPublished ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <Eye className="h-3 w-3" />
                          已发布
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          <EyeOff className="h-3 w-3" />
                          草稿
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.createdAt).toLocaleDateString(
                          "zh-CN",
                        )}
                      </span>
                      {article.author && <span>作者：{article.author}</span>}
                      <span>阅读：{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/news/${article.id}`}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <DeleteButton
                      id={article.id}
                      endpoint="/api/admin/news"
                      itemName="这篇文章"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
