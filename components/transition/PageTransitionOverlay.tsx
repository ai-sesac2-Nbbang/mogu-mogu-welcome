"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransitionOverlay } from "./TransitionProvider";

/**
 * 경로 변경 시 자동으로 사라지는 유동적 오버레이.
 * - progress(0~1)에 맞춰 상단 바/스윕/버블이 연동.
 */
export default function PageTransitionOverlay() {
  const { open, end, progress } = useTransitionOverlay();
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // 경로 바뀌면 완료 처리
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => end(), 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // progress → 시각 요소 매핑
  const barScale = progress;                 // 상단 프로그레스
  const blur = 2 + progress * 3;             // 배경 블러 강도 2→5px
  const sweepX = `${Math.min(100, progress * 120)}%`; // 그라데이션 스윕
  const bubbleScale = 0.9 + progress * 0.25; // 중앙 버블 스케일
  const bubbleOpacity = 0.6 + progress * 0.4;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? { duration: 0.12 } : { duration: 0.18, ease: "easeOut" }}
        >
          {/* 배경 흐림 + 은은한 틴트 */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              background:
                "color-mix(in oklab, var(--color-brand) 4%, transparent)",
            }}
          />

          {/* 대각선 스윕(진행률 연동) */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg, transparent 0%, transparent calc(${sweepX} - 15%), color-mix(in oklab, var(--color-brand) 12%, white 0%) ${sweepX}, transparent calc(${sweepX} + 15%))`,
            }}
          />

          {/* 중앙 로더(버블) */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="rounded-2xl bg-white/70 px-4 py-2 shadow-lg ring-1 ring-black/5 dark:bg-gray-900/60 dark:ring-white/10"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: bubbleOpacity, scale: bubbleScale }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={
                reduce
                  ? { duration: 0.12 }
                  : { type: "spring", stiffness: 260, damping: 24 }
              }
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                {/* 3점 버블이 살짝 흐르듯이 */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="inline-block h-2 w-2 rounded-full bg-[var(--color-brand)]/90"
                      animate={{
                        y: [0, -3, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.9,
                        delay: i * 0.12,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <span>페이지 불러오는 중…</span>
              </div>
            </motion.div>
          </div>

          {/* 상단 프로그레스 바 (transform만 사용) */}
          <motion.div
            className="absolute left-0 top-0 h-0.5 w-full origin-left bg-[var(--color-brand)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: barScale }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
