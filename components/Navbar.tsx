// components/Navbar.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

// ✅ 실제로 쓰이는 값만 남김 (불필요한 경고 제거)
export default function Navbar() {
  const pathname = usePathname();

  // ✅ 안전한 챗봇 URL 계산 (실제 사용)
  const chatbotUrl = useMemo(() => {
    const fallback = "https://sesacna-fustartingbychansolwebchatbot.hf.space/?embed=true";
    const env = process.env.NEXT_PUBLIC_CHATBOT_URL?.trim();
    return env && env.length > 0 ? env : fallback;
  }, []);

  const links = [
    { href: "/", label: "홈" },
    { href: "/features", label: "기능" },
    { href: "/map", label: "지도" },
    { href: "/policy", label: "정책" },
    { href: "/glossary", label: "용어" },
    { href: "/reputation", label: "평가·배지" },
    { href: "/faq", label: "FAQ" },
    { href: "/support", label: "문의할래요" },
  ];

  function NavItem({
    href,
    label,
    active,
  }: {
    href: string;
    label: string;
    active: boolean;
  }) {
    const reduce = useReducedMotion();
    const [hovered, setHovered] = useState(false);
    const textAnimate = hovered ? { y: -2, scale: 1.01 } : { y: 0, scale: 1 };
    const underlineScale = active || hovered ? 1 : 0;
    const spring = reduce
      ? { duration: 0.15 }
      : { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.2 };

    return (
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative inline-flex h-9 items-center rounded-md px-2.5 text-[16px] font-semibold tracking-tight transition-colors
          ${active ? "text-gray-900 dark:text-gray-100" : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
        aria-current={active ? "page" : undefined}
      >
        <motion.span className="relative z-10" initial={false} animate={textAnimate} transition={spring}>
          {label}
        </motion.span>
        <motion.span
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full"
          style={{ background: "color-mix(in oklab, var(--color-brand) 92%, black 8%)" }}
          initial={false}
          animate={{ scaleX: underlineScale }}
          transition={spring}
          aria-hidden="true"
        />
        <span className="absolute inset-0 rounded-md ring-0 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/60 transition" />
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center gap-4">
          {/* 좌측 로고 */}
          <Link href="/" className="flex items-center flex-none shrink-0">
            <Image
              src="/nbbanglogo2-removebg-preview.png"
              alt="NBBANG 로고에요"
              width={200}
              height={48}
              priority
              className="h-8 w-auto md:h-9 select-none"
            />
          </Link>

          {/* 중앙 메뉴 */}
          <div className="flex-1 min-w-0">
            <ul className="flex items-center gap-6 md:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar">
              {links.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href} className="shrink-0">
                    <NavItem href={href} label={label} active={active} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 우측 영역 */}
          <div className="ml-2 flex items-center gap-3 border-l pl-4 dark:border-gray-800 flex-none shrink-0">
            <ThemeToggle />

            {/* 내부 챗봇 링크 */}
            <Link
              href="/moguchat?mode=deploy"
              className="inline-flex items-center justify-center rounded-full px-3 h-9 text-sm font-semibold
                         border border-gray-300 text-gray-800 hover:bg-gray-50
                         dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
                         transition-colors flex-none shrink-0"
              aria-label="모구 챗봇 열기"
            >
              💬 모구챗
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
