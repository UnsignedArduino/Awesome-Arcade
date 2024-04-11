import React from "react";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import BlockRender from "@/components/MakeCodeArcade/Blocks/BlockRender";

export default function MakeCodeArcadeBlockDoc({
  blocksJS,
  javascript,
  python,
}: {
  blocksJS: string;
  javascript: string;
  python: string;
}): React.ReactNode {
  return (
    <div>
      <BlockRender js={blocksJS} snippetMode={true} />
      <ThemedSyntaxHighlighter language="js">
        {javascript}
      </ThemedSyntaxHighlighter>
      <ThemedSyntaxHighlighter language="python">
        {python}
      </ThemedSyntaxHighlighter>
    </div>
  );
}
