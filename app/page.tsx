// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Reveal from "../components/fx/Reveal";
import FloatingIn from "../components/fx/FloatingIn";
import SmoothHover from "../components/fx/SmoothHover"; // ★ 추가

export default function Page() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-10">
      {/* 은은한 배경 (직전 버전) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-120px] h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl
                     bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.sky.400/.25),theme(colors.violet.400/.25),transparent)]"
        />
      </div>

      {/* HERO 섹션 */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        {/* 왼쪽 텍스트/버튼 */}
        <Reveal>
          <div className="relative z-10">
            <p className="text-sm font-semibold tracking-wide text-[var(--color-brand)]">이웃과 함께</p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl flex items-center">
  <span className="sr-only">모구모구</span>
  <Image
    src="/logo.png"   // ← 파일이 public 루트에 있을 때
    // src="/images/mogumogu-logo.png" // ← public/images/ 에 있을 때는 이 줄로 교체
    alt="모구모구 로고"
    width={360}
    height={100}
    priority
    className="h-auto w-auto"
  />
</h1>


            <p className="mt-3 max-w-prose text-gray-600 dark:text-gray-300">
              가까운 스팟에서 빠르고 간편하게 나눠 사는 서비스에요. 모구장이 올린 상품에 참여하고,
              정해진 시간에 받아가면 끝이에요.
            </p>

            <ul className="mt-6 grid gap-2 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
              {["팁을 20%까지 설정할 수 있어요","거리 기준 3km 매칭이에요"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-brand)]/70" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {/* 버튼 2개: SmoothHover로 감싸기 */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SmoothHover lift={2} scale={1.003} shadow={false}>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white
                             ring-1 ring-[color-mix(in_oklab,_var(--color-brand),_black_12%)]
                             bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-2))]
                             hover:opacity-90 transition"
                >
                  기능 먼저 볼래요
                </Link>
              </SmoothHover>

              <SmoothHover lift={2} scale={1.003} shadow={false}>
                <Link
                  href="/policy"
                  className="inline-flex items-center rounded-lg border px-4 py-2 font-semibold
                             dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  규정 먼저 볼래요
                </Link>
              </SmoothHover>
            </div>
          </div>
        </Reveal>

        {/* 오른쪽 일러스트 */}
        <FloatingIn>
          <div className="relative z-0 mx-auto h-[420px] w-[420px] sm:h-[500px] sm:w-[500px]">
            <div className="absolute inset-0 rounded-full ring-1 ring-black/5 dark:ring-white/10" />
            <Image
              src="/hero.png"
              alt="모구모구 일러스트에요"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 80vw"
              className="object-contain pointer-events-none"
            />
          </div>
        </FloatingIn>
      </section>

      {/* 하단 3컬럼 특징: 각 카드 부드러운 호버 */}
      <section className="mt-16">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "간편해요",     desc: "참여 신청부터 수령까지 몇 번의 터치로 끝나요.", link: "/features",   cta: "기능 보기" },
              { title: "안전해요",     desc: "노쇼/사기 방지 정책과 신고 제재 기준이 있어요.", link: "/policy",     cta: "정책 보기" },
              { title: "신뢰가 쌓여요", desc: "평판/배지로 이웃과 신뢰를 만들 수 있어요.",   link: "/reputation", cta: "평판 보기" },
            ].map((card) => (
              <Reveal key={card.title}>
                {/* 기존 hover:-translate-y / shadow 제거하고 SmoothHover로 통일 */}
                <SmoothHover>
                  <div className="group rounded-xl border p-5 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{card.title}</h3>
                      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]/70 transition group-hover:scale-125" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{card.desc}</p>
                    <Link
                      href={card.link}
                      className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand)] underline underline-offset-4 hover:opacity-80"
                    >
                      {card.cta}
                    </Link>
                  </div>
                </SmoothHover>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
