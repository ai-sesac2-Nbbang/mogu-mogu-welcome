"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-red-600">문제가 발생했어요</p>
        <h1 className="mt-2 text-2xl font-extrabold">잠시 후 다시 시도해줘요</h1>
        <p className="mt-2 max-w-lg text-gray-600 dark:text-gray-300 mx-auto">
          에러 메시지: <span className="font-mono text-xs">{error?.message ?? "알 수 없는 오류예요"}</span>
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-gray-100 dark:text-gray-900"
          >
            다시 시도할래요
          </button>
          <Link
            href="/"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            처음 화면으로 돌아갈래요
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">필요하면 문의 페이지에서 알려줘요</p>
      </div>
    </main>
  );
}
