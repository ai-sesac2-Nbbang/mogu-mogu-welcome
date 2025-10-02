// app/glossary/page.tsx
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        eyebrow="용어 정리해요"
        title="모구 서비스 용어집이에요"
        description="모구장에서 모구스팟까지, 자주 쓰는 용어를 한 번에 정리했어요."
      />

      {/* 핵심 용어 */}
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="모구장이에요" subtitle="상품 등록·구매·소분을 담당해요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>총 결제금액의 0~20% 범위에서 팁을 설정할 수 있어요.</li>
            <li>먼저 결제하고, 영수증 제출 후 정산받아요.</li>
          </ul>
        </SectionCard>

        <SectionCard title="모구러에요" subtitle="공동구매에 참여하는 이웃이에요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>원하는 수량을 신청하고, 약속된 시간에 모구스팟에서 수령해요.</li>
            <li>수령 시 상태를 꼭 확인해요(신선식품 2시간 내 불량 신고 가능해요).</li>
          </ul>
        </SectionCard>

        <SectionCard title="모구링이에요" subtitle="거리·위시마켓·거래 내역으로 매칭해요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>AI 추천 서비스 반경은 3km에요.</li>
            <li>최신순·거리순 정렬을 지원해요.</li>
          </ul>
        </SectionCard>

        <SectionCard title="모구봇이에요" subtitle="카카오톡 기반 RAG 챗봇이에요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>알림과 문의 응답을 도와줘요.</li>
            <li>답변은 내부 자료(RAG) 기준으로만 제공돼요.</li>
          </ul>
        </SectionCard>
      </div>

      {/* 장소/반경 */}
      <PageHeader
        className="mt-10 mb-6"
        eyebrow="장소·반경"
        title="스팟과 반경 개념이에요"
        description="수령 장소인 모구스팟, 선호 위치인 위시스팟의 차이를 알아봐요."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="모구스팟이에요" subtitle="물건을 수령하는 실제 장소에요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>모구장이 지정하고, 게시물에서 미니맵으로 확인해요.</li>
            <li>정해진 시간에 해당 스팟에서 수령해요.</li>
          </ul>
        </SectionCard>

        <SectionCard title="위시스팟이에요" subtitle="내가 선호하는 기준 위치에요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>최대 두 곳까지 저장할 수 있어요.</li>
            <li>내 위시스팟을 기준으로 주변 모구스팟을 보여줘요.</li>
          </ul>
        </SectionCard>

        <SectionCard title="거리 반경이에요" subtitle="추천·정렬 기준 반경은 3km에요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>행정동은 참고만 하고, 실제 참여는 수락 여부로 결정돼요.</li>
          </ul>
        </SectionCard>
      </div>

      {/* 가입/선호정보 */}
      <PageHeader
        className="mt-10 mb-6"
        eyebrow="가입·선호"
        title="온보딩 정보와 카테고리예요"
        description="가입 시 수집되는 항목과 추천을 위한 선호 정보를 정리했어요."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="온보딩 정보에요" subtitle="추천 품질을 높이기 위한 정보에요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>이름, 성별, 생년월일, 연락처, 가구원 수, 선호 카테고리를 입력해요.</li>
            <li>위치는 3km 반경 여부만 활용하고, 구체 위치는 공개하지 않아요.</li>
          </ul>
        </SectionCard>

        <SectionCard title="가구원 수에요" subtitle="1인 / 2인 / 3인 이상으로 선택해요." />

        <SectionCard title="카테고리 목록이에요" subtitle="관심사 기반 추천에 활용해요." className="md:col-span-2">
          <ul className="grid gap-2 sm:grid-cols-2 list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>생활용품</li>
            <li>식품/간식</li>
            <li>패션/잡화</li>
            <li>뷰티/헬스케어</li>
          </ul>
        </SectionCard>

        <SectionCard title="위시마켓 목록이에요" subtitle="선호 마켓을 등록해요." className="md:col-span-2">
          <ul className="grid gap-2 sm:grid-cols-2 list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>이마트</li>
            <li>홈플러스</li>
            <li>코스트코</li>
            <li>편의점</li>
            <li>노브랜드</li>
            <li>전통시장</li>
            <li>이커머스</li>
            <li>기타(직접 입력)</li>
          </ul>
        </SectionCard>
      </div>

      <p className="mt-8 text-xs text-gray-500">데이터 기준: 2025-09-30 v7에요</p>
    </main>
  );
}
