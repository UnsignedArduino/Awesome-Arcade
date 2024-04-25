// noinspection XmlDeprecatedElement

import React from "react";
import inContextualEditor from "@/scripts/Utils/In/ContextualEditingMode";

export default function MakeCodeArcadeProjectEditor({
  id,
}: {
  id: string;
}): React.ReactNode {
  const inEditor = inContextualEditor();

  const [showEditor, setShowEditor] = React.useState(!inEditor);

  function onContextualEditingPostAssist(event: CustomEvent) {
    if (event.detail === "showall") {
      setShowEditor(true);
    } else if (event.detail === "hideall") {
      setShowEditor(false);
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
              setShowEditor(!showEditor);
            }}
          >
            {showEditor ? "Hide" : "Show"} editor
          </button>
          {!showEditor && (
            <p>
              <i>The blank space below is reserved for the editor.</i>
            </p>
          )}
        </>
      )}
      <div
        className="mb-2"
        style={{
          position: "relative",
          height: 0,
          paddingBottom: "50vh",
          overflow: "hidden",
        }}
      >
        {showEditor && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50vh",
            }}
            src={`https://arcade.makecode.com/#pub:${id}`}
            frameBorder="0"
            sandbox="allow-popups allow-forms allow-scripts allow-same-origin"
          />
        )}
      </div>
    </>
  );
}
