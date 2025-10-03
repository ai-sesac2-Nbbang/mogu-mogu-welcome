// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// ⬇️ 전역 전환 공급자 & 오버레이
import { TransitionProvider } from "../components/transition/TransitionProvider";
import PageTransitionOverlay from "../components/transition/PageTransitionOverlay";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 초기 테마 적용 스니펫 (FOUC 방지) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try{
    var saved = localStorage.getItem('theme');
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = saved ? (saved === 'dark') : systemDark;
    if(dark){ document.documentElement.classList.add('dark'); }
  }catch(e){}
})();
`,
          }}
        />
        <link rel="icon" href="/app-icon.png" />
        <meta name="theme-color" content="#111111" />
        <title>모구모구</title>
      </head>

      {/* 다크모드에서 확실히 차이나게: Tailwind 기본 색 사용 */}
      <body className="min-h-screen antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        {/* 스킵 링크 */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 z-50 rounded bg-black px-3 py-2 text-white"
        >
          본문으로 바로가기
        </a>

        {/* ⬇️ 전환 공급자 안에 앱 트리 감쌈 */}
        <TransitionProvider>
          <Navbar />
          <main id="main" className="mx-auto max-w-6xl px-4 pt-6">
            {children}
          </main>
          <Footer />

          {/* ⬇️ 전역 페이지 전환 오버레이 */}
          <PageTransitionOverlay />
        </TransitionProvider>
      </body>
    </html>
  );
}
