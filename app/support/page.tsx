"use client";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = "이메일을 입력하세요.";
    else if (!emailRegex.test(email)) e.email = "이메일 형식이 올바르지 않아요.";
    if (!title) e.title = "제목";
    if (!content) e.content = "문의";
    else if (content.length < 10) e.content = "문의 내용을 최소 10자 이상 입력해주세요";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      alert("문의가 정상적으로 제출됐어요 ✅");
      setEmail(""); setTitle(""); setContent("");
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">문의 페이지에요</h1>
        <p className="mt-2 text-gray-600">빠르게 확인하고 안내드릴게요.</p>
      </header>

      <form
        className="grid gap-4"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <div>
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="mogumogu@mogu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
        </div>

        <div>
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="mt-1 text-sm text-red-600">{errors.title}</div>}
        </div>

        <div>
          <textarea
            className="min-h-[140px] w-full rounded-xl border px-3 py-2"
            placeholder="문의 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <div className="mt-1 text-sm text-red-600">{errors.content}</div>}
        </div>

        <button
          type="submit"
          className="rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white"
        >
          문의하기
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-500">데이터 기준: 2025-09-30 v7</p>
    </main>
  );
}
