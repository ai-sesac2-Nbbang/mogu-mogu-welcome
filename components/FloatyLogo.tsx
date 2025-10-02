"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatyLogo({
  width = 280,
  height = 88,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <motion.div
      className="inline-block will-change-transform"
      // 처음 등장할 때 살짝 튕기며 등장
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: [0, -18, 0, -10, 0],         // ← 둥둥(진폭↑)
        rotate: [0, -1.2, 0.6, -0.6, 0],// ← 아주 약한 좌/우 기울임
        scale: [1, 1.01, 1, 1.005, 1],  // ← 미세한 숨쉬기
      }}
      transition={{
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.35, 0.6, 0.85, 1],
      }}
      whileHover={{
        y: -8,            // 호버 시 살짝 위로
        scale: 1.02,      // 살짝 확대
        rotate: -1,       // 살짝 더 기울이기
        transition: { type: "spring", stiffness: 180, damping: 14 },
      }}
    >
      <div className="rounded-2xl p-1.5 shadow-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/60 dark:bg-gray-900/50 backdrop-blur-md">
        <Image
          src="/logo.png"
          alt="모구모구 로고예요"
          width={width}
          height={height}
          className="h-auto w-[220px] md:w-[280px]"
          priority
        />
      </div>
    </motion.div>
  );
}
