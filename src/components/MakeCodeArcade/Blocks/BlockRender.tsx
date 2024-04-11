import React from "react";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import { MakeCodeArcadeBlockRendererFunctionsContext } from "@/components/MakeCodeArcade/Blocks/RendererContext";
import { MakeCodeArcadeBlockRendererResult } from "@/components/MakeCodeArcade/Blocks/renderer";
import ClickableFigure from "@/components/Figure/ClickableFigure";
import cyrb53 from "@/scripts/Utils/Hash/CYRB53";

export default function BlockRender({
  js,
  packageId,
  snippetMode,
}: {
  js: string;
  packageId?: string;
  snippetMode?: boolean;
}): React.ReactNode {
  const functions = React.useContext(
    MakeCodeArcadeBlockRendererFunctionsContext,
  );
  const [svg, setSVG] =
    React.useState<MakeCodeArcadeBlockRendererResult | null>(null);

  React.useEffect(() => {
    setSVG(null);
    functions?.renderBlocksToSVG(js, packageId, snippetMode).then((result) => {
      setSVG(result);
    });
  }, [functions, js, packageId, snippetMode]);

  return svg ? (
    <div className="mb-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/*<Image src={svg.uri} width={svg.width} height={svg.height} alt={js} />*/}
      <ClickableFigure
        id={`0x${cyrb53(svg.uri).toString(16)}`}
        src={svg.uri}
        width={svg.width}
        height={svg.height}
        alt={`Block for ${js}`}
        caption={
          <>
            Block for <code>{js}</code>
          </>
        }
      />
    </div>
  ) : (
    <ThemedSyntaxHighlighter language="js">
      {"// Please wait, the block image is loading...\n" + js}
    </ThemedSyntaxHighlighter>
  );
}
