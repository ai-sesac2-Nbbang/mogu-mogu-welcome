"use client";
import { useEffect, useState } from "react";

function applyTheme(dark: boolean) {
  const root = document.documentElement; // <html>
  const body = document.body;
  const method = dark ? "add" : "remove";
  root.classList[method]("dark");
  body.classList[method]("dark"); // (혹시 대비용)
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefer = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const next = saved === "dark" || (!saved && prefer);
    setIsDark(!!next);
    applyTheme(!!next);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      title="다크 모드 토글이에요"
    >
      <span className="h-4 w-4">{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "다크모드" : "라이트모드"}</span>
    </button>
  );
}
