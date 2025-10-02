// app/error.tsx
"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight">문제가 발생했어요</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        잠시 후 다시 시도해 주세요. 문제가 계속되면 지원팀에 알려주세요.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-[var(--color-brand)] px-4 py-2 font-semibold text-white ring-1 ring-[color-mix(in_oklab,_var(--color-brand),_black_12%)] hover:translate-y-[1px]"
        >
          다시 시도해요
        </button>
        <a
          href="/support"
          className="rounded-lg border px-4 py-2 font-semibold dark:border-gray-800"
        >
          지원센터로 가요
        </a>
      </div>
    </main>
  );
}
