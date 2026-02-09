"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PaginationInfo } from "./types";

interface UseDataTableOptions {
  defaultPageSize?: number;
  syncWithUrl?: boolean;
}

interface UseDataTableReturn<T> {
  // 数据状态
  data: T[];
  loading: boolean;
  error: string | null;

  // 分页
  pagination: PaginationInfo;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  // 筛选
  filters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  resetFilters: () => void;

  // 搜索
  search: () => void;

  // 刷新
  refresh: () => void;

  // 设置数据
  setData: (data: T[], total: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export function useDataTable<T>(
  options: UseDataTableOptions = {},
): UseDataTableReturn<T> {
  const { defaultPageSize = 10, syncWithUrl = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 从 URL 初始化状态
  const getInitialPage = () => {
    if (syncWithUrl) {
      const page = searchParams.get("page");
      return page ? parseInt(page, 10) : 1;
    }
    return 1;
  };

  const getInitialPageSize = () => {
    if (syncWithUrl) {
      const size = searchParams.get("pageSize");
      return size ? parseInt(size, 10) : defaultPageSize;
    }
    return defaultPageSize;
  };

  const getInitialFilters = () => {
    if (syncWithUrl) {
      const filters: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        if (key !== "page" && key !== "pageSize") {
          filters[key] = value;
        }
      });
      return filters;
    }
    return {};
  };

  // 状态
  const [data, setDataState] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPageState] = useState(getInitialPage);
  const [pageSize, setPageSizeState] = useState(getInitialPageSize);
  const [filters, setFiltersState] =
    useState<Record<string, string>>(getInitialFilters);
  const [refreshKey, setRefreshKey] = useState(0);

  // 更新 URL
  const updateUrl = useCallback(
    (
      newPage: number,
      newPageSize: number,
      newFilters: Record<string, string>,
    ) => {
      if (!syncWithUrl) return;

      const params = new URLSearchParams();

      if (newPage > 1) {
        params.set("page", newPage.toString());
      }

      if (newPageSize !== defaultPageSize) {
        params.set("pageSize", newPageSize.toString());
      }

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, { scroll: false });
    },
    [syncWithUrl, pathname, router, defaultPageSize],
  );

  // 分页操作
  const setPage = useCallback(
    (newPage: number) => {
      setPageState(newPage);
      updateUrl(newPage, pageSize, filters);
    },
    [pageSize, filters, updateUrl],
  );

  const setPageSize = useCallback(
    (newSize: number) => {
      setPageSizeState(newSize);
      setPageState(1); // 重置到第一页
      updateUrl(1, newSize, filters);
    },
    [filters, updateUrl],
  );

  // 筛选操作
  const setFilter = useCallback((key: string, value: string) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFilters = useCallback((newFilters: Record<string, string>) => {
    setFiltersState(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState({});
    setPageState(1);
    updateUrl(1, pageSize, {});
  }, [pageSize, updateUrl]);

  // 搜索
  const search = useCallback(() => {
    setPageState(1);
    updateUrl(1, pageSize, filters);
    setRefreshKey((prev) => prev + 1);
  }, [pageSize, filters, updateUrl]);

  // 刷新
  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  // 设置数据
  const setData = useCallback((newData: T[], newTotal: number) => {
    setDataState(newData);
    setTotal(newTotal);
  }, []);

  // 计算分页信息
  const pagination: PaginationInfo = {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };

  return {
    data,
    loading,
    error,
    pagination,
    setPage,
    setPageSize,
    filters,
    setFilter,
    setFilters,
    resetFilters,
    search,
    refresh,
    setData,
    setLoading,
    setError,
  };
}

// 用于服务端分页的辅助类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 构建查询参数
export function buildQueryParams(
  page: number,
  pageSize: number,
  filters: Record<string, string>,
): URLSearchParams {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return params;
}
