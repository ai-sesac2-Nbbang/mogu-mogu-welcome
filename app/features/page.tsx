export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">모구 기능 안내</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          모구 서비스의 핵심 흐름과 기능을 한눈에 볼 수 있게 정리했어요. 매칭부터 알림, 수령, 정산까지 간단하고 안전하게 이용할 수 있어요.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="mt-8 text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          모구링(매칭)
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li><b>3km 반경</b>을 기준으로 AI가 연결해줘요.</li>
          <li>거리, 위시마켓, 거래 내역을 함께 고려해요.</li>
          <li>행정동은 참고용이에요. 모구장이 수락하면 거리는 유동적이에요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          모구톡(알림)
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li>모집 → 구매 → 소분 → 픽업까지 앱 푸시로 알려줘요.</li>
          <li>변경 사항이 생기면 즉시 알려줘서 일정 조율이 편해요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          Q&amp;A
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li>게시물에서 댓글 형식으로 문의할 수 있어요.</li>
          <li>공개/비공개 설정이 가능해요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          위시마켓·위시스팟·모구스팟
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:border-gray-800">
            <div className="font-semibold">위시마켓</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">선호 마켓을 등록해요(이마트, 홈플러스, 코스트코 등)에요.</p>
          </div>
          <div className="rounded-xl border p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:border-gray-800">
            <div className="font-semibold">위시스팟</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">선호 위치를 최대 두 곳 저장해요. 기준점 역할이에요.</p>
          </div>
          <div className="rounded-xl border p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:border-gray-800 sm:col-span-2">
            <div className="font-semibold">모구스팟</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">실제 수령 장소에요. 모구장이 설정하고 지도에서 확인해요.</p>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          온보딩·개인화
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li>가입 시 선호 마트, 가구원 수, 선호 카테고리를 입력해요.</li>
          <li>카테고리: 생활용품 / 식품·간식 / 패션·잡화 / 뷰티·헬스케어에요.</li>
          <li>가구원 수: 1인 / 2인 / 3인 이상이에요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          정산·팁
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li><b>직접 정산형</b>이에요. 모구장이 먼저 결제하고 영수증 제출 후 정산받아요.</li>
          <li>모구장 팁은 <b>0~20%</b> 범위에서 재량 설정해요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          픽업 방식
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li>기본은 모구장이 지정한 모구스팟에서 픽업해요.</li>
          <li>정해진 시간에 수령만 가능하면 어디서나 모구러가 될 수 있어요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          지리·반경 규칙
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li>AI 추천 서비스 기준 반경은 <b>3km</b>에요.</li>
          <li>정렬은 스팟 기준으로 동작해요.</li>
          <li>모구장이 수락하면 거리 제약은 유연해요.</li>
        </ul>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-sky-400">
          업데이트 예정(로드맵) 기능
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          <li>채팅 서비스, 에스크로 결제, 레벨 시스템(최대 59레벨) 도입 예정이에요.</li>
          <li>위시마켓 랭킹·쿠폰, 모구나가(안), 정기모구, 모구클랜, 모구하우스를 준비 중이에요.</li>
          <li>시간대 기반 스팟 추천, 링크 공유, 연령·성별 랭킹, 지역 스팟 생성률 지표를 제공할 예정이에요.</li>
        </ul>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">데이터 기준: 2025-09-30 v7</p>
      </section>
    </main>
  );
}
