import React from "react";
import AutoLink from "@/components/Linkable/AutoLink";
import {
  copyTextToClipboard,
  readBlobsFromClipboard,
} from "@/scripts/Utils/Clipboard";
import {
  loadingNotify,
  NotificationType,
  notify,
} from "@/components/Notifications";
import getElement from "@/scripts/Utils/Element";
import ImagePreview from "@/components/BuiltInTools/ImagePreview";
import PaletteEditor from "@/components/BuiltInTools/PaletteEditor";
import { makeNaNUndefined } from "@/scripts/Utils/TypeHelp/NullUndefined";
import { LoadingNotifyReturn } from "@/components/Notifications/notifications";

export type ImageImporterToolInput = {
  width?: number | undefined;
  height?: number | undefined;
  palette?: string | undefined;
  gif?: boolean | undefined;
};

// TODO: FIX GIFS
//  https://pyscript.com/@ckyiu/image-to-makecode-arcade/latest?files=main.py,index.html
export default function ImageImporterTool(): React.ReactNode {
  const [inputBuf, setInputBuf] = React.useState<ArrayBuffer | null>(null);

  const [options, setOptions] = React.useState<ImageImporterToolInput>({
    width: undefined,
    height: undefined,
    palette: undefined,
    gif: undefined,
  });

  const [outputCode, setOutputCode] = React.useState<string | null>(null);
  const [outputBuf, setOutputBuf] = React.useState<ArrayBuffer | null>(null);

  const [iframeReady, setIframeReady] = React.useState(false);
  const notifyCbs = React.useRef<LoadingNotifyReturn | null>();

  const handleMessage = React.useCallback((e: MessageEvent) => {
    let data = e.data;
    console.log("Received message from iframe");
    if (e.origin !== "https://ckyiu.pyscriptapps.com") {
      console.warn("Received message from unknown origin", e.origin);
      return;
    }
    if (data === "ready") {
      setIframeReady(true);
      return;
    }
    try {
      data = JSON.parse(data);
      setOutputCode(data.output_image_code);
      setOutputBuf(Buffer.from(data.output_preview_img, "base64"));
      setIframeReady(true);
      notifyCbs.current?.successCallback();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            // @ts-ignore
            `Converting image of size ${Math.round(inputBuf?.byteLength / 1024)} kb`,
          );
          console.log(`Using options ${JSON.stringify(options)}`);

          const iframe = getElement("worker-iframe") as HTMLIFrameElement;
          if (iframe.contentWindow) {
            setIframeReady(false);
            setOutputCode(null);
            setOutputBuf(null);
            notifyCbs.current = loadingNotify(
              "Converting image...",
              "Conversion complete!",
              "Failed to convert!",
              "Canceled conversion.",
            );
            setTimeout(() => {
              iframe.contentWindow!.postMessage(
                JSON.stringify({
                  input_image: Buffer.from(inputBuf!).toString("base64"),
                  input_options: JSON.stringify(options),
                }),
                "*",
              );
              console.log("Posted message to iframe");
            });
          } else {
            console.error("Failed to get worker iframe content window");
          }
        }}
      >
        <div>
          <div className="row">
            <label htmlFor="image-input" className="form-label">
              Input image
            </label>
          </div>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="file"
                id="image-input"
                onChange={(e) => {
                  setInputBuf(null);
                  // @ts-ignore
                  const firstFile = e.target.files.item(0);
                  if (firstFile) {
                    firstFile
                      .arrayBuffer()
                      .then((buf) => {
                        console.log(
                          `Selected file ${firstFile.name} with ${buf.byteLength} bytes`,
                        );
                        setInputBuf(buf);
                        notify(
                          `Selected file ${firstFile.name}, size ${new Intl.NumberFormat().format(Math.round(buf.byteLength / 1024))} kb`,
                          NotificationType.Success,
                        );
                      })
                      .catch(() => {
                        console.log(
                          "Failed to get file, either cancelled or error",
                        );
                        notify("Error selecting file", NotificationType.Error);
                      });
                  }
                }}
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setInputBuf(null);
                  // @ts-ignore
                  (getElement("image-input") as HTMLInputElement).value = null;
                  readBlobsFromClipboard()
                    .then((items) => {
                      const validMIMETypes = [
                        "image/png",
                        "image/jpeg",
                        "image/gif",
                        "image/bmp",
                        "image/webp",
                      ];
                      for (const item of items) {
                        for (const validMIMEType of validMIMETypes) {
                          if (item.types.includes(validMIMEType)) {
                            item
                              .getType(validMIMEType)
                              .then((blob) => {
                                return blob.arrayBuffer();
                              })
                              .then((buf) => {
                                setInputBuf(buf);
                                console.log(
                                  `Read image from clipboard with ${buf.byteLength} bytes`,
                                );
                                notify(
                                  `Read image from clipboard, size ${new Intl.NumberFormat().format(Math.round(buf.byteLength / 1024))} kb`,
                                  NotificationType.Success,
                                );
                              })
                              .catch(() => {
                                notify(
                                  "Failed to read from clipboard",
                                  NotificationType.Error,
                                );
                                console.log("Failed to read from clipboard");
                              });
                            return;
                          }
                        }
                      }
                      console.log("Did not find image in clipboard");
                      notify(
                        "No image found in clipboard",
                        NotificationType.Info,
                      );
                    })
                    .catch(() => {
                      notify(
                        "Failed to read from clipboard",
                        NotificationType.Error,
                      );
                      console.log("Failed to read from clipboard");
                    });
                }}
              >
                Read from clipboard
              </button>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <span className="form-text">
                Click the choose file button to open a file picker, drag an
                image onto the choose file button above, or have an image copied
                in your clipboard and press the read from clipboard button.
              </span>
              <br />
              <span className="form-text">
                Many common image formats are supported, such as PNG, JPEG, GIF,
                BMP, and more. Check out{" "}
                <AutoLink href="https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html">
                  this link
                </AutoLink>{" "}
                to see all supported formats.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Input preview</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <ImagePreview imageBuf={inputBuf} />
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col">
              <label className="form-label">Options</label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="input-group">
                <span className="input-group-text" id="width-label">
                  Width
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="width-input"
                  min={1}
                  aria-label="Width"
                  aria-describedby="width-label"
                  placeholder="Leave blank to auto-calculate from height and keep aspect ratio"
                  onChange={(e) => {
                    setOptions({
                      ...options,
                      width: makeNaNUndefined(parseInt(e.target.value.trim())),
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group">
                <span className="input-group-text" id="height-label">
                  Height
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="height-input"
                  min={1}
                  aria-label="Height"
                  aria-describedby="height-label"
                  placeholder="Leave blank to auto-calculate from width and keep aspect ratio"
                  onChange={(e) => {
                    setOptions({
                      ...options,
                      height: makeNaNUndefined(parseInt(e.target.value.trim())),
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <span className="form-text">
                Leave both blank to use the input image{"'"}s original size.
                Remember the maximum MakeCode Arcade image size is 512x512!
              </span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <PaletteEditor
                palette={options.palette}
                setPalette={(p) => {
                  setOptions({ ...options, palette: p });
                }}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="gif-checkbox"
                  onChange={(e) => {
                    setOptions({
                      ...options,
                      gif: e.target.checked ? true : undefined,
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="gif-checkbox">
                  Try parsing GIF to image array/animation (experimental)
                </label>
              </div>
            </div>
          </div>
        </div>
        {/*<pre>{JSON.stringify(options, null, 2)}</pre>*/}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            inputBuf == null || inputBuf.byteLength == 0 || !iframeReady
          }
        >
          Convert
        </button>
      </form>
      <div className="mt-3">
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="output-code" className="form-label">
              Output MakeCode Arcade image code
            </label>
            <textarea
              id="output-code"
              className="form-control"
              style={{ fontFamily: "monospace" }}
              placeholder="No image code generated yet."
              rows={10}
              readOnly
              value={outputCode ?? ""}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={outputCode == null || outputCode.length == 0}
              onClick={() => {
                copyTextToClipboard(outputCode!)
                  .then(() => {
                    notify(
                      "Copied image code to clipboard",
                      NotificationType.Success,
                    );
                  })
                  .catch(() => {
                    notify(
                      "Failed to copy image code to clipboard",
                      NotificationType.Error,
                    );
                  });
              }}
            >
              Copy all to clipboard
            </button>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="output-image" className="form-label">
              Output image preview
            </label>
            <br />
            <span className="form-text">
              When converting GIF animations, only the first frame is previewed
              below.
            </span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <ImagePreview imageBuf={outputBuf} />
          </div>
        </div>
        <br />
      </div>
      <div>
        <iframe
          src="https://ckyiu.pyscriptapps.com/image-to-makecode-arcade/latest/"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          style={{ width: "50vw", height: "50vh" }}
          id="worker-iframe"
        />
        <br />
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            const iframe = getElement("worker-iframe") as HTMLIFrameElement;
            const url = iframe.src;
            iframe.src = "";
            setTimeout(() => {
              iframe.src = url;
            }, 100);
          }}
        >
          reload iframe
        </button>
        <p>
          iframeReady: <code>{iframeReady.toString()}</code>
        </p>
      </div>
    </div>
  );
}
