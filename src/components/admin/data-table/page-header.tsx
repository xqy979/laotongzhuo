"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeaderProps } from "./types";

export function PageHeader({
  title,
  subtitle,
  count,
  countLabel = "条记录",
  addButton,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {(subtitle || count !== undefined) && (
          <p className="text-slate-600 mt-1">
            {subtitle ||
              (count !== undefined ? `共 ${count} ${countLabel}` : "")}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        {addButton && (
          <Link
            href={addButton.href}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5" />
            {addButton.label}
          </Link>
        )}
      </div>
    </div>
  );
}
