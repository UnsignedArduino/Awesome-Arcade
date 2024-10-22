import { Tool } from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";
import { AvatarImageRenderer } from "@/components/Blog/Elements";

export function ToolTableOfContents({
  list,
}: {
  list: Tool[];
}): React.ReactNode {
  return (
    <ul>
      {list.map((tool) => (
        <li key={tool.repo}>
          <Link href={`#${tool.repo}`} onClick={smoothScrollHash}>
            <AvatarImageRenderer
              url={`https://github.com/${tool.author}.png?size=16`}
              name={tool.author}
            />{" "}
            {tool.repo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
