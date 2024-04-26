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
  const [blockStatus, setBlockStatus] = React.useState<
    "waiting" | "loading" | "loaded" | "error"
  >("loading");

  React.useEffect(() => {
    setSVG(null);
    setBlockStatus("waiting");
    if (!showBlocks) {
      return;
    }
    setBlockStatus("loading");
    functions
      ?.renderBlocksToSVG(js, packageId, snippetMode)
      .then((result) => {
        setSVG(result);
        setBlockStatus("loaded");
      })
      .catch(() => {
        setBlockStatus("error");
      });
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
            {(() => {
              return {
                waiting: "",
                loading: "// Loading blocks...\n",
                loaded: "",
                error: "// Error loading blocks.\n",
              }[blockStatus];
            })() + js}
          </ThemedSyntaxHighlighter>
        </div>
      )}
      {inEditor && (
        <button
          className="btn btn-sm btn-primary mt-0 mb-2"
          disabled={blockStatus === "loading"}
          onClick={() => {
            setShowBlocks(!showBlocks);
          }}
        >
          {blockStatus === "loading"
            ? "Loading..."
            : showBlocks
              ? "Hide blocks"
              : "Show blocks"}
        </button>
      )}
    </>
  );
}
