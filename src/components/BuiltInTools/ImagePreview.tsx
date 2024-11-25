import React from "react";

export default function ImagePreview({
  imageBuf,
}: {
  imageBuf?: ArrayBuffer | null;
}): React.ReactNode {
  const [imageSrc, setImageSrc] = React.useState<string | undefined>(undefined);
  const [imageDims, setImageDims] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (imageSrc != null) {
      URL.revokeObjectURL(imageSrc);
    }
    if (!imageBuf) {
      setImageSrc(undefined);
      return;
    }
    const url = URL.createObjectURL(new Blob([imageBuf]));
    setImageSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageBuf]);

  return imageSrc != null ? (
    <>
      <img
        id="input-image-preview"
        className="img-fluid"
        src={imageSrc}
        alt="Preview"
        style={{
          maxWidth: "50vw",
          maxHeight: "50vh",
          imageRendering: "pixelated",
        }}
        onLoad={(e) => {
          setImageDims({
            width: (e.target as HTMLImageElement).naturalWidth,
            height: (e.target as HTMLImageElement).naturalHeight,
          });
        }}
      />
      <br />
      <span className="form-text">
        {imageDims != null && imageBuf != null
          ? `${imageDims.width}x${imageDims.height} px, ${new Intl.NumberFormat().format(Math.round(imageBuf.byteLength / 1024))} kb`
          : undefined}
      </span>
    </>
  ) : (
    <span>
      <em>No image yet.</em>
    </span>
  );
}
