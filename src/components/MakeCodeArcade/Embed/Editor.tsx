import React from "react";

export default function MakeCodeArcadeProjectEditor({
  id,
}: {
  id: string;
}): React.ReactNode {
  return (
    <div
      className="mb-2"
      style={{
        position: "relative",
        height: 0,
        paddingBottom: "50vh",
        overflow: "hidden",
      }}
    >
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
      ></iframe>
    </div>
  );
}
