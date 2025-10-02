// components/fx/FloatingIn.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";

export default function FloatingIn({ children }: PropsWithChildren) {
  const reduce = useReducedMotion();
  // 클라이언트 마운트 이후에만 idle 애니메이션 시작
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      // 서버와 클라의 초기 스타일을 동일하게 유지
      initial={false}
      // 뷰포트에 들어오면 최종 상태만 적용 (등장 트랜지션으로 인한 불일치 방지)
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      // idle 떠다니기 애니메이션은 마운트 후(클라)만 실행
      animate={reduce || !mounted ? undefined : { y: [0, -4, 0, 3, 0] }}
      transition={
        reduce || !mounted
          ? undefined
          : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
      }
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
