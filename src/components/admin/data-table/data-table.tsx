"use client";

import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { DataTableProps } from "./types";
import { ActionCell } from "./action-cell";
import { Pagination } from "./pagination";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  keyField = "id",
  loading = false,
  emptyMessage = "暂无数据",
  emptyAction,
  pagination,
  onPageChange,
  onPageSizeChange,
  className = "",
}: DataTableProps<T>) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-3 text-slate-500">加载中...</span>
        </div>
      ) : data.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-slate-500 mb-4">{emptyMessage}</p>
          {emptyAction && (
            <Link
              href={emptyAction.href}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <Plus className="h-4 w-4" />
              {emptyAction.label}
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`px-6 py-4 text-sm font-semibold text-slate-600 ${
                        column.align === "center"
                          ? "text-center"
                          : column.align === "right"
                            ? "text-right"
                            : "text-left"
                      }`}
                      style={{ width: column.width }}
                    >
                      {column.header}
                    </th>
                  ))}
                  {actions && actions.length > 0 && (
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">
                      操作
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row) => (
                  <tr
                    key={row[keyField]}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 ${
                          column.align === "center"
                            ? "text-center"
                            : column.align === "right"
                              ? "text-right"
                              : "text-left"
                        }`}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="px-6 py-4">
                        <ActionCell row={row} actions={actions} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && onPageChange && (
            <Pagination
              {...pagination}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </>
      )}
    </div>
  );
}
