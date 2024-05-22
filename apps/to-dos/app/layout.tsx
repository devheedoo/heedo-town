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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
