// app/policy/page.tsx
"use client";

import { motion } from "framer-motion";
import Reveal from "../../components/fx/Reveal";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";

export default function Page() {
  const payRules = [
    "지금은 직접 정산형이에요. 모구장이 먼저 결제하고, 모구러가 나중에 송금해요.",
    "추후에는 에스크로(계좌·간편·카드) 방식도 도입 예정이에요.",
  ];

  const refundRules = [
    "구매 확정 후 취소는 불가능해요.",
    "신청이 전혀 없으면 제한시간(거래확정 3시간 이전) 이후 게시물은 자동으로 삭제돼요.",
    "모집 인원 미달이어도 진행은 가능하지만 차액은 모구장이 부담해요.",
    "신선식품은 수령 후 2시간이 지나면 불량 신고가 불가능해요.",
    "상품 불량은 모구장이 책임져요.",
    "노쇼는 환불이 불가하고 신고 누적 시 제재가 적용돼요.",
  ];

  const privacyRules = [
    "수집 항목은 이름, 성별, 생년월일, 연락처, 가구원 수, 선호 카테고리예요.",
    "위치는 3km 반경 여부만 활용하고, 모구장에게 구체 위치는 제공하지 않아요.",
    "연락처는 동의 시 안심번호만 제공돼요.",
    "결제 정보는 정산 목적에 한해 최소한으로만 보관해요.",
  ];

  const penaltyRules = [
    "노쇼 2회 이상이면 1주일 또는 한 달 정지예요.",
    "욕설·비하 경고 2회 누적 시 3~5일 정지예요.",
    "반복 위반은 영구 정지예요.",
    "허위 신고도 제재 대상이에요.",
  ];

  const bannedRules = [
    "마약류, 총포·도검·폭발물, 주류·담배, 의료기기/의약품, 저작권 침해물 등은 거래할 수 없어요.",
    "면세품, 군마트용품 등은 재판매가 불가능해요.",
  ];

  const lawCards = [
    {
      title: "허위 상품 등록(사기죄)예요",
      items: [
        "법률: 형법 제347조예요",
        "예: 게시 정보와 실제 상품이 달라 상품 가치가 상실된 경우예요",
        "처벌: 10년 이하 징역 또는 2천만원 이하 벌금이에요",
        "조치: 계정 영구 정지와 수사기관 통보예요",
      ],
    },
    {
      title: "고의 미정산(횡령·배임죄)예요",
      items: [
        "법률: 형법 제355조예요",
        "예: 고의 지연·미지급으로 금전적 손해를 끼치는 경우예요",
        "처벌: 5년 이하 징역 또는 1,500만원 이하 벌금이에요",
        "조치: 계정 정지와 증빙 확보 후 수사기관 통보예요",
      ],
    },
    {
      title: "거짓·과장 표시(전자상거래법 위반)예요",
      items: [
        "법률: 전자상거래법 제21조예요",
        "예: 허위 사진·정보로 수익을 얻는 경우예요",
        "처벌: 과징금·영업정지·형사처벌 병행 가능이에요",
        "조치: 상품 차단, 계정 정지, 수사기관 통보예요",
      ],
    },
    {
      title: "개인정보 도용·판매(정보통신망법 위반)예요",
      items: [
        "법률: 정보통신망법 제49조예요",
        "예: 동의 없이 거래 진행 또는 명의 도용의 경우예요",
        "처벌: 5년 이하 징역 또는 5천만원 이하 벌금이에요",
        "조치: 계정 영구 정지와 수사기관 통보예요",
      ],
    },
  ];

  // 공통 트랜지션
  const itemTrans = (i: number) => ({
    duration: 0.28,
    delay: i * 0.03,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Reveal>
        <PageHeader
          eyebrow="안전·정책 안내에요"
          title="서비스 이용 전 꼭 알아두면 좋아요"
          description="결제/정산, 환불/취소, 개인정보, 신고/제재, 금지 품목과 법적 가이드를 모았어요"
        />
      </Reveal>

      {/* 결제/정산 */}
      <Reveal className="mt-6">
        <SectionCard title="결제/정산 규정이에요" subtitle="현재 방식과 추후 계획을 안내해요.">
          <ul className="space-y-2">
            {payRules.map((t, i) => (
              <motion.li
                key={t}
                className="rounded-xl border p-3 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={itemTrans(i)}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </SectionCard>
      </Reveal>

      {/* 환불/취소 */}
      <Reveal className="mt-6">
        <SectionCard title="환불/취소 규정이에요" subtitle="상황별 기준을 명확히 안내해요.">
          <ul className="space-y-2">
            {refundRules.map((t, i) => (
              <motion.li
                key={t}
                className="rounded-xl border p-3 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={itemTrans(i)}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </SectionCard>
      </Reveal>

      {/* 개인정보 처리 */}
      <Reveal className="mt-6">
        <SectionCard title="개인정보 처리 기준이에요" subtitle="최소 수집·목적 제한 원칙을 지켜요.">
          <ul className="space-y-2">
            {privacyRules.map((t, i) => (
              <motion.li
                key={t}
                className="rounded-xl border p-3 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={itemTrans(i)}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </SectionCard>
      </Reveal>

      {/* 신고/제재 */}
      <Reveal className="mt-6">
        <SectionCard title="신고/제재 기준이에요" subtitle="건강한 커뮤니티 유지를 위해 필요해요.">
          <ul className="space-y-2">
            {penaltyRules.map((t, i) => (
              <motion.li
                key={t}
                className="rounded-xl border p-3 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={itemTrans(i)}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </SectionCard>
      </Reveal>

      {/* 거래/재판매 금지 */}
      <Reveal className="mt-6">
        <SectionCard title="거래 및 재판매 금지 품목이에요" subtitle="법령 위반 소지가 있는 품목을 금지해요.">
          <ul className="space-y-2">
            {bannedRules.map((t, i) => (
              <motion.li
                key={t}
                className="rounded-xl border p-3 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={itemTrans(i)}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </SectionCard>
      </Reveal>

      {/* 민형사상 가이드맵 */}
      <Reveal className="mt-6">
        <SectionCard title="민형사상 처벌 가이드맵이에요" subtitle="주요 위반 사례와 조치를 안내해요.">
          <div className="grid gap-4 sm:grid-cols-2">
            {lawCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="rounded-xl border p-4 dark:border-gray-800"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={itemTrans(i)}
              >
                <div className="font-semibold">{card.title}</div>
                <ul className="mt-2 space-y-1">
                  {card.items.map((line, j) => (
                    <motion.li
                      key={line}
                      className="text-sm text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={itemTrans(j)}
                    >
                      {line}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              className="sm:col-span-2 rounded-xl border p-4 dark:border-gray-800"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={itemTrans(4)}
            >
              <div className="font-semibold">기타 불법 행위 및 금지 품목이에요</div>
              <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>사례: 미성년자 유해 물품 판매, 불법 금전 요구 등이 해당돼요</li>
                <li>처벌: 해당 법령에 따른 형사처벌이 적용돼요</li>
                <li>금지: 의료용품·건기식·마약류·군용품·도난·장물 등은 거래 불가예요</li>
                <li>재판매 금지: 면세품·군마트용품 등은 재판매 불가예요</li>
              </ul>
            </motion.div>
          </div>
        </SectionCard>
      </Reveal>

      <p className="mt-8 text-xs text-gray-500">데이터 기준: 2025-09-30 v7이에요</p>
    </main>
  );
}
