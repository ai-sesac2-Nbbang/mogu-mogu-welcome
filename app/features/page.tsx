// app/features/page.tsx
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        eyebrow="기능 소개에요"
        title="모구모구 핵심 기능이에요"
        description="이웃과 함께 간편하고 안전하게 공동구매하도록 꼭 필요한 기능만 담았어요."
        actions={
          <a
            href="/policy"
            className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            안전·정책 먼저 볼래요
          </a>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="모구링 매칭이에요"
          subtitle="거리·위시마켓·거래 내역을 기반으로 매칭해줘요."
        >
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>AI 추천 반경은 3km에요.</li>
            <li>최신순·거리순 정렬을 지원해요.</li>
            <li>내 위시스팟을 기준으로 주변 모구스팟을 보여줘요.</li>
          </ul>
        </SectionCard>

        <SectionCard
          title="모구스팟·위시스팟이에요"
          subtitle="수령 장소와 선호 장소를 간단히 지정해요."
        >
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>모구스팟은 게시물 미니맵에서 확인 가능해요.</li>
            <li>위시스팟은 최대 두 곳까지 저장할 수 있어요.</li>
            <li>정해진 시간에 해당 스팟에서 수령하면 돼요.</li>
          </ul>
        </SectionCard>

        <SectionCard
          title="온보딩·개인화에요"
          subtitle="선호 마켓·카테고리·가구원 수로 추천을 맞춤화해요."
        >
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>가구원 수는 1인·2인·3인 이상 중에서 선택해요.</li>
            <li>카테고리는 생활용품·식품/간식·패션/잡화·뷰티/헬스케어에요.</li>
          </ul>
        </SectionCard>

        <SectionCard
          title="알림·Q&A에요"
          subtitle="모구톡으로 일정 알림, 게시물에서 Q&A를 지원해요."
          footer="Q&A는 채팅형으로 전환 준비 중이에요."
        >
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>모집/마감/픽업을 앱 푸시로 알려줘요.</li>
            <li>Q&A는 비공개/공개 설정이 가능해요.</li>
          </ul>
        </SectionCard>

        <SectionCard
          title="정산·팁에요"
          subtitle="지금은 직접 정산형이고, 팁은 0~20%에서 설정해요."
          footer="추후 에스크로(계좌·간편·카드) 결제를 지원할 예정이에요."
          className="md:col-span-2"
        >
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>모구장이 선결제하고 영수증 제출 후 정산받아요.</li>
            <li>날씨나 스팟 특성에 따라 팁이 달라질 수 있어요.</li>
          </ul>
        </SectionCard>

        <SectionCard
          title="평가·배지에요"
          subtitle="거래 후 키워드 평가와 매니아 배지로 신뢰를 높여요."
          className="md:col-span-2"
        >
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>긍정/부정 키워드를 통해 소통·시간 준수·정산 품질 등을 평가해요.</li>
            <li>자주 이용한 마켓은 ‘매니아 배지’를 받을 수 있어요.</li>
          </ul>
        </SectionCard>
      </div>

      <p className="mt-8 text-xs text-gray-500">데이터 기준: 2025-09-30 v7에요</p>
    </main>
  );
}
