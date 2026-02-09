"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import {
  DataTable,
  PageHeader,
  SearchFilters,
  Column,
  ActionButton,
  Filter,
} from "@/components/admin/data-table";
import { ConfirmModal } from "@/components/ui/modal";

interface Product {
  id: string;
  name: string;
  specs: string | null;
  image: string | null;
  isPublished: boolean;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductsClient({
  initialProducts,
  categories,
}: ProductsClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState<Record<string, string>>({
    search: "",
    categoryId: "",
    status: "",
  });
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 筛选配置
  const filterConfigs: Filter[] = [
    {
      key: "search",
      label: "产品名称",
      type: "search",
      placeholder: "搜索产品名称...",
    },
    {
      key: "categoryId",
      label: "分类",
      type: "select",
      options: categories.map((cat) => ({ value: cat.id, label: cat.name })),
    },
    {
      key: "status",
      label: "状态",
      type: "select",
      options: [
        { value: "published", label: "已发布" },
        { value: "draft", label: "草稿" },
      ],
    },
  ];

  // 列配置
  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "产品",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {row.image ? (
              <img
                src={row.image}
                alt={row.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-slate-400 text-xs">无图</span>
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900">{row.name}</p>
            {row.specs && <p className="text-sm text-slate-500">{row.specs}</p>}
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "分类",
      render: (_, row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          {row.category.name}
        </span>
      ),
    },
    {
      key: "isPublished",
      header: "状态",
      render: (isPublished) =>
        isPublished ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <Eye className="h-3 w-3" />
            已发布
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            <EyeOff className="h-3 w-3" />
            草稿
          </span>
        ),
    },
    {
      key: "updatedAt",
      header: "更新时间",
      render: (date) => (
        <span className="text-sm text-slate-500">
          {new Date(date).toLocaleDateString("zh-CN")}
        </span>
      ),
    },
  ];

  // 操作按钮配置
  const actions: ActionButton<Product>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      label: "编辑",
      href: (row) => `/admin/products/${row.id}`,
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "删除",
      variant: "danger",
      onClick: (row) => setDeleteTarget(row),
    },
  ];

  // 筛选处理
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 搜索处理
  const handleSearch = useCallback(() => {
    // 客户端筛选
    let filtered = initialProducts;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchLower),
      );
    }

    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.category.id === filters.categoryId);
    }

    if (filters.status) {
      const isPublished = filters.status === "published";
      filtered = filtered.filter((p) => p.isPublished === isPublished);
    }

    setProducts(filtered);
  }, [filters, initialProducts]);

  // 重置筛选
  const handleReset = () => {
    setFilters({ search: "", categoryId: "", status: "" });
    setProducts(initialProducts);
  };

  // 删除处理
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteTarget(null);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "删除失败");
      }
    } catch {
      setError("删除失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="产品管理"
        count={products.length}
        countLabel="个产品"
        addButton={{
          label: "添加产品",
          href: "/admin/products/new",
        }}
      />

      <SearchFilters
        filters={filterConfigs}
        values={filters}
        onChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <DataTable
        data={products}
        columns={columns}
        actions={actions}
        keyField="id"
        emptyMessage="暂无产品数据"
        emptyAction={{
          label: "添加第一个产品",
          href: "/admin/products/new",
        }}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => {
          setDeleteTarget(null);
          setError("");
        }}
        onConfirm={handleDelete}
        title="确认删除"
        message={
          error || `确定要删除产品"${deleteTarget?.name}"吗？此操作不可撤销。`
        }
        confirmText="删除"
        danger
        loading={loading}
      />
    </div>
  );
}
