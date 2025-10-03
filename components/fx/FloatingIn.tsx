// components/fx/FloatingIn.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = {
  floatY?: number;      // 둥둥 떠다니는 진폭(px)
  duration?: number;    // 한 주기(초)
  hoverTilt?: number;   // 호버 때 기울기(deg)
  hoverScale?: number;  // 호버 때 확대 비율
  className?: string;
};

export default function FloatingIn({
  children,
  floatY = 6,
  duration = 6,
  hoverTilt = 8,
  hoverScale = 1.05,
  className = "",
}: PropsWithChildren<Props>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 마우스 위치→기울기
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 160, damping: 20, mass: 0.2 });

  const rotX = useTransform(sy, [-0.5, 0.5], [hoverTilt, -hoverTilt]); // 위/아래
  const rotY = useTransform(sx, [-0.5, 0.5], [-hoverTilt, hoverTilt]); // 좌/우

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    // -0.5 ~ 0.5
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      className={`relative pointer-events-auto ${className}`}
      // 서버/클라 초기 DOM 동일 → 하이드레이션 안전
      initial={false}
      // 항상 둥둥 떠다니게
      animate={mounted ? { y: [0, -floatY, 0, floatY * 0.7, 0] } : undefined}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      // 호버 반응
      whileHover={{ scale: hoverScale }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 800,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
