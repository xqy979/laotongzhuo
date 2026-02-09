"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/ui/modal";
import { ActionButton } from "./types";

interface ActionCellProps<T> {
  row: T;
  actions: ActionButton<T>[];
  deleteEndpoint?: string;
  idField?: string;
}

export function ActionCell<T extends Record<string, any>>({
  row,
  actions,
  deleteEndpoint,
  idField = "id",
}: ActionCellProps<T>) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ActionButton<T> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAction = (action: ActionButton<T>) => {
    if (action.confirm) {
      setConfirmAction(action);
      setShowConfirm(true);
    } else if (action.onClick) {
      action.onClick(row);
    }
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;

    setLoading(true);
    setError("");

    try {
      if (confirmAction.onClick) {
        await confirmAction.onClick(row);
        setShowConfirm(false);
        router.refresh();
      }
    } catch (err) {
      setError("操作失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const getConfirmMessage = () => {
    if (!confirmAction?.confirm) return "";
    const { message } = confirmAction.confirm;
    return typeof message === "function" ? message(row) : message;
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        {actions.map((action, index) => {
          const href =
            typeof action.href === "function" ? action.href(row) : action.href;

          if (href) {
            return (
              <Link
                key={index}
                href={href}
                className={`p-2 transition-colors rounded-md ${
                  action.variant === "danger"
                    ? "text-slate-400 hover:text-red-500 hover:bg-red-50"
                    : "text-slate-400 hover:text-primary hover:bg-primary/5"
                }`}
                title={action.label}
              >
                {action.icon}
              </Link>
            );
          }

          return (
            <button
              key={index}
              onClick={() => handleAction(action)}
              disabled={loading}
              className={`p-2 transition-colors rounded-md disabled:opacity-50 ${
                action.variant === "danger"
                  ? "text-slate-400 hover:text-red-500 hover:bg-red-50"
                  : "text-slate-400 hover:text-primary hover:bg-primary/5"
              }`}
              title={action.label}
            >
              {action.icon}
            </button>
          );
        })}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setError("");
          setConfirmAction(null);
        }}
        onConfirm={handleConfirm}
        title={confirmAction?.confirm?.title || "确认操作"}
        message={error || getConfirmMessage()}
        confirmText={confirmAction?.confirm?.confirmText || "确认"}
        danger={confirmAction?.variant === "danger"}
        loading={loading}
      />
    </>
  );
}
