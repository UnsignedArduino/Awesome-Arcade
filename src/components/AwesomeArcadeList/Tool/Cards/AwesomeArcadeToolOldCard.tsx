import { Tool, ToolRef, URLLink } from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import { motion } from "framer-motion";
import HashLink from "@/components/Linkable/HashLink";
import { ShareButton } from "@/components/Linkable/ShareButton";
import { AnalyticEvents } from "@/components/Analytics";
import {
  RichTextSectionRenderer,
  ShortAuthorRenderer,
} from "@/components/Blog/Elements";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";

export function AwesomeArcadeToolOldCard({
  tool,
  highlight,
}: {
  tool: Tool;
  highlight?: boolean | undefined;
}): React.ReactNode {
  const [showCardActions, setShowCardActions] = React.useState(false);

  return (
    <motion.div
      id={tool.repo}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <>
        <h2
          className="card-title d-flex align-items-center"
          onMouseEnter={() => {
            setShowCardActions(true);
          }}
          onMouseLeave={() => {
            setShowCardActions(false);
          }}
        >
          {tool.title}
          {tool.notAWebsite ? (
            <>
              {" "}
              <span className="badge text-bg-warning ms-2 me-1">
                Not a website
              </span>
            </>
          ) : undefined}
          {showCardActions ? (
            <>
              <HashLink url={`/tools#${tool.repo}`} />
              <ShareButton
                data={{
                  text: `Check out the tool ${tool.title} by ${tool.author} on Awesome Arcade!`,
                  url: `/tools#${tool.repo}`,
                }}
                onClick={() => {
                  AnalyticEvents.sendShare("tool", tool.repo);
                }}
              />
            </>
          ) : undefined}
        </h2>
        <p className="mt-0 mb-1">
          Made by <ShortAuthorRenderer author={tool.author} />
        </p>
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
                  AnalyticEvents.sendAwesomeClick("tool", tool.repo);
                }}
              >
                {tool.url}
              </a>
            </Tippy>
          </blockquote>
        </>
        <>
          <RichTextSectionRenderer content={tool.description} />
        </>
        <ul className="list-inline mb-0">
          {tool.links.map((link: URLLink, i: number) => {
            return (
              <li key={link.url} className="list-inline-item">
                <a
                  href={link.url}
                  className="me-2"
                  // style={{ whiteSpace: "nowrap" }}
                  target="_blank"
                  rel="noopener noreferer"
                >
                  {link.label != undefined ? link.label : link.url}
                </a>
                {i < tool.links.length - 1 && <span>|</span>}
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
      </>
    </motion.div>
  );
}
