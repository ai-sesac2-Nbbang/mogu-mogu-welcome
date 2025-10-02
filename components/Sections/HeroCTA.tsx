// components/sections/HeroCTA.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/fx/Reveal";
import FloatingIn from "../../components/fx/FloatingIn";

type CTA = { label: string; href: string };
type Props = {
  // 텍스트 영역
  eyebrow?: string;                // 작은 안내문 (ex. "동네 이웃과 함께해요")
  title: string;                   // 큰 제목 (ex. "모구모구에서 편하게 공동구매해요")
  description?: string;            // 부제
  bullets?: string[];              // 포인트 목록

  // 버튼
  primary: CTA;                    // 주 CTA (좌측, 그라데이션 버튼)
  secondary?: CTA;                 // 보조 CTA (우측, 테두리 버튼)

  // 이미지
  imageSrc: string;                // /public 경로 이미지 (ex. "/hero.png")
  imageAlt?: string;               // 대체텍스트
  imageOn?: "right" | "left";      // 이미지 위치 (기본 right)

  // 스타일
  className?: string;
};

export default function HeroCTA({
  eyebrow = "동네 이웃과 함께해요",
  title,
  description,
  bullets = [],
  primary,
  secondary,
  imageSrc,
  imageAlt = "히어로 이미지에요",
  imageOn = "right",
  className = "",
}: Props) {
  const ImageBlock = (
    <FloatingIn>
      <div className="relative z-0 mx-auto h-[420px] w-[420px] sm:h-[500px] sm:w-[500px]">
        <div className="absolute inset-0 rounded-full ring-1 ring-black/5 dark:ring-white/10" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 500px, 80vw"
          className="object-contain pointer-events-none"
        />
      </div>
    </FloatingIn>
  );

  const TextBlock = (
    <Reveal>
      <div className="relative z-10">
        {eyebrow && (
          <p className="text-sm font-semibold tracking-wide text-[var(--color-brand)]">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-prose text-gray-600 dark:text-gray-300">{description}</p>
        )}

        {(bullets?.length ?? 0) > 0 && (
          <ul className="mt-6 grid gap-2 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
            {bullets!.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-brand)]/70" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={primary.href}
            className="btn-cta inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white font-semibold
                     ring-1 ring-[color-mix(in_oklab,_var(--color-brand),_black_12%)] hover:translate-y-[1px]"
          >
            {primary.label}
          </Link>

          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center rounded-lg border px-4 py-2 font-semibold
                         dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );

  return (
    <section className={`grid items-center gap-8 md:grid-cols-2 ${className}`}>
      {imageOn === "left" ? (
        <>
          {ImageBlock}
          {TextBlock}
        </>
      ) : (
        <>
          {TextBlock}
          {ImageBlock}
        </>
      )}
    </section>
  );
}
