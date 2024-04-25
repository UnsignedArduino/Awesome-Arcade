import React from "react";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import { MakeCodeArcadeBlockRendererFunctionsContext } from "@/components/MakeCodeArcade/Blocks/RendererContext";
import { MakeCodeArcadeBlockRendererResult } from "@/components/MakeCodeArcade/Blocks/renderer";
import ClickableFigure from "@/components/Images/ClickableFigure";
import cyrb53 from "@/scripts/Utils/Hash/CYRB53";
import inContextualEditor from "@/scripts/Utils/In/ContextualEditingMode";

export default function BlockRender({
  js,
  packageId,
  snippetMode,
}: {
  js: string;
  packageId?: string;
  snippetMode?: boolean;
}): React.ReactNode {
  const inEditor = inContextualEditor();

  const functions = React.useContext(
    MakeCodeArcadeBlockRendererFunctionsContext,
  );
  const [svg, setSVG] =
    React.useState<MakeCodeArcadeBlockRendererResult | null>(null);
  const [showBlocks, setShowBlocks] = React.useState(!inEditor);
  const [isRendering, setIsRendering] = React.useState(false);

  React.useEffect(() => {
    setSVG(null);
    if (!showBlocks) {
      return;
    }
    setIsRendering(true);
    setTimeout(() => {
      functions
        ?.renderBlocksToSVG(js, packageId, snippetMode)
        .then((result) => {
          setSVG(result);
          setIsRendering(false);
        });
    }, 100);
  }, [showBlocks, functions, js, packageId, snippetMode]);

  function onContextualEditingPostAssist(event: CustomEvent) {
    if (event.detail === "showall") {
      setShowBlocks(true);
    } else if (event.detail === "hideall") {
      setShowBlocks(false);
    }
  }

  React.useEffect(() => {
    window.document.documentElement.addEventListener(
      "contextualeditingpostassist",
      onContextualEditingPostAssist,
    );

    return () => {
      window.document.documentElement.removeEventListener(
        "contextualeditingpostassist",
        onContextualEditingPostAssist,
      );
    };
  }, []);

  return (
    <>
      {svg ? (
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
        <div className="mb-3">
          <ThemedSyntaxHighlighter
            language="js"
            style={{ marginBottom: "0px" }}
          >
            {(isRendering
              ? "// Please wait, the blocks are loading...\n"
              : inEditor && "// Click button below to show blocks\n") + js}
          </ThemedSyntaxHighlighter>
        </div>
      )}
      {inEditor && (
        <button
          className="btn btn-sm btn-primary mt-0 mb-2"
          disabled={isRendering}
          onClick={() => {
            setShowBlocks(!showBlocks);
          }}
        >
          {isRendering
            ? "Loading..."
            : showBlocks
              ? "Hide blocks"
              : "Show blocks"}
        </button>
      )}
    </>
  );
}
