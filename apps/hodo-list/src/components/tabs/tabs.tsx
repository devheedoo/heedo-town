"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();

  const PATHNAMES_TO_TABS = [
    { pathname: "/", title: "할 일 목록" },
    { pathname: "/archives", title: "되돌아보기" },
    { pathname: "/abilities", title: "능력치" },
  ];

  return (
    <div role="tablist" className="tabs tabs-bordered mb-6">
      {PATHNAMES_TO_TABS.map((p) => {
        return (
          <Link
            key={p.pathname}
            href={p.pathname}
            role="tab"
            className={classNames("tab", {
              "tab-active": p.pathname === pathname,
            })}
          >
            {p.title}
          </Link>
        );
      })}
    </div>
  );
}
