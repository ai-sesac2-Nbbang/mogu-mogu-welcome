// components/ChatbotModal.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type ChatbotModalProps = {
  open: boolean;
  onClose: () => void;
  src?: string;
  timeoutMs?: number;
};

// ✅ 리디렉션 없이 바로 접속되는 HF Space 엔드포인트 사용 (끝에 / 포함)
const DEFAULT_EMBED_URL =
  "https://sesacna-fustartingbychansolwebchatbot.hf.space/";

export default function ChatbotModal({
  open,
  onClose,
  src = DEFAULT_EMBED_URL,
  timeoutMs = 8000,
}: ChatbotModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // ESC 닫기
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    },
    [open, onClose]
  );

  // 바디 스크롤 잠금 & ESC 리스너
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onKeyDown]);

  // 타임아웃: 새 창 자동 오픈 ❌, 실패 화면만 표시
  useEffect(() => {
    if (!open) {
      setLoaded(false);
      setFailed(false);
      return;
    }
    const t = window.setTimeout(() => {
      if (!loaded) setFailed(true);
    }, timeoutMs);
    return () => window.clearTimeout(t);
  }, [open, loaded, timeoutMs]);

  if (!open) return null;

  const onBackdropClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  const retry = () => {
    setFailed(false);
    setLoaded(false);
    // src 강제 재로딩(+캐시버스트)
    if (iframeRef.current) {
      const u = new URL(src);
      u.searchParams.set("_ts", String(Date.now()));
      iframeRef.current.src = u.toString();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* 배경 */}
      <button
        type="button"
        aria-label="close modal"
        onClick={onBackdropClick}
        className="absolute inset-0 bg-black/60"
      />
      {/* 박스 */}
      <div
        className="relative z-[101] w-[96vw] h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden border"
        role="dialog"
        aria-modal="true"
        aria-label="모구챗"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white/70 backdrop-blur">
          <div className="font-semibold">모구챗</div>
          <div className="flex items-center gap-3 text-sm">
            {!loaded && !failed && <span className="animate-pulse">불러오는 중…</span>}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-lg border hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>

        {/* 본문 */}
        <div className="w-full h-[calc(92vh-44px)] bg-gray-50">
          {!failed ? (
            <iframe
              ref={iframeRef}
              src={src}
              className="w-full h-full bg-white"
              allow="microphone; clipboard-read; clipboard-write; geolocation; camera; web-share"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ WebkitOverflowScrolling: "touch", overflow: "auto", border: 0 }}
              onLoad={() => setLoaded(true)}
              title="chatbot"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-6">
              <div className="text-lg font-semibold">임베드가 차단되었거나 로딩에 실패했어요.</div>
              <div className="flex gap-3">
                <button onClick={retry} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                  다시 시도
                </button>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  새 창으로 열기
                </a>
              </div>
              <p className="text-sm text-gray-500">
                개발 중이면 <code>next.config.js</code>의 <code>frame-src</code> 허용을 확인하세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
