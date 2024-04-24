// noinspection XmlDeprecatedElement

import React from "react";
import inContextualEditor from "@/scripts/Utils/In/ContextualEditingMode";

export default function MakeCodeArcadeProjectCode({
  id,
}: {
  id: string;
}): React.ReactNode {
  const inEditor = inContextualEditor();

  const [showCode, setShowCode] = React.useState(!inEditor);

  function onContextualEditingPostAssist(event: CustomEvent) {
    if (event.detail === "showall") {
      setShowCode(true);
    } else if (event.detail === "hideall") {
      setShowCode(false);
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
      {inEditor && (
        <>
          <button
            className="btn btn-sm btn-primary mb-2"
            onClick={() => {
              setShowCode(!showCode);
            }}
          >
            {showCode ? "Hide" : "Show"} code
          </button>
          {!showCode && (
            <p>
              <i>The blank space below is reserved for the code.</i>
            </p>
          )}
        </>
      )}
      <div
        className="mb-2"
        style={{
          position: "relative",
          height: "calc(300px + 5em)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {showCode && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={`https://arcade.makecode.com/---codeembed#pub:${id}`}
            allowFullScreen={true}
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </>
  );
}
