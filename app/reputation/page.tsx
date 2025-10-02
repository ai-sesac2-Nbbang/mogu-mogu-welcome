// app/reputation/page.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import BadgeCard from "../../components/ui/BadgeCard";
import Modal from "../../components/ui/Modal";
import Reveal from "../../components/fx/Reveal";

export default function Page() {
  const THRESHOLD = 5;

  // 예시 데이터: uses는 해당 마켓 이용 횟수에요.
  const maniaBadges = [
    { src: "/badges/costco2.png",      title: "코스트코 매니아",   desc: "코스트코 공구를 즐겨해요",     uses: 3 },
    { src: "/badges/emart.png",       title: "이마트 매니아",     desc: "이마트 공구를 자주 이용해요", uses: 5 },
    { src: "/badges/homeplus.png",    title: "홈플러스 매니아",   desc: "홈플러스를 애용해요",         uses: 1 },
    { src: "/badges/traders.png",     title: "트레이더스 매니아", desc: "트레이더스를 자주 이용해요", uses: 2 },
    { src: "/badges/convenience.png", title: "편의점 매니아",     desc: "편의점 공구에 익숙해요",       uses: 4 },
    { src: "/badges/traditional.png", title: "전통시장 매니아",   desc: "동네 시장을 사랑해요",         uses: 5 },
    { src: "/badges/ecommerce2.png",   title: "이커머스 매니아",   desc: "온라인 마켓 공구를 자주 해요", uses: 6 },
  ];

  const positive = [
    "시간 및 장소 약속을 잘 지켜요",
    "소통이 친절하고 설명이 정확해요",
    "정산이 빠르고 깔끔해요",
    "상품을 꼼꼼히 챙겨줘요",
    "응답이 빨라요",
    "신선상품 관리를 잘 해줘요",
    "신뢰할 수 있어요",
    "다음에도 함께하고 싶어요",
  ];

  const negative = [
    "시간을 어겨요",
    "소통이 불친절해요",
    "정산이 늦어요",
    "상품을 대충 챙겨줘요",
    "포장 상태가 부실해요",
    "거래 과정이 불투명해요",
    "상품 사진을 정확하게 업로드하지 않아요",
    "환불이나 가격 흥정을 고집해요",
  ];

  // 모달 상태
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | (typeof maniaBadges)[number]>(null);

  const unlocked = useMemo(() => {
    if (!selected) return false;
    return (selected.uses ?? 0) >= THRESHOLD;
  }, [selected]);

  const progress = useMemo(() => {
    if (!selected) return 0;
    return Math.min(selected.uses ?? 0, THRESHOLD);
  }, [selected]);

  const percent = Math.round((progress / THRESHOLD) * 100);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Reveal>
        <PageHeader
          eyebrow="신뢰 지표에요"
          title="평판과 매니아 배지에요"
          description={`특정 마켓을 ${THRESHOLD}회 이상 이용하면 해당 ‘마니아 배지’를 1회 획득해요.`}
          actions={
            <a
              href="/faq"
              className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              FAQ 보기
            </a>
          }
        />
      </Reveal>

      {/* 평판 키워드 (표시만) */}
      <Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          <SectionCard title="긍정 키워드에요" subtitle="좋은 거래 경험을 표현해요.">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {positive.map((t, i) => (
                <motion.li
                  key={t}
                  className="rounded-full border px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.28, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t}
                </motion.li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-500">※ 평판 키워드는 현재 배지로 바뀌지 않아요.</p>
          </SectionCard>

          <SectionCard title="부정 키워드에요" subtitle="개선이 필요한 부분을 알려줘요.">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {negative.map((t, i) => (
                <motion.li
                  key={t}
                  className="rounded-full border px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.28, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t}
                </motion.li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-500">※ 반복 위반은 제재로 이어질 수 있어요.</p>
          </SectionCard>
        </div>
      </Reveal>

      {/* 마니아 배지 */}
      <Reveal>
        <PageHeader
          className="mt-10 mb-6"
          eyebrow="마니아 배지에요"
          title="자주 이용한 마켓으로 배지를 받아요"
          description={`각 마켓을 ${THRESHOLD}회 이상 이용하면 배지를 획득해요. 미획득 배지는 회색으로 보여줘요.`}
        />
      </Reveal>

      {maniaBadges.length === 0 ? (
        <Reveal>
          <div className="rounded-xl border p-6 text-center text-sm text-gray-600 dark:text-gray-300 dark:border-gray-800">
            아직 받은 마니아 배지가 없어요. 자주 이용한 마켓의 공구가 쌓이면 자동으로 배지를 받을 수 있어요.
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {maniaBadges.map((b, i) => {
            const isUnlocked = (b.uses ?? 0) >= THRESHOLD;
            const prog = Math.min(b.uses ?? 0, THRESHOLD);
            return (
              <Reveal key={b.title} delay={i * 0.04}>
                <BadgeCard
                  src={b.src}
                  title={b.title}
                  desc={b.desc}
                  locked={!isUnlocked}
                  progressText={!isUnlocked ? `${prog} / ${THRESHOLD}` : undefined}
                  hoverPop={isUnlocked}
                  onClick={() => {
                    setSelected(b);
                    setOpen(true);
                  }}
                />
              </Reveal>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-xs text-gray-500">데이터 기준: 2025-09-30 v7에요</p>

      {/* 모달: 배지 가이드 */}
      <Modal
        open={open && !!selected}
        onClose={() => setOpen(false)}
        title={selected ? `${selected.title} 가이드에요` : undefined}
      >
        {selected && (
          <>
            <p>
              이 배지는 <b>{THRESHOLD}회 이상</b> 해당 마켓을 이용하면 자동으로 획득해요.
            </p>

            {/* 진행률 바 */}
            <div className="mt-4">
              <div className="mb-1 flex items-end justify-between text-xs text-gray-600 dark:text-gray-300">
                <span>진행률에요</span>
                <span>
                  {Math.min(selected.uses ?? 0, THRESHOLD)} / {THRESHOLD} ({percent}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                <div
                  className="h-full bg-[var(--color-brand)] transition-[width]"
                  style={{ width: `${percent}%` }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percent}
                  role="progressbar"
                />
              </div>
            </div>

            {/* 팁 */}
            <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 marker:text-[var(--color-brand)]">
              <li>가까운 스팟과 시간대를 설정하면 참여 확률이 높아져요.</li>
              <li>위시마켓을 업데이트하면 추천 정확도가 올라가요.</li>
              <li>공지 알림(모구톡)을 켜두면 마감 전에 놓치지 않아요.</li>
            </ul>
          </>
        )}
      </Modal>
    </main>
  );
}
