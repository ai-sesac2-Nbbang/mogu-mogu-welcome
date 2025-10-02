// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "홈" },
  { href: "/features", label: "기능" },
  { href: "/policy", label: "정책" },
  { href: "/glossary", label: "용어" },
  { href: "/reputation", label: "평가·배지" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "문의할래요" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* ===== 좌측: 업로드한 로고 이미지 하나만 표시 ===== */}
          <Link href="/" className="flex items-center">
            <Image
              src="/nbbanglogo2-removebg-preview.png"  // ← PNG면 "/nbbanglogo2.png" 로만 바꿔줘
              alt="NBBANG 로고예요"
              width={200}
              height={48}
              priority
              className="h-8 w-auto md:h-9 select-none"
              sizes="(min-width: 768px) 200px, 150px"
            />
          </Link>

          {/* ===== 우측 메뉴 ===== */}
          <div className="flex items-center">
            <ul className="flex items-center gap-6 md:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar pr-4">
              {links.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`group relative inline-flex h-9 items-center rounded-md px-2.5
                        ${active
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}
                        text-[16px] font-semibold tracking-tight`}
                    >
                      <span className="relative z-10">{label}</span>
                      <span
                        className={`absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full transition-transform duration-200
                          ${active ? "scale-x-100 bg-[var(--color-brand)]" : "scale-x-0 bg-[var(--color-brand)] group-hover:scale-x-100"}`}
                      />
                    </Link>
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
