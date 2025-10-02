// components/ui/Modal.tsx
"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Modal({
  open,
  title,
  children,
  actions,
  onClose,
  className = "",
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px]" />

      {/* Panel */}
      <div
        className={`relative z-[101] w-full max-w-lg rounded-2xl border bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-gray-950 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        )}
        {children && <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">{children}</div>}
        {actions && <div className="mt-5 flex items-center justify-end gap-2">{actions}</div>}

        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] dark:hover:bg-gray-900"
          aria-label="닫기"
          title="닫기"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
