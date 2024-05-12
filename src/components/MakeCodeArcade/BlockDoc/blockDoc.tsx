import React from "react";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import BlockRender from "@/components/MakeCodeArcade/Blocks/BlockRender";

export default function MakeCodeArcadeBlockDoc({
  blocksJS,
  javascript,
  python,
  blocksPkg,
}: {
  blocksJS: string;
  javascript: string;
  python: string;
  blocksPkg?: string;
}): React.ReactNode {
  return (
    <div>
      <BlockRender
        js={blocksJS}
        caption={
          <>
            Blocks for <code>{blocksJS}</code>.
          </>
        }
        pkg={blocksPkg}
        snippetMode={true}
      />
      <ThemedSyntaxHighlighter language="js">
        {"// JavaScript\n" + javascript}
      </ThemedSyntaxHighlighter>
      <ThemedSyntaxHighlighter language="python">
        {"# Python\n" + python}
      </ThemedSyntaxHighlighter>
    </div>
  );
}
