export default function Page() {
  const Pill = ({ text }: { text: string }) => (
    <span className="mr-2 mt-2 inline-block rounded-full border px-3 py-1 text-sm">{text}</span>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">평가 키워드·배지 안내</h1>
        <p className="mt-2 text-gray-600">거래 후 간단한 키워드와 배지로 신뢰를 쌓아요. 반복 위반 시에는 제재가 적용돼요.</p>
      </header>

      <section className="mt-6">
        <h2 className="text-lg font-bold">긍정 키워드 (8개)</h2>
        <div className="mt-2">
          {[
            "시간 및 장소 약속을 잘 지켜요",
            "소통이 친절하고 설명이 정확해요",
            "정산이 빠르고 깔끔해요",
            "상품을 꼼꼼히 챙겨줘요",
            "응답이 빨라요",
            "신선상품 관리를 잘 해줘요",
            "신뢰할 수 있어요",
            "다음에도 함께하고 싶어요",
          ].map((t) => <Pill key={t} text={t} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold">부정 키워드 (8개)</h2>
        <div className="mt-2">
          {[
            "시간을 어겨요",
            "소통이 불친절해요",
            "정산이 늦어요",
            "상품을 대충 챙겨줘요",
            "포장 상태가 부실해요",
            "거래 과정이 불투명해요",
            "상품 사진을 정확하게 업로드하지 않아요",
            "환불이나 가격 흥정을 고집해요",
          ].map((t) => <Pill key={t} text={t} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold">매니아 배지 (5회 누적)</h2>
        <div className="mt-2">
          {[
            "코스트코 매니아",
            "이마트 매니아",
            "편의점 매니아",
            "트레이더스 매니아",
            "홈플러스 매니아",
            "전통시장 매니아",
            "우리동네 매니아",
          ].map((t) => <Pill key={t} text={t} />)}
        </div>
        <p className="mt-2 text-sm text-gray-600">마이페이지에서 태그·배지의 <b>수령 횟수</b>를 확인할 수 있어요.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold">제재 정보 및 기준</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          <li>노쇼 2회 이상: 1주일 정지에요.</li>
          <li>욕설·비하 2회 누적: 3일 정지에요.</li>
          <li>반복 위반: 영구 정지에요.</li>
          <li>허위 신고도 제재 대상이에요.</li>
          <li>원하지 않는 상대는 “다시 만나지 않기”로 숨길 수 있어요.</li>
        </ul>
      </section>

      <p className="mt-6 text-xs text-gray-500">데이터 기준: 2025-09-30 v7</p>
    </main>
  );
}
