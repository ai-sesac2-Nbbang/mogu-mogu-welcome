"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

export default function MouseTilt({
  children,
  max = 10,         // 최대 기울기 각도예요
  scale = 1.02,     // 호버 시 살짝 확대해요
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  scale?: number;
  className?: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5~0.5예요
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-py * max);
    ry.set(px * max);
  }, [max, rx, ry]);

  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
