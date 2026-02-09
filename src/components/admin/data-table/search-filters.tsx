"use client";

import { Search, X, RotateCcw } from "lucide-react";
import { Filter, SearchFiltersProps } from "./types";

export function SearchFilters({
  filters,
  values,
  onChange,
  onSearch,
  onReset,
}: SearchFiltersProps) {
  const hasValues = Object.values(values).some((v) => v !== "");

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 筛选项 */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 flex-1">
          {filters.map((filter) => (
            <div key={filter.key} className="relative flex-1 min-w-[200px]">
              {filter.type === "search" && (
                <>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={filter.placeholder || `搜索${filter.label}...`}
                    value={values[filter.key] || ""}
                    onChange={(e) => onChange(filter.key, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  {values[filter.key] && (
                    <button
                      onClick={() => onChange(filter.key, "")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </>
              )}

              {filter.type === "select" && (
                <select
                  value={values[filter.key] || ""}
                  onChange={(e) => onChange(filter.key, e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%27http%3a%2f%2fwww.w3.org%2f2000%2fsvg%27%20viewBox%3d%270%200%2024%2024%27%20fill%3d%27none%27%20stroke%3d%27%236b7280%27%20stroke-width%3d%272%27%20stroke-linecap%3d%27round%27%20stroke-linejoin%3d%27round%27%3e%3cpolyline%20points%3d%276%209%2012%2015%2018%209%27%3e%3c%2fpolyline%3e%3c%2fsvg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 transition-colors"
                >
                  <option value="">
                    {filter.placeholder || `全部${filter.label}`}
                  </option>
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {filter.type === "date" && (
                <input
                  type="date"
                  value={values[filter.key] || ""}
                  onChange={(e) => onChange(filter.key, e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              )}
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onSearch && (
            <button
              onClick={onSearch}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Search className="h-4 w-4" />
              搜索
            </button>
          )}
          {onReset && hasValues && (
            <button
              onClick={onReset}
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              重置
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
