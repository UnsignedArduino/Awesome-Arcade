import React from "react";

export default function MakeCodeArcadeProjectSimulator({
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
      ></iframe>
    </div>
  );
}
