"use client";

import Link from "next/link";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface NewsDetail {
  id: string;
  title: string;
  content: string | null;
  summary: string | null;
  publishedAt: string | null;
  author: string | null;
  category: { name: string };
  views: number;
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500">文章不存在或已被删除</p>
        <Link href="/news" className="text-primary hover:underline">
          返回资讯中心
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Breadcrumb / Nav */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 py-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">
            首页
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-primary">
            资讯中心
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">正文详情</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            {news.author && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {news.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {formatDate(news.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="h-4 w-4" /> 阅读 {news.views}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-slate mx-auto">
          {news.summary && (
            <p className="lead text-xl text-slate-600 mb-8 font-medium">
              {news.summary}
            </p>
          )}

          <div dangerouslySetInnerHTML={{ __html: news.content || "" }} />

          <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary my-8 not-prose">
            <strong>专家建议：</strong>{" "}
            选择代工厂时，一定要实地考察，看车间净化等级，看原材料仓库。
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
          <Link
            href="/news"
            className="flex items-center text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> 返回列表
          </Link>
          <button className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" /> 分享文章
          </button>
        </div>
      </div>
    </article>
  );
}
