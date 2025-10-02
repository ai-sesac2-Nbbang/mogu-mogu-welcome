// components/ui/BadgeCard.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  src: string;                 // 예: "/badges/emart.png"
  title: string;               // 예: "이마트 매니아"
  desc?: string;               // 선택
  locked?: boolean;            // true면 미획득 상태
  progressText?: string;       // 예: "3 / 5"
  className?: string;
  size?: number;               // 아이콘 한 변(px), 기본 56
  hoverPop?: boolean;          // 호버 확대
  onClick?: () => void;        // 클릭 시(보통 모달 열기)
};

export default function BadgeCard({
  src,
  title,
  desc,
  locked = false,
  progressText,
  className = "",
  size = 56,
  hoverPop = false,
  onClick,
}: Props) {
  const [imgError, setImgError] = useState(false);

  const safeSrc = useMemo(() => {
    if (!src) return "";
    return src.startsWith("/") ? src : `/${src}`;
  }, [src]);

  const clickable = typeof onClick === "function";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-white/70 p-4 shadow-sm backdrop-blur transition
                  ${hoverPop ? "hover:-translate-y-[2px] hover:shadow-lg" : "hover:-translate-y-[1px] hover:shadow-md"}
                  dark:border-gray-800 dark:bg-gray-950/70 ${className}
                  ${clickable ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!clickable) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={clickable ? 0 : -1}
      role={clickable ? "button" : undefined}
      aria-label={clickable ? `${title} 배지 자세히 보기` : undefined}
    >
      <div className="flex items-center gap-4">
        {/* 아이콘 상자 */}
        <div
          className={`relative shrink-0 rounded-lg bg-gradient-to-br from-[var(--color-brand)]/12 to-[var(--color-brand-2)]/12 p-2 ring-1
                     ring-[color-mix(in_oklab,_var(--color-brand),_black_12%)]/30 transition-transform duration-300
                     ${locked ? "grayscale brightness-95" : "group-hover:scale-[1.04]"}`}
          style={{ width: size, height: size }}
        >
          {!locked && (
            <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition
                             bg-[radial-gradient(120px_60px_at_10%_10%,_white/25,_transparent_60%)]" />
          )}

          {imgError || !safeSrc ? (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400 dark:bg-gray-900 dark:text-gray-600">
              이미지 없음
            </div>
          ) : (
            <Image
              src={safeSrc}
              alt={`${title} 배지에요`}
              width={size - 8}
              height={size - 8}
              className="object-contain"
              onError={() => setImgError(true)}
              priority={false}
            />
          )}

          {/* 잠금 오버레이 */}
          {locked && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/5">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-500">
                <path
                  fill="currentColor"
                  d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5m-3 8V6a3 3 0 1 1 6 0v3z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* 텍스트 영역 */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            {locked ? (
              <span className="shrink-0 rounded-full bg-gray-200/60 px-2 py-0.5 text-xs font-semibold text-gray-700 ring-1 ring-gray-300/50 dark:bg-gray-800/60 dark:text-gray-300 dark:ring-gray-700/50">
                {progressText || "진행 중"}
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-emerald-200/40 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-400/40">
                획득
              </span>
            )}
          </div>
          {desc && (
            <p className="mt-0.5 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
