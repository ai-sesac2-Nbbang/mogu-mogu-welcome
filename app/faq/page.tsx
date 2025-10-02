"use client";
import { useState } from "react";

type Item = { cat: string; q: string; a: string | JSX.Element };

const FAQS: Item[] = [
  { cat: "결제/정산", q: "결제는 어떻게 하나요?", a: "지금은 직접 정산형이에요. 모구장이 먼저 결제하고, 모구러가 나중에 송금해요. 에스크로는 추후 지원 예정이에요." },
  { cat: "결제/정산", q: "모구장 팁은 어떻게 책정되나요?", a: "0~20% 범위에서 모구장 재량으로 설정해요." },
  { cat: "환불/취소", q: "구매 확정 후 취소할 수 있나요?", a: "구매 확정 후에는 취소가 불가능해요." },
  { cat: "환불/취소", q: "신선식품 환불 규정이 궁금해요", a: "수령 후 2시간이 지나면 불량 신고가 불가능해요. 심각한 훼손·변질만 환불 가능해요." },
  { cat: "개인정보/위치", q: "어떤 개인정보를 수집하나요?", a: "이름, 성별, 생년월일, 연락처, 가구원 수, 선호 카테고리를 수집해요." },
  { cat: "지리/반경", q: "3km 반경 규칙이 뭐에요?", a: "AI 매칭의 기본 반경이에요. 모구장이 수락하면 거리는 유동적이에요." },
  { cat: "신고/제재", q: "어떤 경우에 제재가 있나요?", a: <ul className="list-disc pl-5"><li>노쇼 2회 이상: 1주일 정지에요.</li><li>욕설·비하 2회 누적: 3일 정지에요.</li><li>반복 위반: 영구 정지에요.</li></ul> },
  { cat: "금지 품목", q: "거래가 금지된 품목이 있나요?", a: "법령으로 금지된 물품은 거래할 수 없어요. 면세품·군마트용품의 재판매도 금지에요." },
  { cat: "기타", q: "RAG 답변은 어떻게 제공되나요?", a: "항상 RAG 기준으로 답변해요. 매 답변에 데이터 기준 날짜를 표기해요." },
];

export default function Page() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const cats = Array.from(new Set(FAQS.map((f) => f.cat)));

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">자주 묻는 질문(FAQ)</h1>
        <p className="mt-2 text-gray-600">카테고리별로 궁금한 점을 눌러서 확인해줘요. RAG 기준(2025-09-30 v7)으로 제공돼요.</p>
      </header>

      {cats.map((cat) => (
        <section key={cat} className="mt-8">
          <h2 className="text-lg font-bold">{cat}에요</h2>
          <div className="mt-2 space-y-2">
            {FAQS.filter((f) => f.cat === cat).map((f, i) => {
              const id = `${cat}-${i}`;
              const isOpen = !!open[id];
              return (
                <div key={id} className="overflow-hidden rounded-xl border bg-white">
                  <button
                    onClick={() => setOpen((s) => ({ ...s, [id]: !s[id] }))}
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold"
                    aria-expanded={isOpen}
                  >
                    <span>{f.q}</span>
                    <span className="opacity-60" aria-hidden>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="px-4 pb-4 text-gray-700">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <p className="mt-6 text-xs text-gray-500">데이터 기준: 2025-09-30 v7</p>
    </main>
  );
}
