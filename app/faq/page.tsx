// app/faq/page.tsx
"use client";

import { motion } from "framer-motion";
import Reveal from "../../components/fx/Reveal";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";

export default function Page() {
  const faqs = [
    {
      q: "모구 서비스는 뭐예요?",
      a: "동네 이웃과 함께 간편하게 공동구매하는 서비스예요. 모구장이 상품을 올리고, 모구러가 신청해서 정해진 스팟에서 수령해요.",
    },
    {
      q: "결제는 어떻게 해요?",
      a: "지금은 모구장이 먼저 결제하고, 나중에 개인 송금으로 정산해요. 에스크로는 이후에 지원 예정이에요.",
    },
    {
      q: "환불은 가능해요?",
      a: "구매 확정 후에는 환불이 불가해요. 신선식품은 수령 후 2시간이 지나면 불량 신고가 어려워요.",
    },
    {
      q: "노쇼하면 어떻게 돼요?",
      a: "사전 통보 없는 노쇼는 환불이 불가하고, 누적 시 제재가 적용돼요.",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* 상단 헤더 자체를 부드럽게 등장 */}
      <Reveal>
        <PageHeader
          eyebrow="도움말이에요"
          title="자주 묻는 질문이에요"
          description="빠르게 궁금증을 해결해요. 더 궁금하면 지원센터로 문의해요."
          actions={
            <a
              href="/support"
              className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              지원센터 가기
            </a>
          }
        />
      </Reveal>

      {/* 리스트 컨테이너를 한 번 감싸고, 각 항목은 motion.li로 */}
      <Reveal className="mt-4">
        <SectionCard title="FAQ 목록이에요" subtitle="항목을 눌러 자세히 읽어요.">
          <ul className="space-y-3">
            {faqs.map((item, i) => (
              <motion.li
                key={item.q}
                className="rounded-xl border p-4 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.28, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  className="w-full text-left"
                  type="button"
                  // 간단 토글: 디테일은 나중에 아코디언 컴포넌트로 교체해도 돼요.
                  onClick={(e) => {
                    const box = (e.currentTarget.nextElementSibling as HTMLDivElement) || null;
                    if (!box) return;
                    const open = box.dataset.open === "1";
                    box.dataset.open = open ? "0" : "1";
                    box.style.maxHeight = open ? "0px" : `${box.scrollHeight}px`;
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold">{item.q}</h3>
                    <span className="text-sm text-[var(--color-brand)]">보기</span>
                  </div>
                </button>
                <div
                  className="mt-2 overflow-hidden text-sm text-gray-700 transition-[max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:text-gray-300"
                  style={{ maxHeight: "0px" }}
                  data-open="0"
                >
                  <p className="pt-2">{item.a}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </SectionCard>
      </Reveal>

      <p className="mt-8 text-xs text-gray-500">데이터 기준: 2025-09-30 v7이에요</p>
    </main>
  );
}
