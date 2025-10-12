"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  url: string;                   // ex) https://...streamlit.app/?embed=true
  title?: string;                // iframe title (접근성)
  className?: string;            // 부모에서 여백/레이아웃 제어
  initialMode?: "deploy" | "local";
  localUrl?: string;             // ex) http://127.0.0.1:8501
};

export default function EmbeddedChatbot({
  url,
  title = "Chatbot",
  className = "",
  initialMode = "deploy",
  localUrl = "http://127.0.0.1:8501",
}: Props) {
  const [mode, setMode] = useState<"deploy" | "local">(initialMode);
  const src = useMemo(() => (mode === "deploy" ? url : localUrl), [mode, url, localUrl]);

  const [stat, setStat] = useState<"loading" | "ok" | "error">("loading");

  // 모드 전환 시 로딩 상태 초기화
  useEffect(() => {
    setStat("loading");
  }, [src]);

  return (
    <section
      className={`w-full max-w-5xl mx-auto ${className}`}
      aria-label="Embedded chatbot section"
    >
      {/* 상단 툴바: 모드 토글 / 새 탭 / 새로고침 */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">모드</span>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("deploy")}
              className={`px-3 py-1.5 text-sm ${
                mode === "deploy"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
            >
              배포
            </button>
            <button
              type="button"
              onClick={() => setMode("local")}
              className={`px-3 py-1.5 text-sm ${
                mode === "local"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
            >
              로컬
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            새 탭으로 열기
          </a>
          <button
            type="button"
            onClick={() => {
              // iframe 강제 리로드: 키를 바꾸는 대신, 쿼리 파라미터에 cache-bust 추가
              const u = new URL(src);
              u.searchParams.set("_ts", Date.now().toString());
              (document.getElementById("chatbot-iframe") as HTMLIFrameElement).src = u.toString();
              setStat("loading");
            }}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            새로 고침
          </button>
        </div>
      </div>

      {/* 스켈레톤(로딩 상태) */}
      {stat === "loading" && (
        <div className="w-full h-[78dvh] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 animate-pulse grid place-items-center">
          <span className="text-gray-500 dark:text-gray-400">챗봇 불러오는 중…</span>
        </div>
      )}

      {/* 본문 iframe */}
      <iframe
        id="chatbot-iframe"
        key={src} // src 변경 시 리렌더
        src={src}
        title={title}
        className="w-full h-[78dvh] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        style={{ WebkitOverflowScrolling: "touch" }}
        // 권장 권한 & 보안
        allow="microphone; clipboard-read; clipboard-write; encrypted-media;"
        referrerPolicy="no-referrer"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
        onLoad={() => setStat("ok")}
        onError={() => setStat("error")}
      />

      {/* 에러 가이드(자동 표시) */}
      {stat === "error" && (
        <div className="mt-3 text-sm text-red-600">
          연결 실패했습니다. 아래를 확인하세요.
          <ul className="list-disc pl-5 mt-1">
            {mode === "local" ? (
              <>
                <li>로컬 서버가 실행 중인지 확인 (기본: 127.0.0.1:8501)</li>
                <li>필요 시 Streamlit 실행 옵션: <code>--server.enableCORS false --server.enableXsrfProtection false</code></li>
              </>
            ) : (
              <>
                <li>배포 주소를 새 탭에서 직접 열어 정상 동작하는지 확인</li>
                <li>여전히 안 되면 상대 서버의 X-Frame-Options/CSP가 iframe을 제한 중일 수 있습니다</li>
              </>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
