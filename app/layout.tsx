// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

      <body className="min-h-screen antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        {/* 스킵 링크 */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 z-50 rounded bg-black px-3 py-2 text-white"
        >
          본문으로 바로가기
        </a>

        {/* ⬇️ TransitionProvider / PageTransitionOverlay 제거 */}
        <Navbar />
        <main id="main" className="mx-auto max-w-6xl px-4 pt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
