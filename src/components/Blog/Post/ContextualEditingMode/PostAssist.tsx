import React from "react";
import inContextualEditor from "@/scripts/Utils/In/ContextualEditingMode";
import AutoLink from "@/components/Linkable/AutoLink";

export type ContextualEditingPostAssistEvents = "showall" | "hideall";

declare global {
  interface HTMLElementEventMap {
    contextualeditingpostassist: CustomEvent<ContextualEditingPostAssistEvents>;
  }
}

export default function ContextualEditingPostAssist(): React.ReactNode {
  const inEditor = inContextualEditor();

  return (
    <>
      {inEditor && (
        <>
          <div className="alert alert-info" role="alert">
            <p>
              In contextual editing mode. Extra buttons are given to show or
              hide processor-heavy features during editing for performance.
            </p>
            <span>Dispatch event:</span>
            <br />
            <button
              className="btn btn-sm btn-primary mt-2 me-2"
              onClick={() => {
                window.document.documentElement.dispatchEvent(
                  new CustomEvent<ContextualEditingPostAssistEvents>(
                    "contextualeditingpostassist",
                    {
                      detail: "showall",
                    },
                  ),
                );
              }}
            >
              Show all
            </button>
            <button
              className="btn btn-sm btn-primary mt-2 me-2"
              onClick={() => {
                window.document.documentElement.dispatchEvent(
                  new CustomEvent<ContextualEditingPostAssistEvents>(
                    "contextualeditingpostassist",
                    {
                      detail: "hideall",
                    },
                  ),
                );
              }}
            >
              Hide all
            </button>
          </div>
          <div className="alert alert-info" role="alert">
            <p>In contextual editing mode. Here are some helpful links:</p>
            {(() => {
              const links = [
                "https://arcade.makecode.com/blocks-embed",
                "https://makecode.com/writing-docs/snippets#package",
              ];

              return (
                <ul>
                  {links.map((link) => (
                    <li key={link}>
                      <AutoLink href={link}>{link}</AutoLink>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
        </>
      )}
    </>
  );
}
