import { Tool } from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";

export function ToolTableOfContents({
  list,
}: {
  list: Tool[];
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
