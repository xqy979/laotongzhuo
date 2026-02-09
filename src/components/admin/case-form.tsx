"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X, Plus } from "lucide-react";

interface CaseFormProps {
  caseItem?: {
    id: string;
    client: string;
    title: string;
    tags: string | null;
    description: string | null;
    results: string | null;
    image: string | null;
    isPublished: boolean;
    order: number;
  };
}

export default function CaseForm({ caseItem }: CaseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(
    caseItem?.tags ? JSON.parse(caseItem.tags) : [],
  );
  const [results, setResults] = useState<string[]>(
    caseItem?.results ? JSON.parse(caseItem.results) : [],
  );
  const [newTag, setNewTag] = useState("");
  const [newResult, setNewResult] = useState("");

  const [formData, setFormData] = useState({
    client: caseItem?.client || "",
    title: caseItem?.title || "",
    description: caseItem?.description || "",
    image: caseItem?.image || "",
    isPublished: caseItem?.isPublished || false,
    order: caseItem?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        ...formData,
        tags: JSON.stringify(tags),
        results: JSON.stringify(results),
      };

      const url = caseItem
        ? `/api/admin/cases/${caseItem.id}`
        : "/api/admin/cases";
      const method = caseItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin/cases");
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

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const addResult = () => {
    if (newResult.trim()) {
      setResults([...results, newResult.trim()]);
      setNewResult("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/cases"
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {caseItem ? "编辑案例" : "添加案例"}
            </h1>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {loading ? "保存中..." : "保存"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  客户名称 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="如：某知名连锁大药房"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  案例标题 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="如：连锁药房自有品牌定制"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  案例描述
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="详细描述合作过程和成果..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">标签</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg"
                placeholder="如：OEM贴牌"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 text-primary border border-primary rounded-lg"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              合作成果
            </h2>
            <div className="space-y-2 mb-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                >
                  <span className="flex-1 text-green-700">{result}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setResults(results.filter((_, i) => i !== idx))
                    }
                    className="text-green-600 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newResult}
                onChange={(e) => setNewResult(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addResult())
                }
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg"
                placeholder="如：单月销额500万+"
              />
              <button
                type="button"
                onClick={addResult}
                className="px-4 py-2 text-primary border border-primary rounded-lg"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">设置</h2>
            <div className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  排序
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              案例图片
            </h2>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-200 rounded-lg"
              placeholder="/images/case.png"
            />
            {formData.image && (
              <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={formData.image}
                  alt="预览"
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
