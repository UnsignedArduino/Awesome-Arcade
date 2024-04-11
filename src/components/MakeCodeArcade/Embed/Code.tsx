import React from "react";

export default function MakeCodeArcadeProjectCode({
  id,
}: {
  id: string;
}): React.ReactNode {
  return (
    <div
      className="mb-2"
      style={{
        position: "relative",
        height: "calc(300px + 5em)",
        width: "100%",
        overflow: "hidden",
      }}
    >
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
      ></iframe>
    </div>
  );
}
