// components/fx/Reveal.tsx
"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}>;

export default function Reveal({ children, delay = 0, y = 12, once = true, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.36, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
