// components/ui/Modal.tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  open: boolean;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  className?: string;
};

// 클라이언트에서만 sm(>=640px) 여부 판단 (SSR 안전)
function useIsDesktopSmUp() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return isDesktop;
}

export default function Modal({
  open,
  title,
  children,
  actions,
  onClose,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktopSmUp();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC 닫기 + 스크롤 잠금 + 포커스 이동
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.documentElement.style.overflow;
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // 하나의 transition만 사용 (버전/타입 충돌 방지)
  const transition = reduce
    ? { duration: 0.15 as const }
    : { type: "spring" as const, stiffness: 260, damping: 24 };

  // 데스크탑(센터 모달) vs 모바일(바텀시트) 애니메이션 프리셋
  const initial = reduce
    ? { opacity: 0 }
    : isDesktop
      ? { opacity: 0, y: 24, scale: 0.98 }
      : { opacity: 0, y: 40, scale: 1 };
  const animate = reduce
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };
  const exit = reduce
    ? { opacity: 0 }
    : isDesktop
      ? { opacity: 0, y: 12, scale: 0.98 }
      : { opacity: 0, y: 20, scale: 1 };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0.12 } : { duration: 0.18 }}
          />

          {/* Panel */}
          <motion.div
            className={[
              "relative z-[101] w-full max-w-lg bg-white dark:bg-gray-950 shadow-2xl border dark:border-gray-800",
              "rounded-t-2xl sm:rounded-2xl",
              "sm:p-5 p-5",
              className,
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
          >
            {title && (
              <h3 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-8">
                {title}
              </h3>
            )}

            {children && (
              <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {children}
              </div>
            )}

            {actions && (
              <div className="mt-5 flex items-center justify-end gap-2">
                {actions}
              </div>
            )}

            {/* 닫기 버튼 (SVG, 외부 아이콘 없음) */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:bg-gray-100
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]
                         dark:hover:bg-gray-900"
              aria-label="닫기"
              title="닫기"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
