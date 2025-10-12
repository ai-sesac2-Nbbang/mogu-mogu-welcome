"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// lucide-react 안 쓰면 이 임포트와 아이콘 부분을 이모지로 바꿔도 돼
import { RefreshCw, Maximize2, ExternalLink } from "lucide-react";

type Props = {
  src: string;
};

export default function MapEmbed({ src }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setLoaded(true);
      setError(null);
    };
    const onError = () => {
      setLoaded(true);
      setError("지도를 불러오지 못했어요.");
    };

    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", onError);
    return () => {
      iframe.removeEventListener("load", onLoad);
      iframe.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className="relative">
      <div className="w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-10rem)] rounded-b-2xl overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-100/60 to-gray-200/60 dark:from-gray-900/40 dark:to-gray-800/40" />
        )}

        {loaded && error && (
          <div className="absolute inset-0 grid place-items-center text-center p-6">
            <div className="rounded-xl border px-6 py-5 bg-white/70 dark:bg-gray-950/70 dark:border-gray-800">
              <p className="font-semibold mb-1">불러오기 실패했어요</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                네트워크나 파일 경로를 확인하고 다시 시도해줘.
              </p>
            </div>
          </div>
        )}

        {/* ⬇️ key prop 삭제, setKey도 사용 안 함 */}
        <motion.iframe
          ref={iframeRef}
          src={src}
          title="모구모구 지도 시각화"
          className="h-full w-full border-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded && !error ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </div>
  );
}

/* 툴바 */
MapEmbed.Toolbar = function Toolbar() {
  const handleReload = () => {
    window.dispatchEvent(new CustomEvent("map-embed:reload"));
  };

  const handleFullscreen = () => {
    const container = document.querySelector<HTMLElement>(
      "section.rounded-2xl > div + div, .rounded-2xl > div.h-\\[calc\\(100vh-8\\.5rem\\)\\]"
    );
    const el = container ?? document.documentElement;
    el.requestFullscreen?.();
  };

  const handleOpenNew = () => {
    window.open("/embeds/activity_map_clusters.html", "_blank", "noopener,noreferrer");
  };

  // 리로드 이벤트 리스너: 첫 번째 iframe을 캐시버스트로 새로고침
  useEffect(() => {
    const listener = () => {
      const frames = document.getElementsByTagName("iframe");
      if (!frames.length) return;
      const f = frames[0];
      try {
        const url = new URL(f.src, location.origin);
        url.searchParams.set("_ts", Date.now().toString());
        f.src = url.toString();
      } catch {
        f.src = f.src.includes("?") ? `${f.src}&_ts=${Date.now()}` : `${f.src}?_ts=${Date.now()}`;
      }
    };
    window.addEventListener("map-embed:reload", listener);
    return () => window.removeEventListener("map-embed:reload", listener);
  }, []);

  const btn =
    "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm hover:bg-gray-50 active:scale-[0.99] dark:border-gray-800 dark:hover:bg-gray-900";

  return (
    <div className="flex items-center gap-2">
      <button className={btn} onClick={handleReload} title="새로고침">
        <RefreshCw className="h-4 w-4" />
        새로고침
      </button>
      <button className={btn} onClick={handleFullscreen} title="전체화면">
        <Maximize2 className="h-4 w-4" />
        전체화면
      </button>
      <button className={btn} onClick={handleOpenNew} title="새 탭으로 열기">
        <ExternalLink className="h-4 w-4" />
        새 탭
      </button>
    </div>
  );
};
