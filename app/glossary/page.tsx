export default function Page() {
  const Card = ({ title, desc }: { title: string; desc: string }) => (
    <div className="rounded-xl border bg-white p-4">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-700">{desc}</div>
    </div>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">용어집</h1>
        <p className="mt-2 text-gray-600">모구에서 자주 쓰는 용어를 모았어요.</p>
      </header>

      <h2 className="mt-6 text-lg font-bold">핵심 역할</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Card title="모구장" desc="상품 등록·구매·소분을 담당해요. 총액의 0~20% 팁을 설정할 수 있어요." />
        <Card title="모구러" desc="공동구매 참여자에요. 신청 후 모구스팟에서 정해진 시간에 수령해요." />
      </div>

      <h2 className="mt-6 text-lg font-bold">서비스/기능</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Card title="모구링" desc="거리, 위시마켓, 거래 내역을 기반으로 AI가 매칭해줘요. 기본 반경은 3km에요." />
        <Card title="모구톡" desc="모집→구매→소분→픽업 진행을 앱 푸시로 알려줘요." />
        <Card title="Q&A" desc="게시물에서 댓글 형식으로 문의할 수 있어요. 공개/비공개 설정 가능해요." />
        <Card title="온보딩" desc="선호 마트, 가구원 수, 선호 카테고리를 입력해요. 개인화에 활용돼요." />
      </div>

      <h2 className="mt-6 text-lg font-bold">장소/반경 개념</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <Card title="모구스팟" desc="수령 장소에요. 모구장이 정하고 지도에서 확인할 수 있어요." />
        <Card title="위시스팟" desc="선호 위치(최대 2곳)를 저장해요. 기준점 역할이에요." />
        <Card title="거리 반경(3km)" desc="AI 매칭 기본 반경이에요. 모구장이 수락하면 거리는 유동적이에요." />
      </div>

      <h2 className="mt-6 text-lg font-bold">마켓·카테고리·</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <Card title="위시마켓" desc="이마트/홈플러스/코스트코/편의점/전통시장/이커머스/기타에요." />
        <Card title="카테고리" desc="생활용품 / 식품·간식 / 패션·잡화 / 뷰티·헬스케어에요." />
        <Card title="가구원 수" desc="1인 / 2인 / 3인 이상 중에서 선택해요." />
      </div>

      <h2 className="mt-6 text-lg font-bold">정산/운영</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Card title="정산 규칙" desc="모구장이 먼저 결제하고 영수증 제출 후 정산받아요. 팁은 0~20%에요." />
        <Card title="모구모구" desc="동네 기반 공동구매 플랫폼이에요." />
      </div>

      <p className="mt-6 text-xs text-gray-500">데이터 기준: 2025-09-30 v7</p>
    </main>
  );
}
