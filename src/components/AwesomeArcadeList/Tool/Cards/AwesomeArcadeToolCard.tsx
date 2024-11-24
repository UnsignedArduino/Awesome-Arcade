import { Tool, ToolRef, URLLink } from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import { ThemeContext } from "@/components/Navbar/ThemePicker";
import { motion } from "framer-motion";
import { ACCENT_COLOR } from "@/themes/colors";
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

export function AwesomeArcadeToolCard({
  tool,
  highlight,
  pad,
}: {
  tool: Tool;
  highlight?: boolean | undefined;
  pad?: boolean | undefined;
}): React.ReactNode {
  const [showCardActions, setShowCardActions] = React.useState(false);

  const theme = React.useContext(ThemeContext);

  return (
    <motion.div
      className={`card${pad ? " m-1 mb-2" : " "} h-100`}
      id={tool.repo}
      // initial={{ x: 300, opacity: 0 }}
      // animate={{ x: 0, opacity: 1 }}
      animate={
        highlight
          ? {
              borderWidth: "3px",
              borderColor: ACCENT_COLOR[theme],
            }
          : {
              borderWidth: "1px",
              borderColor:
                theme === "Light"
                  ? "rgba(0, 0, 0, 0.176)"
                  : "rgba(255,255,255,0.15)",
            }
      }
      // whileHover={{ scale: 1.01 }}
      // whileTap={{ scale: 0.99 }}
      // exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="card-body">
        <h5
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
        </h5>
        <h6 className="card-subtitle mb-2 ttool-body-secondary">
          Made by <ShortAuthorRenderer author={tool.author} />
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
                  AnalyticEvents.sendAwesomeClick("tool", tool.repo);
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
                        href={`/src/pages/tools/index.tsx#${t.repo}`}
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
                        href={`/src/pages/tools/index.tsx#${t.repo}`}
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
    </motion.div>
  );
}
