import "@/app/globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hodo List",
  description: "Todo List with daily snapshots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
