import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">404예요</p>
        <h1 className="mt-2 text-2xl font-extrabold">페이지를 찾을 수 없어요</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          요청하신 주소가 변경되었거나 존재하지 않아요.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-gray-100 dark:text-gray-900"
          >
            처음 화면으로 돌아갈래요
          </Link>
          <Link
            href="/support"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            문의하고 싶어요
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">모구모구예요</p>
      </div>
    </main>
  );
}
