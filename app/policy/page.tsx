export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">안전·정책 안내</h1>
        <p className="mt-2 text-gray-600">모구 서비스에서 꼭 알아야 할 규칙을 한곳에 모았어요.</p>
      </header>

      <section className="space-y-4">
        <h2 className="mt-8 text-lg font-bold">결제/정산</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>지금은 직접 정산형이에요. 모구장이 먼저 결제하고, 모구러가 나중에 송금해요.</li>
          <li>추후 에스크로(계좌·간편·카드) 방식도 도입 예정이에요.</li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">환불/취소 규정</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>구매 확정 후 취소는 불가능해요.</li>
          <li>신청이 전혀 없으면 제한시간(거래확정 3시간 이전) 이후 게시물은 자동 삭제돼요.</li>
          <li>모집 인원 미달이어도 진행은 가능하지만 차액은 모구장이 부담해요.</li>
          <li>신선식품은 수령 후 2시간이 지나면 불량 신고가 불가능해요.</li>
          <li>상품 불량은 모구장이 책임져요.</li>
          <li>노쇼는 환불이 불가하고 신고 누적 시 제재가 적용돼요.</li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">개인정보 처리</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>수집 항목: 이름, 성별, 생년월일, 연락처, 가구원 수, 선호 카테고리에요.</li>
          <li>위치는 3km 반경 여부만 활용하고, 모구장에게 구체 위치는 제공하지 않아요.</li>
          <li>연락처는 동의 시 안심번호만 제공돼요.</li>
          <li>결제 정보는 정산 목적에 한해 최소한으로만 보관해요.</li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">신고/제재 규정</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>노쇼 2회 이상: 1주일(또는 한 달) 정지에요.</li>
          <li>욕설·비하 경고 2회 누적: 3~5일 정지에요.</li>
          <li>반복 위반은 영구 정지에요.</li>
          <li>허위 신고도 제재 대상이에요.</li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">거래 및 재판매 금지 품목</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>마약류, 총포·도검·폭발물, 주류·담배, 의료기기/의약품, 저작권 침해물 등은 거래할 수 없어요.</li>
          <li>면세품, 군마트용품 등은 재판매가 불가능해요.</li>
        </ul>

        {/* 민형사상 가이드맵 */}
        <h2 className="mt-8 text-lg font-bold">민형사상 처벌에 관한 가이드맵</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "허위 상품 등록(사기죄)",
              law: "형법 제347조",
              ex: "게시 정보와 실제 상품이 달라 상품 가치가 상실된 경우",
              punish: "10년 이하 징역 또는 2천만원 이하 벌금",
              act: "계정 영구 정지, 수사기관 통보",
            },
            {
              title: "고의 미정산(횡령·배임죄)",
              law: "형법 제355조",
              ex: "고의 지연·미지급 등으로 금전적 손해를 끼치는 경우",
              punish: "5년 이하 징역 또는 1,500만원 이하 벌금",
              act: "계정 정지, 증빙 확보 후 수사기관 통보",
            },
            {
              title: "거짓·과장 표시(전자상거래법 위반)",
              law: "전자상거래법 제21조",
              ex: "허위 사진·정보로 수익을 얻는 경우",
              punish: "과징금·영업정지·형사처벌 병행 가능",
              act: "상품 차단, 계정 정지, 통보",
            },
            {
              title: "개인정보 도용·판매(정보통신망법 위반)",
              law: "정보통신망법 제49조",
              ex: "동의 없이 거래 진행 또는 명의 도용",
              punish: "5년 이하 징역 또는 5천만원 이하 벌금",
              act: "계정 영구 정지, 통보",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border p-4">
              <div className="font-semibold">{c.title}</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                <li><b>법률</b>: {c.law}</li>
                <li><b>예</b>: {c.ex}</li>
                <li><b>처벌</b>: {c.punish}</li>
                <li><b>조치</b>: {c.act}</li>
              </ul>
            </div>
          ))}
          <div className="sm:col-span-2 rounded-xl border p-4">
            <div className="font-semibold">기타 불법 행위 및 금지 품목이에요</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li><b>사례</b>: 미성년자 유해 물품 판매, 불법 금전 요구 등이 해당돼요</li>
              <li><b>처벌</b>: 해당 법령에 따른 형사처벌이 적용돼요</li>
              <li><b>금지</b>: 의료용품/건기식/마약류/군용품/도난·장물 등은 거래 불가에요</li>
              <li><b>재판매 금지</b>: 면세품/군마트용품 등은 재판매 불가에요</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">데이터 기준: 2025-09-30 v7</p>
      </section>
    </main>
  );
}
