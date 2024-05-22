import "./globals.css";

import classNames from "classnames";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { Providers } from "@/app/components/providers";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heedo's Blog",
  description: "희도의 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body
        className={classNames("h-full overflow-hidden", notoSansKR.className)}
      >
        <main className="flex min-h-screen w-screen">
          <aside className="flex min-h-screen w-24 shrink-0 justify-center bg-[#1C1D22] p-4">
            <h1 className="leading-none text-white">TODO</h1>
          </aside>

          {/* 프로젝트 기능 생기기 전까지 숨김 처리 */}
          <nav className="hidden min-h-screen w-[320px] shrink-0 bg-[#222327] p-6">
            <h2 className="text-3xl leading-none text-white">Projects</h2>
          </nav>

          <section className="flex max-h-screen min-w-0 grow flex-col bg-[#2A2B2F]">
            <header className="flex h-24 shrink-0 items-center border-b border-white/10 p-6">
              <span className="leading-none text-white">
                Welcome back, Heedo 👋
              </span>
            </header>

            <div className="flex min-h-0 grow gap-x-4 overflow-x-scroll p-4">
              <Providers>{children}</Providers>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
