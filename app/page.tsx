"use client";

import Image from "next/image";
import Reveal from "../components/Reveal";
import FloatyHero from "../components/FloatyHero";
import MouseTilt from "../components/MouseTilt";
import MagneticButton from "../components/MagneticButton";
import MorphBlob from "../components/MorphBlob";
// Parallax까지 쓰고 싶으면 주석 해제해서 감싸도 돼요
// import Parallax from "../components/Parallax";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          {/* LEFT: 텍스트/버튼이에요 */}
          <div className="order-2 md:order-1">
            <Reveal>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:text-gray-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
                동네 기반 공동구매 서비스예요
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="모구모구 로고예요"
                  width={280}
                  height={88}
                  className="h-auto w-[220px] md:w-[280px]"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-gray-700 dark:text-gray-300">
                이웃과 함께 간편하고 안전하게 시작해봐요.
              </p>
            </Reveal>

            {/* ✅ CTA: MagneticButton으로 교체했어요 */}
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-3">
                <MagneticButton
                  href="/features"
                  className="rounded-xl bg-[var(--color-brand)] px-5 py-3 font-semibold text-white shadow-md ring-1 ring-[color-mix(in_oklab,_var(--color-brand),_black_12%)] hover:translate-y-[1px]"
                >
                  지금 구경해볼래요
                </MagneticButton>

                <MagneticButton
                  href="/policy"
                  className="rounded-xl border border-[color-mix(in_oklab,_var(--color-brand),_black_20%)] bg-white px-5 py-3 font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:border-[color-mix(in_oklab,_var(--color-brand-dark),_white_30%)] dark:bg-gray-900 dark:text-gray-100"
                >
                  안전 정책 먼저 볼래요
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                데이터 기준: 2025-09-30 v7이에요
              </div>
            </Reveal>
          </div>

          {/* RIGHT: 일러스트 블록이에요 */}
          <div className="relative order-1 h-[300px] w-full md:order-2 md:h-[520px]">
            {/* 은은한 변형 블롭 배경이에요 */}
            <MorphBlob opacity={0.22} />

            {/* 마우스 따라 살짝 기울고, 내부는 둥둥 떠요 */}
            {/* Parallax까지 쓰려면 아래를 Parallax로 감싸면 돼요 */}
            {/* <Parallax strength={30} className="h-full w-full"> */}
            <MouseTilt className="h-full w-full">
              <FloatyHero src="/hero.png" />
            </MouseTilt>
            {/* </Parallax> */}
          </div>
        </div>
      </section>
    </main>
  );
}
