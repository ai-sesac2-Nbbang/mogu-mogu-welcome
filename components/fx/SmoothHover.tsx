"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type Props = PropsWithChildren<{
  /** 호버 시 위로 살짝 뜨는 픽셀 값 (기본 3px) */
  lift?: number;
  /** 호버 시 확대 배율 (기본 1.005) */
  scale?: number;
  /** 호버 시 그림자 부드럽게 추가 (기본 true) */
  shadow?: boolean;
  className?: string;
}>;

export default function SmoothHover({
  children,
  lift = 3,
  scale = 1.005,
  shadow = true,
  className = "",
}: Props) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={{
        y: -lift,
        scale,
        transition: { type: "spring", stiffness: 250, damping: 26, mass: 0.2 },
      }}
      whileTap={{
        y: -(lift / 2),
        scale: Math.max(1, scale - 0.005),
        transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.2 },
      }}
      style={{ willChange: "transform" }}
    >
      <div className={shadow ? "transition-shadow duration-300 ease-out hover:shadow-lg" : ""}>
        {children}
      </div>
    </motion.div>
  );
}
