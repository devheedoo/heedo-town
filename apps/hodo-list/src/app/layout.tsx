import "@/app/globals.css";

import classNames from "classnames";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import Tabs from "@/components/tabs/tabs";

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
      <body className={notoSansKR.className}>
        <div
          className={classNames(
            "flex min-h-screen items-center justify-center",
            "text-3xl font-extrabold uppercase text-green-700"
          )}
        >
          <div className="flex max-w-screen-lg flex-col items-center justify-center">
            <h1 className="m-4">Hodo List</h1>

            <Tabs />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
