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
  { href: "/faq", label: "자주 묻는 질문" },
  { href: "/support", label: "문의하기" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* 왼쪽 로고 */}
          <Link href="/" className="flex items-center gap-2 font-extrabold">
            <Image src="/app-icon.png" alt="모구 아이콘이에요" width={20} height={20} className="h-5 w-5 rounded-md" priority />
            <span>모구모구</span>
          </Link>

          {/* 오른쪽 메뉴 */}
          <div className="flex items-center">
            <ul className="flex items-center gap-6 md:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar pr-4">
              {links.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`group relative inline-flex h-9 items-center rounded-md px-2.5 text-sm
                        ${active ? "text-gray-900 dark:text-gray-100" : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}
                      `}
                    >
                      {label}
                      {/* 브랜드 하이라이트 라인 */}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full transition-transform duration-200
                          ${active
                            ? "scale-x-100 bg-[var(--color-brand)]"
                            : "scale-x-0 bg-[var(--color-brand)] group-hover:scale-x-100"}
                        `}
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
