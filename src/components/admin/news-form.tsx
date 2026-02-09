"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}

interface NewsFormProps {
  categories: NewsCategory[];
  article?: {
    id: string;
    title: string;
    slug: string;
    categoryId: string;
    summary: string | null;
    content: string | null;
    coverImage: string | null;
    author: string | null;
    isPublished: boolean;
  };
}

export default function NewsForm({ categories, article }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    categoryId: article?.categoryId || "",
    summary: article?.summary || "",
    content: article?.content || "",
    coverImage: article?.coverImage || "",
    author: article?.author || "",
    isPublished: article?.isPublished || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = article ? `/api/admin/news/${article.id}` : "/api/admin/news";
      const method = article ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/news");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "保存失败");
      }
    } catch (error) {
      alert("保存失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData({ ...formData, slug });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news"
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {article ? "编辑文章" : "发布文章"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {loading ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  文章标题 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  onBlur={() => !formData.slug && generateSlug()}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="输入文章标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  URL 别名
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="article-name"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    自动生成
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  文章摘要
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="简要描述文章内容..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  文章正文
                </label>
                <textarea
                  rows={15}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono text-sm"
                  placeholder="在此输入文章内容...支持 Markdown 格式"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              发布设置
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  文章分类 *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">选择分类</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  作者
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="文章作者"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700">立即发布</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              封面图片
            </h2>
            <div>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="/images/cover.png"
              />
            </div>
            {formData.coverImage && (
              <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={formData.coverImage}
                  alt="封面预览"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
