"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, X, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    image: string | null;
    tags: string | null;
    specs: string | null;
    summary: string | null;
    description: string | null;
    isPublished: boolean;
    isHot: boolean;
  };
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(
    product?.tags ? JSON.parse(product.tags) : [],
  );
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    categoryId: product?.categoryId || "",
    image: product?.image || "",
    specs: product?.specs || "",
    summary: product?.summary || "",
    description: product?.description || "",
    isPublished: product?.isPublished || false,
    isHot: product?.isHot || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        ...formData,
        tags: JSON.stringify(tags),
      };

      const url = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin/products");
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

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const generateSlug = () => {
    const slug = formData.name
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
            href="/admin/products"
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {product ? "编辑产品" : "添加产品"}
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
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              基本信息
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  产品名称 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onBlur={() => !formData.slug && generateSlug()}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="例如：远红外筋骨消痛贴"
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
                    placeholder="product-name"
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
                  规格
                </label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) =>
                    setFormData({ ...formData, specs: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="例如：8贴/盒"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  产品简介
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="简要描述产品特点..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  详细描述
                </label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="详细介绍产品信息..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              产品标签
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500"
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
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="输入标签，按回车添加"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
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
                  产品分类 *
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

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isHot}
                  onChange={(e) =>
                    setFormData({ ...formData, isHot: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700">标记为热销</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              产品图片
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                图片 URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="/images/product.png"
              />
            </div>
            {formData.image && (
              <div className="mt-4 aspect-square rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={formData.image}
                  alt="预览"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!formData.image && (
              <div className="mt-4 aspect-square rounded-lg bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="h-12 w-12 mb-2" />
                <span className="text-sm">暂无图片</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
