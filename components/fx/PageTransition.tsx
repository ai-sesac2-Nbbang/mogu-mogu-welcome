// components/fx/PageTransition.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // const variants = {
  //   initial: { opacity: 0, y: 8, filter: "blur(2px)" },
  //   enter:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.28, ease: "easeInOut" } },
  //   exit:    { opacity: 0, y: -6, filter: "blur(2px)", transition: { duration: 0.2, ease: "easeInOut" } },
  // };
  const variants = {
    initial: { opacity: 0, y: 8, filter: "blur(2px)" },
    enter:   { opacity: 1, y: 0, filter: "blur(0px)" },
    exit:    { opacity: 0, y: -6, filter: "blur(2px)" },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
