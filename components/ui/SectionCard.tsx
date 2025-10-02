"use client";

import { JSX, ReactNode } from "react";

type Props = {
  title?: string;          // 카드 제목이에요
  subtitle?: string;       // 보조 텍스트예요
  children?: ReactNode;    // 내용이에요
  footer?: ReactNode;      // 하단 구역(선택)이에요
  as?: keyof JSX.IntrinsicElements; // div/section/article 등
  className?: string;
};

export default function SectionCard({
  title,
  subtitle,
  children,
  footer,
  as: Tag = "section",
  className = "",
}: Props) {
  return (
    <Tag
      className={`relative overflow-hidden rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur transition
                  hover:-translate-y-[1px] hover:shadow-md dark:border-gray-800 dark:bg-gray-950/60 ${className}`}
    >
      {/* 좌측 포인트 바 */}
      <span className="absolute left-0 top-0 h-full w-1 bg-[var(--color-brand)]/70" />
      <div className="relative">
        {title && (
          <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
        {children}
        {footer ? <div className="mt-4 pt-3 text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-800">{footer}</div> : null}
      </div>
    </Tag>
  );
}
