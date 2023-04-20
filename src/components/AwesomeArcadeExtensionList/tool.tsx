import { Tool, URLLink } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";

export function AwesomeArcadeTool({
  tool,
  pad,
}: {
  tool: Tool;
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={`card ${pad ? "mb-2" : ""} h-100`} id={tool.repo}>
      <div className="card-body">
        <h5 className="card-title">{tool.title}</h5>
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
            >
              {tool.url}
            </a>
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
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {tools.map((tool, i) => {
          return (
            <div className="col" key={tool.repo}>
              <AwesomeArcadeTool tool={tool} pad={i < tools.length - 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
