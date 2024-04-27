import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";
import { AnalyticEvents } from "@/components/Analytics";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import { Tool, ToolRef, URLLink } from "@/scripts/FetchListsFromCMS/types";
import { RichTextSectionRenderer } from "@/components/Blog/Elements";

export function AwesomeArcadeTool({
  tool,
  highlight,
  pad,
}: {
  tool: Tool;
  highlight?: boolean | undefined;
  pad?: boolean | undefined;
}): React.ReactNode {
  const [showCardLink, setShowCardLink] = React.useState(false);

  return (
    <div
      className={`card ${pad ? "mb-2" : ""} ${
        highlight ? "border-primary border-3" : ""
      } h-100`}
      id={tool.repo}
    >
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
          {tool.notAWebsite ? (
            <>
              {" "}
              <span className="badge text-bg-warning me-1">Not a website</span>
            </>
          ) : undefined}
          {showCardLink ? (
            <Link
              className="ms-1"
              href={`/tools#${tool.repo}`}
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
          Access this{" "}
          {tool.notAWebsite ? (
            <>
              <b>not-browser based</b>{" "}
            </>
          ) : null}
          tool at:
          <blockquote className="border-start border-secondary border-2 ps-3 mt-1 mb-2">
            <Tippy content="Click to open in a new tab!">
              <a
                className="text-start"
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ wordBreak: "break-all" }}
                onClick={() => {
                  AnalyticEvents.sendAwesomeClick(tool.repo);
                }}
              >
                {tool.url}
              </a>
            </Tippy>
          </blockquote>
        </>
        <div className="card-text">
          <RichTextSectionRenderer content={tool.description} />
        </div>
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
                      <Link
                        href={`/tools#${t.repo}`}
                        onClick={smoothScrollHash}
                      >
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
                      <Link
                        href={`/tools#${t.repo}`}
                        onClick={smoothScrollHash}
                      >
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
  title?: React.ReactNode | undefined;
  description?: React.ReactNode | undefined;
  tools: Tool[];
  pad?: boolean | undefined;
}): React.ReactNode {
  const router = useRouter();

  const [toolToHighlight, setToolToHighlight] = React.useState<
    string | undefined
  >(undefined);

  const onHashChange = (e?: HashChangeEvent | undefined) => {
    const repo = e
      ? e.newURL.split("#")[1]
      : window.location.hash.replaceAll("#", "");
    console.log(`Changing tool to highlight ${repo}`);
    setToolToHighlight(repo);
  };

  React.useEffect(() => {
    setTimeout(() => {
      onHashChange();
    });

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      onHashChange();
    });

    return () =>
      router.events.off("routeChangeComplete", () => {
        onHashChange();
      });
  }, [router.events]);

  return (
    <div className={pad == undefined || pad ? "mb-3" : ""}>
      {title}
      {description}
      {tools.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {tools.map((tool, i) => {
            return (
              <div className="col py-3" key={tool.repo}>
                <AwesomeArcadeTool
                  tool={tool}
                  highlight={tool.repo === toolToHighlight}
                  pad={i < tools.length - 1}
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
