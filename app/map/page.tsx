// app/map/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function MapPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 새로고침
  const reload = () => {
    const f = iframeRef.current;
    if (!f) return;
    try {
      const url = new URL(f.src, location.origin);
      url.searchParams.set("_ts", Date.now().toString());
      f.src = url.toString();
    } catch {
      f.src = f.src.includes("?") ? `${f.src}&_ts=${Date.now()}` : `${f.src}?_ts=${Date.now()}`;
    }
  };

  // 전체화면
  const fullscreen = () => {
    const el =
      document.querySelector<HTMLElement>("#map-container") ?? document.documentElement;
    el.requestFullscreen?.();
  };

  // 새 탭 열기
  const openNew = () => {
    window.open("/embeds/activity_map_clusters.html", "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const f = iframeRef.current;
    if (!f) return;
    const onLoad = () => {
      setLoaded(true);
      setError(null);
    };
    const onError = () => {
      setLoaded(true);
      setError("지도를 불러오지 못했어요.");
    };
    f.addEventListener("load", onLoad);
    f.addEventListener("error", onError);
    return () => {
      f.removeEventListener("load", onLoad);
      f.removeEventListener("error", onError);
    };
  }, []);

  const btn =
    "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm hover:bg-gray-50 active:scale-[0.99] dark:border-gray-800 dark:hover:bg-gray-900";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* 헤더 */}
      <section className="mb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">모구스팟 지도</h1>
        <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400">
          현재 생성된 모구스팟 데이터에 기반한 지도에요. 확대/축소, 새로고침, 전체화면을 지원해요. 스팟을 클릭하면 다양한 정보를 볼 수 있어요.
        </p>
      </section>

      {/* 카드 */}
      <section className="rounded-2xl border bg-white/70 dark:bg-gray-950/60 dark:border-gray-800 shadow-sm">
        {/* 툴바 */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-brand,#3b82f6)]" />
            <span className="text-sm font-semibold">스팟 현황</span>
            <span className="ml-2 rounded-full border px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400 dark:border-gray-800">
              베타
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className={btn} onClick={reload} title="새로고침">🔄 첫화면</button>
            <button className={btn} onClick={fullscreen} title="전체화면">⛶ 전체화면</button>
            <button className={btn} onClick={openNew} title="새 탭으로 열기">↗ 새 탭에서 보기</button>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div
          id="map-container"
          className="relative w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-10rem)] rounded-b-2xl overflow-hidden"
        >
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-100/60 to-gray-200/60 dark:from-gray-900/40 dark:to-gray-800/40" />
          )}
          {loaded && error && (
            <div className="absolute inset-0 grid place-items-center text-center p-6">
              <div className="rounded-xl border px-6 py-5 bg-white/70 dark:bg-gray-950/70 dark:border-gray-800">
                <p className="font-semibold mb-1">불러오기 실패했어요</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  파일 경로 또는 네트워크를 확인하고 다시 시도해줘.
                </p>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/embeds/mogu/mogu_map_final.html"
            title="모구모구 지도 시각화"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </section>

      {/* 보조 설명 */}
      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border px-3 py-2 text-sm dark:border-gray-800">
          <div className="font-semibold mb-1">사용 팁</div>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>마우스 휠로 확대/축소, 드래그로 이동해요.</li>
            <li>오른쪽 위 버튼으로 첫 화면으로 돌아가기/전체화면/새 탭 열기가 가능해요.</li>
          </ul>
        </div>
        <div className="rounded-xl border px-3 py-2 text-sm dark:border-gray-800">
          <div className="font-semibold mb-1">데이터</div>
          <p className="text-gray-600 dark:text-gray-400">
            현재는 더미데이터에요. 실제 서비스 데이터와 다를 수 있어요.
          </p>
        </div>
        <div className="rounded-xl border px-3 py-2 text-sm dark:border-gray-800">
          <div className="font-semibold mb-1">스팟 검색</div>
          <p className="text-gray-600 dark:text-gray-400">
            화면 중앙 상단의 검색창에 내 동네를 입력하면 우측 창에 해당 지역 반경 3km 내의 모구스팟이 표시돼요.
          </p>
        </div>
      </section>
    </main>
  );
}
