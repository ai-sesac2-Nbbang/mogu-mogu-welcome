// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link"; // 필요시 다른 곳에서 계속 쓸 수 있어 남겨둠
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
// ⬇️ 클릭 시 부드러운 전환을 시작하는 링크
import SmoothLink from "./ui/SmoothLink";

const links = [
  { href: "/", label: "홈" },
  { href: "/features", label: "기능" },
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
    <SmoothLink
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative inline-flex h-9 items-center rounded-md px-2.5 text-[16px] font-semibold tracking-tight transition-colors
        ${active ? "text-gray-900 dark:text-gray-100" : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
      aria-current={active ? "page" : undefined}
    >
      {/* 텍스트: 링크 hover 시 살짝 리프트 */}
      <motion.span
        className="relative z-10"
        initial={false}
        animate={textAnimate}
        transition={spring}
        tabIndex={-1}
        role="presentation"
      >
        {label}
      </motion.span>

      {/* 언더라인: scaleX로 매끈하게 */}
      <motion.span
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full"
        style={{ background: "color-mix(in oklab, var(--color-brand) 92%, black 8%)" }}
        initial={false}
        animate={{ scaleX: underlineScale }}
        transition={spring}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* 키보드 포커스 링 */}
      <span className="absolute inset-0 rounded-md ring-0 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/60 transition" />
    </SmoothLink>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* 좌측 로고도 SmoothLink로 → 전환 적용 */}
          <SmoothLink href="/" className="flex items-center">
            <Image
              src="/nbbanglogo2-removebg-preview.png"
              alt="NBBANG 로고예요"
              width={200}
              height={48}
              priority
              className="h-8 w-auto md:h-9 select-none"
              sizes="(min-width: 768px) 200px, 150px"
            />
          </SmoothLink>

          {/* 우측 메뉴 */}
          <div className="flex items-center">
            <ul className="flex items-center gap-6 md:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar pr-4">
              {links.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <NavItem href={href} label={label} active={active} />
                  </li>
                );
              })}
            </ul>
            <div className="ml-4 border-l pl-4 dark:border-gray-800">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
