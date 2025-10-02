"use client";

type Props = {
  eyebrow?: string;         // 작은 상단 라벨이에요
  title: string;            // 큰 제목이에요
  description?: string;     // 보조 설명이에요
  actions?: React.ReactNode;// 우측 액션(선택)이에요
  className?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className = "",
}: Props) {
  return (
    <header className={`relative mb-8 ${className}`}>
      {eyebrow && (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
          {eyebrow}
        </div>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
          <span className="bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        {actions ? <div className="mt-2 md:mt-0">{actions}</div> : null}
      </div>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
    </header>
  );
}
