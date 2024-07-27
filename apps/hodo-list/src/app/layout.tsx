import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description: "Set by Heedo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
