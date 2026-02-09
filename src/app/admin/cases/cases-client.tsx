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

interface Case {
  id: string;
  title: string;
  client: string;
  image: string | null;
  tags: string | null;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function CasesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cases, setCases] = useState<Case[]>([]);
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
    status: searchParams.get("status") || "",
  });

  const [deleteTarget, setDeleteTarget] = useState<Case | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  // 筛选配置
  const filterConfigs: Filter[] = [
    {
      key: "search",
      label: "案例标题",
      type: "search",
      placeholder: "搜索案例标题或客户名称...",
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
  const columns: Column<Case>[] = [
    {
      key: "image",
      header: "图片",
      width: "80px",
      render: (_, row) => (
        <div className="h-14 w-20 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          {row.image ? (
            <img
              src={row.image}
              alt={row.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
              无图
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      header: "案例信息",
      render: (_, row) => (
        <div>
          <p className="font-medium text-slate-900">{row.title}</p>
          <p className="text-sm text-slate-500">{row.client}</p>
          {row.tags && (
            <div className="flex gap-1 mt-1.5">
              {JSON.parse(row.tags)
                .slice(0, 3)
                .map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "order",
      header: "排序",
      align: "center",
      render: (order) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
          {order}
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
  ];

  // 操作按钮配置
  const actions: ActionButton<Case>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      label: "编辑",
      href: (row) => `/admin/cases/${row.id}`,
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "删除",
      variant: "danger",
      onClick: (row) => setDeleteTarget(row),
    },
  ];

  // 获取数据
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("pageSize", pageSize.toString());

      if (filters.search) params.set("search", filters.search);
      if (filters.status) params.set("status", filters.status);

      const res = await fetch(`/api/admin/cases?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setCases(data.cases || data.data || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch cases:", err);
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
      if (newFilters.status) params.set("status", newFilters.status);

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "?", { scroll: false });
    },
    [router],
  );

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

  // 筛选变更
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 搜索
  const handleSearch = () => {
    setPage(1);
    updateUrl(1, pageSize, filters);
  };

  // 重置
  const handleReset = () => {
    const emptyFilters = { search: "", status: "" };
    setFilters(emptyFilters);
    setPage(1);
    updateUrl(1, pageSize, emptyFilters);
  };

  // 删除
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/cases/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteTarget(null);
        fetchData();
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

  // 监听 URL 变化重新获取数据
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

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
        title="合作案例"
        count={total}
        countLabel="个案例"
        addButton={{
          label: "添加案例",
          href: "/admin/cases/new",
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
        data={cases}
        columns={columns}
        actions={actions}
        keyField="id"
        loading={loading}
        emptyMessage="暂无案例"
        emptyAction={{
          label: "添加第一个案例",
          href: "/admin/cases/new",
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
          error || `确定要删除案例"${deleteTarget?.title}"吗？此操作不可撤销。`
        }
        confirmText="删除"
        danger
        loading={deleteLoading}
      />
    </div>
  );
}
