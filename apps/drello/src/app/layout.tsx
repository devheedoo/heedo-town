import "./globals.css";

import classNames from "classnames";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drello",
  description: "Heedo's Trello",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full overflow-hidden">
      <body
        className={classNames("h-full overflow-hidden", notoSansKR.className)}
      >
        <nav className="flex h-12 border-b border-b-black p-2">
          {/* Logo */}
          <Link href="/" className="px-2">
            <div className="flex h-full items-center">
              <span className="text-base font-extrabold leading-none">
                Drello
              </span>
            </div>
          </Link>

          {/* Left Menu */}
          <div className="flex shrink-0 grow items-stretch">
            <div className="mx-1 h-8">
              <button className="inline-flex h-8 items-center px-3 py-1.5">
                <span className="text-sm leading-8">Workspaces</span>
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex justify-end">
            <button className="flex size-8 items-center justify-center p-1">
              <span className="text-xs">me</span>
            </button>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
