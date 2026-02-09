"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/ui/modal";

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  itemName?: string;
  onDeleted?: () => void;
}

export default function DeleteButton({
  id,
  endpoint,
  itemName = "此项",
  onDeleted,
}: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShowConfirm(false);
        if (onDeleted) {
          onDeleted();
        } else {
          router.refresh();
        }
      } else {
        const data = await res.json();
        setError(data.error || "删除失败");
      }
    } catch (err) {
      setError("删除失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
        title="删除"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setError("");
        }}
        onConfirm={handleDelete}
        title="确认删除"
        message={error || `确定要删除${itemName}吗？此操作不可撤销。`}
        confirmText="删除"
        danger
        loading={loading}
      />
    </>
  );
}
