"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }}
      >
        {children}
      </motion.div>

      {/* 상단 진행바 (살짝) */}
      <motion.div
        key={pathname + "-bar"}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-[var(--color-brand)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, transition: { duration: 0.35, ease: "easeOut" } }}
        exit={{ scaleX: 0, transition: { duration: 0.2, ease: "easeIn" } }}
        style={{ transformOrigin: "0% 50%" }}
      />
    </AnimatePresence>
  );
}
