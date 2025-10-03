// components/ui/Lightbox.tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
};

export default function Lightbox({ open, src, alt = "", onClose }: Props) {
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(1); // 1 ↔ 1.8

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggleZoom = () => setZoom((z) => (z === 1 ? 1.8 : 1));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? { duration: 0.12 } : { duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="이미지 라이트박스"
        >
          {/* 가운데 컨테이너 (실제 크기 부여) */}
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫히지 않게
            onDoubleClick={toggleZoom}
          >
            <motion.div
              className="relative select-none"
              // 핵심: 실제 width/height를 줘야 fill이 렌더됨
              style={{
                width: "min(92vw, 92vh)",
                height: "min(92vw, 92vh)",
              }}
              animate={{ scale: zoom }}
              transition={
                reduce ? { duration: 0.1 } : { type: "spring", stiffness: 260, damping: 26 }
              }
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 2000px) 92vw"
                priority
                className={`object-contain ${zoom > 1 ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              />
            </motion.div>
          </div>

          {/* 사용 힌트 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-white/70">
            더블클릭: 확대/축소 · 아무 곳이나 클릭: 닫기 · ESC: 닫기
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
