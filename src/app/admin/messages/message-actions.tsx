"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, CheckCircle } from "lucide-react";
import { PromptModal } from "@/components/ui/modal";

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

export default function MessageActions({ message }: { message: Message }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleMarkRead = async () => {
    if (message.isRead) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      router.refresh();
    } catch (error) {
      console.error("标记已读失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkHandled = async (note: string) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isRead: true,
          isHandled: true,
          note: note || undefined,
        }),
      });
      setShowNoteModal(false);
      router.refresh();
    } catch (error) {
      console.error("标记已处理失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {!message.isRead && (
          <button
            onClick={handleMarkRead}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-blue-500 transition-colors disabled:opacity-50"
            title="标记为已读"
          >
            <Eye className="h-5 w-5" />
          </button>
        )}
        {!message.isHandled && (
          <button
            onClick={() => setShowNoteModal(true)}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-green-500 transition-colors disabled:opacity-50"
            title="标记为已处理"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
        )}
      </div>

      <PromptModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onConfirm={handleMarkHandled}
        title="标记为已处理"
        message="请输入处理备注（可选）"
        placeholder="例如：已电话回访，客户表示满意"
        confirmText="确认处理"
        loading={loading}
        inputType="textarea"
      />
    </>
  );
}
