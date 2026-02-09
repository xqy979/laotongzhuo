"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  CheckCircle,
  Eye,
  Trash2,
  Search,
  X,
  Download,
  CalendarDays,
} from "lucide-react";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";
import { ConfirmModal, PromptModal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Message {
  id: string;
  name: string;
  phone: string;
  type: string;
  content: string | null;
  isRead: boolean;
  isHandled: boolean;
  note: string | null;
  createdAt: string;
}

interface Stats {
  total: number;
  unread: number;
  unhandled: number;
}

export default function MessagesClient({
  initialMessages,
  initialStats,
}: {
  initialMessages: Message[];
  initialStats: Stats;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [filteredMessages, setFilteredMessages] =
    useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);

  // 筛选状态
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    status: "all", // all, unread, unhandled, handled
  });

  // 弹窗状态
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
  const [handleTarget, setHandleTarget] = useState<Message | null>(null);

  // 应用筛选
  useEffect(() => {
    let result = [...messages];

    if (filters.name) {
      result = result.filter((m) =>
        m.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }
    if (filters.phone) {
      result = result.filter((m) => m.phone.includes(filters.phone));
    }
    if (filters.startDate) {
      const start = new Date(filters.startDate);
      result = result.filter((m) => new Date(m.createdAt) >= start);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((m) => new Date(m.createdAt) <= end);
    }
    if (filters.status === "unread") {
      result = result.filter((m) => !m.isRead);
    } else if (filters.status === "unhandled") {
      result = result.filter((m) => !m.isHandled);
    } else if (filters.status === "handled") {
      result = result.filter((m) => m.isHandled);
    }

    setFilteredMessages(result);
  }, [messages, filters]);

  const handleMarkRead = async (message: Message) => {
    if (message.isRead) return;
    try {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      router.refresh();
    } catch (error) {
      console.error("标记已读失败:", error);
    }
  };

  const handleMarkHandled = async (note: string) => {
    if (!handleTarget) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/messages/${handleTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isRead: true,
          isHandled: true,
          note: note || undefined,
        }),
      });
      setHandleTarget(null);
      router.refresh();
    } catch (error) {
      console.error("标记已处理失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/messages/${deleteTarget.id}`, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      router.refresh();
    } catch (error) {
      console.error("删除失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      phone: "",
      startDate: "",
      endDate: "",
      status: "all",
    });
  };

  const hasActiveFilters =
    filters.name ||
    filters.phone ||
    filters.startDate ||
    filters.endDate ||
    filters.status !== "all";

  // 导出 Excel
  const handleExportExcel = () => {
    const exportData = filteredMessages.map((m) => ({
      姓名: m.name,
      电话: m.phone,
      咨询类型: m.type,
      留言内容: m.content || "",
      提交时间: new Date(m.createdAt).toLocaleString("zh-CN"),
      状态: m.isHandled ? "已处理" : "待处理",
      是否已读: m.isRead ? "是" : "否",
      处理备注: m.note || "",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "留言记录");

    // 设置列宽
    ws["!cols"] = [
      { wch: 10 }, // 姓名
      { wch: 15 }, // 电话
      { wch: 12 }, // 咨询类型
      { wch: 40 }, // 留言内容
      { wch: 20 }, // 提交时间
      { wch: 10 }, // 状态
      { wch: 10 }, // 是否已读
      { wch: 30 }, // 处理备注
    ];

    const fileName = `留言记录_${new Date().toLocaleDateString("zh-CN").replace(/\//g, "-")}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {/* 顶部标题与操作栏 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">留言管理</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="bg-slate-100 px-2 py-0.5 rounded-full text-slate-700 font-medium">
                {initialStats.total}
              </span>
              条记录
            </div>

            {(initialStats.unread > 0 || initialStats.unhandled > 0) && (
              <div className="flex items-center gap-2 text-xs">
                {initialStats.unread > 0 && (
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                    未读 {initialStats.unread}
                  </span>
                )}
                {initialStats.unhandled > 0 && (
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    待处理 {initialStats.unhandled}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {[
                { key: "all", label: "全部" },
                { key: "unread", label: "未读" },
                { key: "unhandled", label: "待处理" },
                { key: "handled", label: "已处理" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilters({ ...filters, status: item.key })}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    filters.status === item.key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              onClick={handleExportExcel}
              variant="outline"
              size="sm"
              className="gap-2 text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800"
            >
              <Download className="h-4 w-4" />
              导出 Excel
            </Button>
          </div>
        </div>

        {/* 筛选工具栏 */}
        {/* 搜索工具栏 */}
        <Card className="shadow-none border-slate-200 bg-slate-50/50">
          <CardContent className="p-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-[240px]">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    value={filters.name}
                    onChange={(e) =>
                      setFilters({ ...filters, name: e.target.value })
                    }
                    placeholder="搜索姓名"
                    className="pl-8 h-9 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="w-[240px]">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    value={filters.phone}
                    onChange={(e) =>
                      setFilters({ ...filters, phone: e.target.value })
                    }
                    placeholder="搜索电话"
                    className="pl-8 h-9 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[130px] justify-start text-left font-normal h-9 text-sm bg-white",
                        !filters.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarDays className="mr-2 h-3.5 w-3.5" />
                      {filters.startDate
                        ? format(new Date(filters.startDate), "yyyy-MM-dd")
                        : "开始日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        filters.startDate
                          ? new Date(filters.startDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        setFilters({
                          ...filters,
                          startDate: date ? format(date, "yyyy-MM-dd") : "",
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-slate-400">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[130px] justify-start text-left font-normal h-9 text-sm bg-white",
                        !filters.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarDays className="mr-2 h-3.5 w-3.5" />
                      {filters.endDate
                        ? format(new Date(filters.endDate), "yyyy-MM-dd")
                        : "结束日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        filters.endDate ? new Date(filters.endDate) : undefined
                      }
                      onSelect={(date) =>
                        setFilters({
                          ...filters,
                          endDate: date ? format(date, "yyyy-MM-dd") : "",
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9 px-3 text-slate-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  清除
                </Button>
              )}

              <div className="ml-auto text-xs text-slate-500">
                筛选结果:{" "}
                <span className="font-semibold text-slate-900">
                  {filteredMessages.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  姓名
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  电话
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  类型
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  留言内容
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  提交时间
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  状态
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    {hasActiveFilters ? "没有符合筛选条件的留言" : "暂无留言"}
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className={`hover:bg-slate-50 transition-colors ${!message.isRead ? "bg-amber-50/50" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">
                          {message.name}
                        </span>
                        {!message.isRead && (
                          <span className="inline-flex px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                            新
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {message.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {message.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p
                          className="text-slate-600 text-sm truncate"
                          title={message.content || ""}
                        >
                          {message.content || "-"}
                        </p>
                        {message.note && (
                          <p
                            className="text-green-600 text-xs mt-1 truncate"
                            title={message.note}
                          >
                            备注：{message.note}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleString("zh-CN")}
                    </td>
                    <td className="px-6 py-4">
                      {message.isHandled ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3" />
                          已处理
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                          待处理
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {!message.isRead && (
                          <button
                            onClick={() => handleMarkRead(message)}
                            className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                            title="标记已读"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {!message.isHandled && (
                          <button
                            onClick={() => setHandleTarget(message)}
                            className="p-2 text-slate-400 hover:text-green-500 transition-colors"
                            title="标记已处理"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteTarget(message)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 删除确认弹窗 */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="确认删除"
        message={`确定要删除 ${deleteTarget?.name} 的留言吗？此操作不可撤销。`}
        confirmText="删除"
        danger
        loading={loading}
      />

      {/* 处理备注弹窗 */}
      <PromptModal
        isOpen={!!handleTarget}
        onClose={() => setHandleTarget(null)}
        onConfirm={handleMarkHandled}
        title="标记为已处理"
        message="请输入处理备注（可选）"
        placeholder="例如：已电话回访，客户表示满意"
        confirmText="确认处理"
        loading={loading}
        inputType="textarea"
      />
    </div>
  );
}
