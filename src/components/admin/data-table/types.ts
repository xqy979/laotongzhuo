import { ReactNode } from "react";

// 列定义
export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
}

// 操作按钮定义
export interface ActionButton<T> {
  icon?: ReactNode;
  label?: string;
  onClick?: (row: T) => void;
  href?: string | ((row: T) => string);
  variant?: "default" | "danger";
  confirm?: {
    title: string;
    message: string | ((row: T) => string);
    confirmText?: string;
  };
}

// 筛选器定义
export interface FilterOption {
  value: string;
  label: string;
}

export interface Filter {
  key: string;
  label: string;
  type: "select" | "search" | "date";
  options?: FilterOption[];
  placeholder?: string;
}

// 分页信息
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// 排序信息
export interface SortInfo {
  key: string;
  direction: "asc" | "desc";
}

// 表格属性
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: ActionButton<T>[];
  keyField?: string;
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    href: string;
  };
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

// 页面头部属性
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
  addButton?: {
    label: string;
    href: string;
  };
  actions?: ReactNode;
}

// 搜索筛选属性
export interface SearchFiltersProps {
  filters: Filter[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSearch?: () => void;
  onReset?: () => void;
}
