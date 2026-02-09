"use client";

import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  publishedAt: string | null;
  author: string | null;
  category: Category;
  views: number;
}

interface HotNewsItem {
  id: string;
  title: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [hotNews, setHotNews] = useState<HotNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, hotRes] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/news?type=hot"),
        ]);

        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setNewsList(newsData.data || []);
        }

        if (hotRes.ok) {
          const hotData = await hotRes.json();
          if (Array.isArray(hotData)) {
            setHotNews(hotData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 py-16 text-center text-white">
        <h1 className="text-3xl font-bold md:text-5xl mb-4">资讯中心</h1>
        <p className="text-slate-400">洞察行业趋势，分享专业知识</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: News List */}
        <div className="lg:col-span-2 space-y-8">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 h-48 animate-pulse"
                />
              ))}
            </div>
          ) : newsList.length > 0 ? (
            newsList.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 group"
              >
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {news.category?.name || "未分类"}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(news.publishedAt)}
                  </div>
                  {news.author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {news.author}
                    </div>
                  )}
                </div>

                <Link href={`/news/${news.id}`}>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {news.title}
                  </h2>
                </Link>

                <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2">
                  {news.summary}
                </p>

                <Link
                  href={`/news/${news.id}`}
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  阅读全文 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">暂无资讯</div>
          )}

          {/* Pagination Placeholder - functionality not yet connected */}
          {newsList.length > 0 && (
            <div className="flex justify-center gap-2 mt-12">
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:border-primary hover:text-primary transition-colors">
                上一页
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:border-primary hover:text-primary transition-colors">
                下一页
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search Box */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">
              站内搜索
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="搜索文章关键词..."
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <ArrowRight className="absolute right-3 top-3.5 h-5 w-5 text-slate-400 cursor-pointer hover:text-primary" />
            </div>
          </div>

          {/* Hot News */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              热门推荐
            </h3>
            <ul className="space-y-4">
              {isLoading ? (
                <li className="text-sm text-slate-400">加载中...</li>
              ) : hotNews.length > 0 ? (
                hotNews.map((item, index) => (
                  <li key={item.id} className="flex gap-3 items-start group">
                    <span
                      className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-xs font-bold ${index < 3 ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-500"}`}
                    >
                      {index + 1}
                    </span>
                    <Link
                      href={`/news/${item.id}`}
                      className="text-slate-600 hover:text-primary transition-colors text-sm line-clamp-2"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-400">暂无热门推荐</li>
              )}
            </ul>
          </div>

          {/* Contact Banner */}
          <div className="bg-gradient-to-br from-primary to-red-800 rounded-xl p-6 text-white text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">有代工需求？</h3>
            <p className="text-white/80 text-sm mb-6">30分钟内免费出报价方案</p>
            <Link
              href="/contact"
              className="block w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              立即联系我们
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
