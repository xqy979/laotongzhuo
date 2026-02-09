"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import {
  DataTable,
  PageHeader,
  SearchFilters,
  Column,
  ActionButton,
  Filter,
  PaginationInfo,
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

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize") || "10", 10),
  );
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Record<string, string>>({
    search: searchParams.get("search") || "",
    categoryId: searchParams.get("categoryId") || "",
    status: searchParams.get("status") || "",
  });
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  // 获取分类列表
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("获取分类失败:", err);
    }
  }, []);

  // 获取产品列表
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("pageSize", pageSize.toString());

      if (filters.search) params.set("search", filters.search);
      if (filters.categoryId) params.set("categoryId", filters.categoryId);
      if (filters.status) params.set("status", filters.status);

      const res = await fetch(`/api/admin/products?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        // 支持分页和非分页 API 响应
        if (Array.isArray(data)) {
          // 客户端筛选
          let filtered = data;
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter((p: Product) =>
              p.name.toLowerCase().includes(searchLower),
            );
          }
          if (filters.categoryId) {
            filtered = filtered.filter(
              (p: Product) => p.category.id === filters.categoryId,
            );
          }
          if (filters.status) {
            const isPublished = filters.status === "published";
            filtered = filtered.filter(
              (p: Product) => p.isPublished === isPublished,
            );
          }
          setProducts(filtered);
          setTotal(filtered.length);
        } else {
          setProducts(data.products || data.data || []);
          setTotal(data.total || 0);
        }
      }
    } catch (err) {
      console.error("获取产品失败:", err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters]);

  // 更新 URL
  const updateUrl = useCallback(
    (
      newPage: number,
      newPageSize: number,
      newFilters: Record<string, string>,
    ) => {
      const params = new URLSearchParams();

      if (newPage > 1) params.set("page", newPage.toString());
      if (newPageSize !== 10) params.set("pageSize", newPageSize.toString());
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.categoryId)
        params.set("categoryId", newFilters.categoryId);
      if (newFilters.status) params.set("status", newFilters.status);

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "?", { scroll: false });
    },
    [router],
  );

  // 页面加载获取数据
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, fetchProducts]);

  // 页面切换
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl(newPage, pageSize, filters);
  };

  // 每页数量切换
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
    updateUrl(1, newSize, filters);
  };

  // 筛选处理
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 搜索处理
  const handleSearch = () => {
    setPage(1);
    updateUrl(1, pageSize, filters);
    fetchProducts();
  };

  // 重置筛选
  const handleReset = () => {
    const emptyFilters = { search: "", categoryId: "", status: "" };
    setFilters(emptyFilters);
    setPage(1);
    updateUrl(1, pageSize, emptyFilters);
  };

  // 删除处理
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteTarget(null);
        fetchProducts();
      } else {
        const data = await res.json();
        setError(data.error || "删除失败");
      }
    } catch {
      setError("删除失败，请重试");
    } finally {
      setDeleteLoading(false);
    }
  };

  // 分页信息
  const pagination: PaginationInfo = {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };

  return (
    <div>
      <PageHeader
        title="产品管理"
        count={total}
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
        loading={loading}
        emptyMessage="暂无产品数据"
        emptyAction={{
          label: "添加第一个产品",
          href: "/admin/products/new",
        }}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
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
        loading={deleteLoading}
      />
    </div>
  );
}
