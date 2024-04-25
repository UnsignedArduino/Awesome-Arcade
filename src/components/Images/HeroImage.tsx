import React from "react";

export default function HeroImage({
  image,
  alt,
}: {
  image: string | undefined;
  alt: string;
}): React.ReactNode {
  return (
    <div
      className="container-fluid px-0 mb-2"
      style={{
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "50vh",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="figure-img img-fluid rounded"
        style={{
          width: "100%",
          objectFit: "cover",
          maxHeight: "50vh",
        }}
        src={image}
        alt={alt}
      />
    </div>
  );
}
