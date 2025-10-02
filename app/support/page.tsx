// app/support/page.tsx
import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";

export default function Page() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        eyebrow="도움이 필요하신가요"
        title="문의·지원 센터에요"
        description="불편 사항, 제안, 신고는 아래 방법 중 편한 방식으로 남겨주세요."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="빠른 안내에요" subtitle="자주 묻는 질문부터 확인해보세요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>
              <Link href="/faq" className="underline underline-offset-4 hover:opacity-80">
                FAQ 바로가기
              </Link>
            </li>
            <li>
              신고/제재 기준은{" "}
              <Link href="/policy" className="underline underline-offset-4 hover:opacity-80">
                정책 페이지
              </Link>
              에서 확인해요.
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="연락 채널이에요" subtitle="가장 편한 채널을 선택해요.">
          <ul className="list-disc pl-5 marker:text-[var(--color-brand)] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <li>
              이메일:{" "}
              <a
                href="mailto:support@mogu.app"
                className="underline underline-offset-4 hover:opacity-80"
              >
                support@mogu.app
              </a>
            </li>
            <li>카카오톡: 추후 모구봇 채널을 통해 지원 예정이에요.</li>
          </ul>
        </SectionCard>

        <SectionCard
          title="문의 폼이에요"
          subtitle="아래 정보를 작성해주시면 더 빠르게 도와드릴 수 있어요."
          className="md:col-span-2"
        >
          {/* 아직 백엔드 연동 전이라 제출 시 메일 클라이언트를 열어요 */}
          <form
            action="mailto:support@mogu.app"
            method="post"
            encType="text/plain"
            className="grid gap-4 md:grid-cols-2"
          >
            {/* 허니팟(봇 방지) */}
            <input
              name="nickname"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                이름에요
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="이름을 입력해요"
                className="rounded-lg border bg-white px-3 py-2 text-sm outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:ring-[color-mix(in_oklab,_var(--color-brand),_black_10%)]/60 dark:border-gray-800 dark:bg-gray-950"
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="contact" className="text-sm font-medium">
                연락처에요
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                placeholder="이메일 또는 전화번호를 입력해요"
                pattern=".+@.+\\..+|^\\d{2,3}-?\\d{3,4}-?\\d{4}$"
                className="rounded-lg border bg-white px-3 py-2 text-sm outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:ring-[color-mix(in_oklab,_var(--color-brand),_black_10%)]/60 dark:border-gray-800 dark:bg-gray-950"
                title="올바른 이메일 주소나 전화번호 형식으로 입력해요"
              />
            </div>

            <div className="grid gap-1 md:col-span-2">
              <label htmlFor="category" className="text-sm font-medium">
                문의 유형이에요
              </label>
              <select
                id="category"
                name="category"
                className="rounded-lg border bg-white px-3 py-2 text-sm outline-none ring-1 ring-transparent transition focus:ring-[color-mix(in_oklab,_var(--color-brand),_black_10%)]/60 dark:border-gray-800 dark:bg-gray-950"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  선택해요
                </option>
                <option value="bug">버그 신고에요</option>
                <option value="abuse">신고/제재 문의에요</option>
                <option value="payment">결제/정산 문의에요</option>
                <option value="feature">기능 제안이에요</option>
                <option value="other">기타에요</option>
              </select>
            </div>

            <div className="grid gap-1 md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium">
                상세 내용이에요
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="가능하면 재현 방법, 발생 시간, 화면 캡처 등을 함께 적어주세요."
                className="rounded-lg border bg-white px-3 py-2 text-sm outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:ring-[color-mix(in_oklab,_var(--color-brand),_black_10%)]/60 dark:border-gray-800 dark:bg-gray-950"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3">
              <a
                href="mailto:support@mogu.app"
                className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                이메일로 보낼래요
              </a>
              <button
                type="submit"
                className="rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white ring-1 ring-[color-mix(in_oklab,_var(--color-brand),_black_12%)] hover:translate-y-[1px]"
                title="메일 클라이언트가 열려요"
              >
                작성 내용 전송해요
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            ※ 추후에는 폼이 바로 접수되도록 백엔드를 연동할 예정이에요.
          </p>
        </SectionCard>
      </div>

      <p className="mt-8 text-xs text-gray-500">데이터 기준: 2025-09-30 v7에요</p>
    </main>
  );
}
