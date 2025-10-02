import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?(s==='dark'):m;if(d){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#111" />
        <link rel="icon" href="/app-icon.png" />
        <title>모구모구</title>
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        {/* 🎨 고정 배경 레이어 */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
        >
          {/* 은은한 원형 그라디언트 */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_10%,rgba(59,130,246,0.07),transparent_60%),radial-gradient(50%_35%_at_80%_0%,rgba(16,185,129,0.07),transparent_60%)] dark:bg-[radial-gradient(60%_40%_at_20%_10%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(50%_35%_at_80%_0%,rgba(16,185,129,0.10),transparent_60%)]" />
          {/* 점 그리드 (매우 옅게) */}
          <div className="absolute inset-0 opacity-[.35] dark:opacity-[.25] [background:radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.12)_1px,transparent_1.5px)] [background-size:14px_14px] dark:[background:radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.12)_1px,transparent_1.5px)]" />
        </div>

        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
