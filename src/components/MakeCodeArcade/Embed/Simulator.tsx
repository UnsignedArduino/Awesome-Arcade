// noinspection XmlDeprecatedElement

import React from "react";
import inContextualEditor from "@/scripts/Utils/In/ContextualEditingMode";

export default function MakeCodeArcadeProjectSimulator({
  id,
}: {
  id: string;
}): React.ReactNode {
  const inEditor = inContextualEditor();

  const [showSim, setShowSim] = React.useState(!inEditor);

  function onContextualEditingPostAssist(event: CustomEvent) {
    if (event.detail === "showall") {
      setShowSim(true);
    } else if (event.detail === "hideall") {
      setShowSim(false);
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
              setShowSim(!showSim);
            }}
          >
            {showSim ? "Hide" : "Show"} simulator
          </button>
        </>
      )}
      {showSim && (
        <div
          className="mb-2"
          style={{
            position: "relative",
            height: 0,
            paddingBottom: "calc(min(100%, 364px))",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "calc(min(100%, 309px))",
              height: "calc(min(100%, 364px))",
            }}
            src={`https://arcade.makecode.com/---run?id=${id}`}
            allowFullScreen={true}
            sandbox="allow-popups allow-forms allow-scripts allow-same-origin"
            frameBorder="0"
          />
        </div>
      )}
    </>
  );
}
