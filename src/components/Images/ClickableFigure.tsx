import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import { BootstrapLibContext } from "@/pages/_app";
import Tippy from "@tippyjs/react";

export default function ClickableFigure({
  id,
  src,
  alt,
  caption,
  width,
  height,
  useNormalImage = false,
}: {
  id: string;
  src: string | StaticImport;
  alt: string;
  caption: string | React.ReactNode;
  width?: number;
  height?: number;
  useNormalImage?: boolean;
}) {
  const bootstrapLib = React.useContext(BootstrapLibContext);

  return (
    <>
      <figure className="figure">
        <Tippy content="Click to expand">
          {useNormalImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              id={id}
              className="figure-img img-fluid rounded"
              src={src as string}
              width={width}
              height={height}
              alt={alt}
              onClick={() => {
                if (bootstrapLib !== null) {
                  const modal = bootstrapLib.Modal.getOrCreateInstance(
                    `#${id}Modal`,
                  );
                  modal.show();
                }
              }}
            />
          ) : (
            <Image
              id={id}
              className="figure-img img-fluid rounded"
              style={
                width !== null || height !== null
                  ? undefined
                  : { width: "50%", height: "50%" }
              }
              src={src}
              width={width}
              height={height}
              alt={alt}
              onClick={() => {
                if (bootstrapLib !== null) {
                  const modal = bootstrapLib.Modal.getOrCreateInstance(
                    `#${id}Modal`,
                  );
                  modal.show();
                }
              }}
            />
          )}
        </Tippy>
        <figcaption className="figure-caption">{caption}</figcaption>
      </figure>
      <div
        className="modal fade"
        id={`${id}Modal`}
        tabIndex={-1}
        aria-labelledby={`${id}ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <span className="h1 modal-title fs-5" id={`${id}ModalLabel`}>
                Enlarged image
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <figure className="figure">
                {useNormalImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src as string}
                    className="figure-img img-fluid rounded"
                    alt={alt}
                    width={width}
                    height={height}
                  />
                ) : (
                  <Image
                    src={src}
                    className="figure-img img-fluid rounded"
                    alt={alt}
                    width={width}
                    height={height}
                  />
                )}
                <figcaption className="figure-caption">{caption}</figcaption>
              </figure>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
