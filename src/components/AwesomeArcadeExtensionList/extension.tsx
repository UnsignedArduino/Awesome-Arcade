import {
  Extension,
  ExtensionRef,
  URLLink,
} from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";
import "tippy.js/dist/tippy.css";
import { copyTextToClipboard } from "@/scripts/Utils/Clipboard";
import Link from "next/link";
import { smoothScrollHash } from "@/components/AwesomeArcadeExtensionList/linkableHeader";

export function AwesomeArcadeExtension({
  ext,
  showImportURL,
  pad,
}: {
  ext: Extension;
  showImportURL?: boolean | undefined;
  pad?: boolean | undefined;
}): JSX.Element {
  const [showCardLink, setShowCardLink] = React.useState(false);
  const [tooltip, setTooltip] = React.useState("Click to copy");
  const tippyRef = React.useRef<any>();
  const tipRef = React.useRef<any | undefined>();
  const urlBtnRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    import("tippy.js").then((tippy) => {
      tippyRef.current = tippy;
      if (
        urlBtnRef.current != undefined &&
        tippyRef.current != undefined &&
        tipRef.current == undefined
      ) {
        tipRef.current = tippyRef.current.default(urlBtnRef.current, {
          content: tooltip,
          hideOnClick: false,
          onHidden: () => {
            setTooltip("Click to copy");
          },
        });
      }
    });
  });

  React.useEffect(() => {
    if (tipRef.current != undefined) {
      const t = tipRef.current;
      t.setContent(tooltip);
    } else {
      if (urlBtnRef.current != undefined && tippyRef.current != undefined) {
        tipRef.current = tippyRef.current.default(urlBtnRef.current, {
          content: tooltip,
          hideOnClick: false,
          onHidden: () => {
            setTooltip("Click to copy");
          },
        });
      }
    }
  }, [tooltip]);

  return (
    <div className={`card ${pad ? "mb-2" : ""} h-100`} id={ext.repo}>
      <div className="card-body">
        <h5
          className="card-title"
          onMouseEnter={() => {
            setShowCardLink(true);
          }}
          onMouseLeave={() => {
            setShowCardLink(false);
          }}
        >
          {ext.title}
          {showCardLink ? (
            <Link
              className="ms-1"
              href={`/#${ext.repo}`}
              onClick={smoothScrollHash}
            >
              <i className="bi-link-45deg" />
            </Link>
          ) : undefined}
        </h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Made by{" "}
          <a
            href={`https://github.com/${ext.author}`}
            target="_blank"
            rel="noopener noreferer"
          >
            {ext.author}
          </a>
        </h6>
        {showImportURL == undefined || showImportURL ? (
          <>
            Import this extension with the URL:
            <blockquote className="border-start border-secondary border-2 mt-1 mb-2">
              <button
                type="button"
                className="btn btn-link text-start"
                ref={urlBtnRef}
                style={{ wordBreak: "break-all" }}
                onClick={() => {
                  if (copyTextToClipboard(ext.url)) {
                    setTooltip("Copied!");
                  } else {
                    setTooltip(
                      "Failed to copy - did you give us clipboard permission?"
                    );
                  }
                  tipRef.current.setContent(tooltip);
                }}
              >
                {ext.url}
              </button>
            </blockquote>
          </>
        ) : (
          <></>
        )}
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: ext.description }}
        />
        <ul className="list-inline mb-0">
          {ext.links.map((link: URLLink) => {
            return (
              <li key={link.url} className="list-inline-item">
                <a
                  href={link.url}
                  className="card-link ms-0 me-3"
                  // style={{ whiteSpace: "nowrap" }}
                  target="_blank"
                  rel="noopener noreferer"
                >
                  {link.label != undefined ? link.label : link.url}
                </a>
              </li>
            );
          })}
        </ul>
        {ext.forks != undefined && ext.forks.length > 0 ? (
          <div className="mt-3">
            <div className="alert alert-primary mb-0" role="alert">
              There {ext.forks.length === 1 ? "is" : "are"}{" "}
              <b>{ext.forks.length}</b> fork
              {ext.forks.length !== 1 ? "s" : ""} available:
              <ul>
                {ext.forks.map((e: ExtensionRef) => {
                  return (
                    <li key={e.repo}>
                      <Link href={`/#${e.repo}`} onClick={smoothScrollHash}>
                        {e.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
        {ext.depreciatedBy != undefined && ext.depreciatedBy.length > 0 ? (
          <div className="mt-3">
            <div className="alert alert-warning mb-0" role="alert">
              This extension is depreciated by <b>{ext.depreciatedBy.length}</b>{" "}
              other extension
              {ext.depreciatedBy.length !== 1 ? "s" : ""}:
              <ul>
                {ext.depreciatedBy.map((e: ExtensionRef) => {
                  return (
                    <li key={e.repo}>
                      <Link href={`/#${e.repo}`} onClick={smoothScrollHash}>
                        {e.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}

export function AwesomeArcadeExtensionGroup({
  title,
  description,
  exts,
  showImportURL,
  pad,
}: {
  title?: JSX.Element | undefined;
  description?: JSX.Element | undefined;
  exts: Extension[];
  showImportURL?: boolean | undefined;
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={pad == undefined || pad ? "mb-3" : ""}>
      {title}
      {description}
      {exts.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {exts.map((ext, i) => {
            return (
              <div className="col py-3" key={ext.repo}>
                <AwesomeArcadeExtension
                  ext={ext}
                  showImportURL={showImportURL}
                  pad={i < exts.length - 1}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          Could not find any results with your search query!
        </div>
      )}
    </div>
  );
}
