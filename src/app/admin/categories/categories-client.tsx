"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, FolderTree, Package, Plus } from "lucide-react";
import {
  DataTable,
  PageHeader,
  Column,
  ActionButton,
} from "@/components/admin/data-table";
import { ConfirmModal, FormModal } from "@/components/ui/modal";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  _count?: { products: number };
}

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({
  initialCategories,
}: CategoriesClientProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  // 弹窗状态
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    order: 0,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  // 获取分类列表
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("获取分类失败:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 列配置
  const columns: Column<Category>[] = [
    {
      key: "order",
      header: "排序",
      width: "80px",
      align: "center",
      render: (order) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
          {order}
        </span>
      ),
    },
    {
      key: "name",
      header: "分类名称",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FolderTree className="h-5 w-5 text-primary" />
          </div>
          <p className="font-medium text-slate-900">{row.name}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "描述",
      render: (description) => (
        <span className="text-slate-500 text-sm">{description || "-"}</span>
      ),
    },
    {
      key: "_count",
      header: "产品数量",
      align: "center",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1.5">
          <Package className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-600">
            {row._count?.products || 0}
          </span>
        </div>
      ),
    },
  ];

  // 操作按钮
  const actions: ActionButton<Category>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      label: "编辑",
      onClick: (row) => {
        setEditingCategory(row);
        setFormData({
          name: row.name,
          description: row.description || "",
          order: row.order,
        });
        setError("");
      },
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "删除",
      variant: "danger",
      onClick: (row) => setDeleteTarget(row),
    },
  ];

  // 重置表单
  const resetForm = () => {
    setFormData({ name: "", description: "", order: 0 });
    setError("");
  };

  // 添加分类
  const handleAdd = async () => {
    if (!formData.name) {
      setError("请输入分类名称");
      return;
    }

    setFormLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddModal(false);
        resetForm();
        await fetchCategories();
      } else {
        const data = await res.json();
        setError(data.error || "创建失败");
      }
    } catch {
      setError("创建失败，请重试");
    } finally {
      setFormLoading(false);
    }
  };

  // 更新分类
  const handleUpdate = async () => {
    if (!editingCategory) return;
    if (!formData.name) {
      setError("请输入分类名称");
      return;
    }

    setFormLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setEditingCategory(null);
        resetForm();
        await fetchCategories();
      } else {
        const data = await res.json();
        setError(data.error || "更新失败");
      }
    } catch {
      setError("更新失败，请重试");
    } finally {
      setFormLoading(false);
    }
  };

  // 删除分类
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setFormLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteTarget(null);
        await fetchCategories();
      } else {
        const data = await res.json();
        setError(data.error || "删除失败");
      }
    } catch {
      setError("删除失败，请重试");
    } finally {
      setFormLoading(false);
    }
  };

  // 表单内容
  const formContent = (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          分类名称 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="如：膏贴类"
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          描述
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="分类的简短描述（可选）"
          rows={3}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          排序
        </label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
          }
          min={0}
          className="w-32 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        <p className="text-xs text-slate-400 mt-1">数字越小排序越靠前</p>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="产品分类"
        count={categories.length}
        countLabel="个分类"
        actions={
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5" />
            添加分类
          </button>
        }
      />

      <DataTable
        data={categories}
        columns={columns}
        actions={actions}
        keyField="id"
        loading={loading}
        emptyMessage="暂无分类"
        emptyAction={{
          label: "添加第一个分类",
          href: "#",
        }}
      />

      {/* 添加分类弹窗 */}
      <FormModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        onConfirm={handleAdd}
        title="添加分类"
        confirmText="创建"
        loading={formLoading}
      >
        {formContent}
      </FormModal>

      {/* 编辑分类弹窗 */}
      <FormModal
        isOpen={!!editingCategory}
        onClose={() => {
          setEditingCategory(null);
          resetForm();
        }}
        onConfirm={handleUpdate}
        title="编辑分类"
        confirmText="保存"
        loading={formLoading}
      >
        {formContent}
      </FormModal>

      {/* 删除确认弹窗 */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => {
          setDeleteTarget(null);
          setError("");
        }}
        onConfirm={handleDelete}
        title="确认删除"
        message={
          error ||
          (deleteTarget?._count?.products
            ? `该分类下有 ${deleteTarget._count.products} 个产品，删除后产品将失去分类。确定要删除"${deleteTarget?.name}"吗？`
            : `确定要删除分类"${deleteTarget?.name}"吗？此操作不可撤销。`)
        }
        confirmText="删除"
        danger
        loading={formLoading}
      />
    </div>
  );
}
