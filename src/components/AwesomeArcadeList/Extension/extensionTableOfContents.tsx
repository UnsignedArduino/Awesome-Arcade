import { Extension } from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";

export function ExtensionTableOfContents({
  list,
}: {
  list: Extension[];
}): React.ReactNode {
  return (
    <ul>
      {list.map((ext) => (
        <li key={ext.repo}>
          <Link href={`#${ext.repo}`} onClick={smoothScrollHash}>
            {ext.repo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
