"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Ctx = {
  open: boolean;
  progress: number;          // 0~1
  start: () => void;         // 전환 시작(오버레이 켜기)
  end: () => void;           // 전환 종료(완료)
  hardReset: () => void;     // 비상 리셋 (에러/취소 대비)
};

const TransitionCtx = createContext<Ctx | null>(null);

/**
 * 진행률 곡선: 초반 빠르게, 후반 느리게 (easeOut)
 */
function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = useCallback(() => {
    // 이미 켜져있으면 재시동하지 않음 (중복 클릭 보호)
    setOpen(true);
    setProgress(0.05); // 5%에서 출발
    clearTimer();

    const startAt = Date.now();
    timerRef.current = setInterval(() => {
      // 경과 시간(ms) → 0~1로 정규화 (기본 1.2초 안쪽에서 0.9 근처까지)
      const dt = (Date.now() - startAt) / 1200;
      const target = 0.92 * easeOutQuad(Math.min(dt, 1));
      setProgress((p) => {
        if (p < target) return target;
        // 너무 느리게 멈춰있지 않게 아주 미세한 드리프트
        if (p < 0.95) return Math.min(0.95, p + 0.002);
        return p;
      });
    }, 100);
  }, []);

  const end = useCallback(() => {
    // 100%로 밀어주고, 살짝 딜레이 후 닫기
    clearTimer();
    setProgress(1);
    // 새로운 화면 페인트 타이밍 감안한 짧은 딜레이
    const t = setTimeout(() => {
      setOpen(false);
      setProgress(0);
      clearTimeout(t);
    }, 200);
  }, []);

  const hardReset = useCallback(() => {
    clearTimer();
    setOpen(false);
    setProgress(0);
  }, []);

  // 안전장치: 10초 넘는 비정상 상황이면 자동 리셋
  useEffect(() => {
    if (!open) return;
    const safety = setTimeout(() => hardReset(), 10000);
    return () => clearTimeout(safety);
  }, [open, hardReset]);

  const value = useMemo(
    () => ({ open, progress, start, end, hardReset }),
    [open, progress, start, end, hardReset]
  );

  return <TransitionCtx.Provider value={value}>{children}</TransitionCtx.Provider>;
}

export function useTransitionOverlay() {
  const ctx = useContext(TransitionCtx);
  if (!ctx) throw new Error("useTransitionOverlay must be used within <TransitionProvider />");
  return ctx;
}
