"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

export default function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 12 });
  const sy = useSpring(my, { stiffness: 180, damping: 12 });

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    mx.set(x * 0.15);
    my.set(y * 0.15);
  }, [mx, my]);

  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
