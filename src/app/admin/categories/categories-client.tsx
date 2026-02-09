"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  _count?: { products: number };
}

export default function CategoriesClient({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!formData.name) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddForm(false);
        setFormData({ name: "", slug: "", description: "" });
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setEditingId(null);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这个分类吗？")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "删除失败");
      }
    } catch {
      alert("删除失败");
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">产品分类</h1>
          <p className="text-slate-600 mt-1">管理产品分类</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          添加分类
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="分类名称"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="text"
                placeholder="URL 别名 (英文)"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: "", slug: "", description: "" });
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500">暂无分类</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {categories.map((category) => (
              <li
                key={category.id}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                {editingId === category.id ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(category.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">
                        {category.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        /{category.slug}{" "}
                        {category._count && (
                          <span className="ml-2">
                            · {category._count.products} 个产品
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
