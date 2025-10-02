"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatyHero({ src = "/hero.png" }: { src?: string }) {
  return (
    <motion.div
      className="relative h-full w-full will-change-transform"
      // ✅ 등장/사라짐 없음: 초기 애니메이션 끔
      initial={false}
      animate={{
        // 효과 그대로 유지
        y: [0, -26, 0, -14, 0],
        rotate: [0, -2.2, 0.8, -0.8, 0],
        scale: [1, 1.015, 1, 1.008, 1],
      }}
      transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.6, 0.85, 1] }}
      whileHover={{ y: -10, scale: 1.02, rotate: -2, transition: { type: "spring", stiffness: 180, damping: 14 } }}
    >
      {/* 은은한 글로우 */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-40">
        <div className="h-full w-full rounded-[32px] bg-[var(--color-brand)]/50" />
      </div>

      <Image
        src={src}
        alt="모구모구 메인 일러스트예요"
        fill
        priority
        className="pointer-events-none object-contain contrast-110 saturate-115 drop-shadow-2xl"
        sizes="(min-width: 768px) 48vw, 100vw"
      />
    </motion.div>
  );
}
