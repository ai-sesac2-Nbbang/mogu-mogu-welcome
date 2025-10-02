export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-8 w-40 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    </main>
  );
}
