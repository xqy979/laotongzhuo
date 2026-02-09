"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Package,
  Newspaper,
  Eye,
  Briefcase,
  MessageSquare,
  Clock,
  User,
  Phone,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Stats {
  productCount: number;
  newsCount: number;
  caseCount: number;
  publishedProducts: number;
  publishedNews: number;
  messageCount: number;
  unreadMessageCount: number;
}

interface Message {
  id: string;
  name: string;
  phone: string;
  type: string;
  content: string | null;
  isRead: boolean;
  isHandled: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    productCount: 0,
    newsCount: 0,
    caseCount: 0,
    publishedProducts: 0,
    publishedNews: 0,
    messageCount: 0,
    unreadMessageCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentMessages(data.recentMessages || []);
      }
    } catch (error) {
      console.error("获取仪表盘数据失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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
    {
      title: "留言咨询",
      value: stats.messageCount,
      subtext: `${stats.unreadMessageCount} 条未读`,
      icon: MessageSquare,
      color: stats.unreadMessageCount > 0 ? "bg-red-500" : "bg-amber-500",
      href: "/admin/messages",
      highlight: stats.unreadMessageCount > 0,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
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

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">最新留言</h2>
              <p className="text-sm text-slate-500">
                {stats.unreadMessageCount > 0 ? (
                  <span className="text-red-500 font-medium">
                    {stats.unreadMessageCount} 条未读
                  </span>
                ) : (
                  "所有留言已处理"
                )}
              </p>
            </div>
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1 text-primary hover:text-red-700 text-sm font-medium transition-colors"
          >
            查看全部
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-8 text-center text-slate-500">暂无留言信息</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentMessages.map((message) => (
              <Link
                key={message.id}
                href="/admin/messages"
                className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
              >
                {/* 未读标记 */}
                <div className="flex-shrink-0">
                  {!message.isRead ? (
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-red-500" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* 信息内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-medium ${!message.isRead ? "text-slate-900" : "text-slate-600"}`}
                    >
                      {message.name}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      {message.type}
                    </span>
                    {!message.isRead && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
                        未读
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {message.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(message.createdAt).toLocaleString("zh-CN", {
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {message.content && (
                    <p className="text-sm text-slate-400 mt-1 truncate">
                      {message.content}
                    </p>
                  )}
                </div>

                {/* 箭头 */}
                <ChevronRight className="h-5 w-5 text-slate-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
