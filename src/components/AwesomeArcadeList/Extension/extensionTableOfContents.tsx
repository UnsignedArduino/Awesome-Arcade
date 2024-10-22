import { Extension } from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";
import { AvatarImageRenderer } from "@/components/Blog/Elements";

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
            <AvatarImageRenderer
              url={`https://github.com/${ext.author}.png?size=16`}
              name={ext.author}
            />{" "}
            {ext.repo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
