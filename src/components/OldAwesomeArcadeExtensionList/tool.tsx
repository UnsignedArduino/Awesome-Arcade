import { Tool, ToolRef, URLLink } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { AnalyticEvents } from "@/components/Analytics";
import { ClickCountContext } from "@/components/contexts";
import { formatNumber } from "@/scripts/Utils/Numbers";

export function AwesomeArcadeTool({
  tool,
  pad,
}: {
  tool: Tool;
  pad?: boolean | undefined;
}): JSX.Element {
  const [showCardLink, setShowCardLink] = React.useState(false);
  const [tooltip, setTooltip] = React.useState("Click to open");
  const tippyRef = React.useRef<any>();
  const tipRef = React.useRef<any | undefined>();
  const urlRef = React.useRef<HTMLAnchorElement | null>(null);

  React.useEffect(() => {
    import("tippy.js").then((tippy) => {
      tippyRef.current = tippy;
      if (
        urlRef.current != undefined &&
        tippyRef.current != undefined &&
        tipRef.current == undefined
      ) {
        tipRef.current = tippyRef.current.default(urlRef.current, {
          content: tooltip,
          hideOnClick: false,
          onHidden: () => {
            setTooltip("Click to open");
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
      if (urlRef.current != undefined && tippyRef.current != undefined) {
        tipRef.current = tippyRef.current.default(urlRef.current, {
          content: tooltip,
          hideOnClick: false,
          onHidden: () => {
            setTooltip("Click to open");
          },
        });
      }
    }
  }, [tooltip]);

  const clickCounts = React.useContext(ClickCountContext);
  const [clickCount, setClickCount] = React.useState("");

  React.useEffect(() => {
    if (clickCounts != undefined) {
      setClickCount(formatNumber(clickCounts[tool.repo]));
    } else {
      setClickCount("");
    }
  }, [clickCounts, tool.repo]);

  const onURLClick = () => {
    window.document.documentElement.dispatchEvent(
      new CustomEvent<string>("clicktool", {
        detail: tool.repo,
      })
    );
    AnalyticEvents.sendAwesomeClick(tool.repo);
  };

  return (
    <div className={`card ${pad ? "mb-2" : ""} h-100`} id={tool.repo}>
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
          {tool.title}
          {showCardLink ? (
            <Link
              className="ms-1"
              href={`/#${tool.repo}`}
              onClick={smoothScrollHash}
            >
              <i className="bi-link-45deg" />
            </Link>
          ) : undefined}
        </h5>
        <h6 className="card-subtitle mb-2 ttool-body-secondary">
          Made by{" "}
          <a
            href={`https://github.com/${tool.author}`}
            target="_blank"
            rel="noopener noreferer"
          >
            {tool.author}
          </a>
        </h6>
        <>
          Access this tool at:
          <blockquote className="border-start border-secondary border-2 ps-3 mt-1 mb-2">
            <a
              className="text-start"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ wordBreak: "break-all" }}
              ref={urlRef}
              onClick={() => {
                onURLClick();
              }}
              onAuxClick={(e) => {
                if (e.button == 1) {
                  onURLClick();
                }
              }}
            >
              {tool.url}
            </a>
            <span hidden={clickCount === "0"}>
              {" "}
              <small>
                <span className="badge text-bg-secondary">
                  {clickCount != undefined && clickCount.length > 0 ? (
                    <>
                      {clickCount}
                      <span className="visually-hidden"> clicks</span>
                    </>
                  ) : (
                    <span
                      className="placeholder-glow align-middle d-inline-block align-top"
                      style={{
                        position: "relative",
                        top: "-0.2em",
                        height: "0.8em",
                      }}
                    >
                      <span
                        className="placeholder align-top d-inline-block"
                        style={{ width: "1.5em" }}
                      />
                    </span>
                    // <div
                    //   className="spinner-border"
                    //   style={{ width: "0.5rem", height: "0.5rem" }}
                    //   role="status"
                    // >
                    //   <span className="visually-hidden">Loading...</span>
                    // </div>
                  )}
                </span>
              </small>
            </span>
          </blockquote>
        </>
        <div
          className="card-ttool"
          dangerouslySetInnerHTML={{ __html: tool.description }}
        />
        <ul className="list-inline mb-0">
          {tool.links.map((link: URLLink) => {
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
        {tool.forks != undefined && tool.forks.length > 0 ? (
          <div className="mt-3">
            <div className="alert alert-primary mb-0" role="alert">
              There {tool.forks.length === 1 ? "is" : "are"}{" "}
              <b>{tool.forks.length}</b> fork
              {tool.forks.length !== 1 ? "s" : ""} available:
              <ul>
                {tool.forks.map((t: ToolRef) => {
                  return (
                    <li key={t.repo}>
                      <Link href={`/#${t.repo}`} onClick={smoothScrollHash}>
                        {t.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
        {tool.depreciatedBy != undefined && tool.depreciatedBy.length > 0 ? (
          <div className="mt-3">
            <div className="alert alert-warning mb-0" role="alert">
              This tool is depreciated by <b>{tool.depreciatedBy.length}</b>{" "}
              other tool{tool.depreciatedBy.length !== 1 ? "s" : ""}:
              <ul>
                {tool.depreciatedBy.map((t: ToolRef) => {
                  return (
                    <li key={t.repo}>
                      <Link href={`/#${t.repo}`} onClick={smoothScrollHash}>
                        {t.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
        {tool.inBeta != undefined ? (
          <div className="mt-3">
            <div className="alert alert-warning mb-0" role="alert">
              This tool is in beta since <b>{tool.inBeta.since}</b> because:
              <br />
              {tool.inBeta.text}
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}

export function AwesomeArcadeToolGroup({
  title,
  description,
  tools,
  pad,
}: {
  title?: JSX.Element | undefined;
  description?: JSX.Element | undefined;
  tools: Tool[];
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={pad == undefined || pad ? "mb-3" : ""}>
      {title}
      {description}
      {tools.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {tools.map((tool, i) => {
            return (
              <div className="col py-3" key={tool.repo}>
                <AwesomeArcadeTool tool={tool} pad={i < tools.length - 1} />
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
