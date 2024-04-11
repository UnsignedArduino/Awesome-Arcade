import { isExternalLink } from "@/scripts/Utils/PageUtils";
import React from "react";
import Link from "next/link";

export default function AutoLink({
  href,
  children,
}: {
  href: string | undefined;
  children: React.ReactNode | string;
}): React.ReactNode {
  return href == undefined ? (
    <a href={href}>{children}</a>
  ) : isExternalLink(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}
