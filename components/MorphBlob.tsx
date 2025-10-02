"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  /** CSS color(string). 예: "var(--color-brand)" 또는 "#12b886" */
  color?: string;
  /** 투명도 0~1 */
  opacity?: number;
};

export default function MorphBlob({
  className = "",
  color = "var(--color-brand)",
  opacity = 0.25,
}: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <motion.div
        initial={false} // 등장 페이드 없음
        animate={{
          borderRadius: [
            "42% 58% 65% 35% / 42% 39% 61% 58%",
            "58% 42% 35% 65% / 51% 61% 39% 49%",
            "42% 58% 65% 35% / 42% 39% 61% 58%",
          ],
          x: [0, 8, 0, -6, 0],
          y: [0, -6, 0, 6, 0],
          scale: [1, 1.03, 1, 1.02, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(closest-side, ${color}, transparent)`,
          opacity,
          filter: "blur(36px)",
        }}
        className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
