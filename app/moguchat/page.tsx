"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stat = "loading" | "ok" | "error";

export default function MoguChatPage() {
  // 배포 URL만 사용 (환경변수 우선, 없으면 기본값)
  const DEPLOY_URL =
    process.env.NEXT_PUBLIC_MOGUCHAT_URL ??
    "https://huggingfaceapi-gvetcosqbjjhaamvd7fnqt.streamlit.app/?embed=true";

  const [stat, setStat] = useState<Stat>("loading");

  // 느릴 때 에러로 전환(선택)
  useEffect(() => {
    if (stat !== "loading") return;
    const id = setTimeout(() => setStat("error"), 15000);
    return () => clearTimeout(id);
  }, [stat]);

  const reloadIframe = () => {
    const node = document.getElementById("moguchat-iframe") as HTMLIFrameElement | null;
    if (!node) return;
    const u = new URL(DEPLOY_URL);
    u.searchParams.set("_ts", Date.now().toString()); // 캐시 버스터
    node.src = u.toString();
    setStat("loading");
  };

  // 상태 칩 스타일
  const chip =
    {
      loading:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/40",
      ok: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/40",
      error:
        "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800/40",
    }[stat] || "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/40 dark:text-gray-300 dark:border-gray-700";

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-black">
      {/* 상단 헤더 */}
      <section className="border-b border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-gray-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                💬
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  모구챗
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  RAG 규정집 기반 최신 정보를 제공해드려요
                </p>
              </div>
            </div>

            {/* 상태칩 & 툴바 */}
            <div className="flex items-center gap-2">
              <span
                className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${chip}`}
              >
                {stat === "loading" && "로딩 중"}
                {stat === "ok" && "연결됨"}
                {stat === "error" && "연결 실패"}
              </span>

              <button
                type="button"
                onClick={reloadIframe}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50
                           dark:border-gray-800 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200"
              >
                새로고침
              </button>

              <Link
                href={DEPLOY_URL}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50
                           dark:border-gray-800 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200"
              >
                새 탭으로
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="mx-auto max-w-6xl px-4 py-5">
        {/* 스켈레톤 */}
        {stat === "loading" && (
          <div className="w-full h-[78dvh] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 animate-pulse grid place-items-center">
            <span className="text-gray-500 dark:text-gray-400">챗봇 불러오는 중…</span>
          </div>
        )}

        {/* 임베드 카드 */}
        <div className="relative">
          <iframe
            id="moguchat-iframe"
            src={DEPLOY_URL}
            title="moguchat"
            className="w-full h-[78dvh] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            allow="microphone; clipboard-read; clipboard-write; encrypted-media;"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
            style={{
              WebkitOverflowScrolling: "touch",
              display: stat === "loading" ? "none" : "block",
            }}
            onLoad={() => setStat("ok")}
            onError={() => setStat("error")}
          />
        </div>

        {/* 실패 안내 */}
        {stat === "error" && (
          <div className="mt-3 text-sm text-rose-600 dark:text-rose-300">
            연결에 실패했어요. 아래를 확인해 주세요.
            <ul className="list-disc pl-5 mt-1">
              <li>배포 주소를 새 탭에서 열면 정상적으로 보여야 합니다.</li>
              <li>여전히 안 되면 상대 서버의 X-Frame-Options / CSP(frame-ancestors) 정책이 iframe을 제한 중일 수 있어요.</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
