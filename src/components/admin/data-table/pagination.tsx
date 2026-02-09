"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PaginationInfo } from "./types";

interface PaginationProps extends PaginationInfo {
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationProps) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  // 生成页码按钮
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      // 显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 始终显示第一页
      pages.push(1);

      if (page > 3) {
        pages.push("ellipsis");
      }

      // 显示当前页附近的页码
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("ellipsis");
      }

      // 始终显示最后一页
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100">
      {/* 左侧信息 */}
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span>
          显示 {startItem}-{endItem} 条，共 {total} 条
        </span>
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span>每页</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>条</span>
          </div>
        )}
      </div>

      {/* 右侧分页按钮 */}
      <div className="flex items-center gap-1">
        {/* 首页 */}
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="首页"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* 上一页 */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="上一页"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* 页码 */}
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNum, index) =>
            pageNum === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
                  pageNum === page
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>

        {/* 下一页 */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="下一页"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* 尾页 */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="尾页"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
