import {
  Extension,
  ExtensionRef,
  URLLink,
} from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import { TippyJSLibContext } from "@/pages/_app";
import { Instance } from "tippy.js";
import { motion } from "framer-motion";
import HashLink from "@/components/Linkable/HashLink";
import { ShareButton } from "@/components/Linkable/ShareButton";
import { AnalyticEvents } from "@/components/Analytics";
import {
  RichTextSectionRenderer,
  ShortAuthorRenderer,
} from "@/components/Blog/Elements";
import { copyTextToClipboard } from "@/scripts/Utils/Clipboard";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";

export function AwesomeArcadeExtensionOldCard({
  ext,
  highlight,
}: {
  ext: Extension;
  highlight?: boolean | undefined;
}): React.ReactNode {
  const tippyJSLib = React.useContext(TippyJSLibContext);
  const [showCardActions, setShowCardActions] = React.useState(false);
  const [tooltip, setTooltip] = React.useState("Click to copy");
  const tippyRef = React.useRef<Instance | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (tippyJSLib !== null && buttonRef.current !== null) {
      if (tippyRef.current !== null) {
        tippyRef.current.setContent(tooltip);
      } else {
        tippyRef.current = tippyJSLib.default(buttonRef.current, {
          content: tooltip,
        });
      }
    }
  }, [tippyJSLib, tooltip]);

  return (
    <motion.div
      id={ext.repo}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <>
        <h2
          className=""
          onMouseEnter={() => {
            setShowCardActions(true);
          }}
          onMouseLeave={() => {
            setShowCardActions(false);
          }}
        >
          {ext.title}
          {ext.javascriptOnly ? (
            <>
              {" "}
              <span className="badge text-bg-warning ms-2 me-1">
                JavaScript only
              </span>
            </>
          ) : undefined}
          {showCardActions ? (
            <>
              <HashLink url={`/extensions#${ext.repo}`} />
              <ShareButton
                data={{
                  text: `Check out the extension ${ext.title} by ${ext.author} on Awesome Arcade!`,
                  url: `/extensions#${ext.repo}`,
                }}
                onClick={() => {
                  AnalyticEvents.sendShare("extension", ext.repo);
                }}
              />
            </>
          ) : undefined}
        </h2>
        <p className="mt-0 mb-1">
          Made by <ShortAuthorRenderer author={ext.author} />
        </p>
        <>
          Import this{" "}
          {ext.javascriptOnly ? (
            <>
              <b>JavaScript only</b>{" "}
            </>
          ) : null}
          extension with the URL:
          <blockquote className="border-start border-secondary border-2 mt-1 mb-2">
            {/* This transform is applied so the stretched-link only applies up to this div */}
            <div style={{ transform: "rotate(0)" }}>
              <button
                type="button"
                className="btn text-start"
                style={{ wordBreak: "break-all" }}
                ref={buttonRef}
                onMouseEnter={() => {
                  setTooltip("Click to copy");
                }}
                onClick={() => {
                  copyTextToClipboard(ext.url)
                    .then(() => {
                      setTooltip("Copied!");
                    })
                    .catch(() => {
                      setTooltip(
                        "Failed to copy - did you give us clipboard permission?",
                      );
                    });
                  tippyRef.current?.show();
                  window.document.documentElement.dispatchEvent(
                    new CustomEvent<string>("clickrepo", {
                      detail: ext.repo,
                    }),
                  );
                  AnalyticEvents.sendAwesomeClick("extension", ext.repo);
                }}
              >
                <a className="stretched-link">{ext.url}</a>
              </button>
            </div>
          </blockquote>
        </>
        <>
          <RichTextSectionRenderer content={ext.description} />
        </>
        <ul className="list-inline mb-0">
          {ext.links.map((link: URLLink, i: number) => {
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
                {i < ext.links.length - 1 && <span>|</span>}
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
                      <Link
                        href={`/extensions#${e.repo}`}
                        onClick={smoothScrollHash}
                      >
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
              This extension is deprecated by <b>{ext.depreciatedBy.length}</b>{" "}
              other extension
              {ext.depreciatedBy.length !== 1 ? "s" : ""}:
              <ul>
                {ext.depreciatedBy.map((e: ExtensionRef) => {
                  return (
                    <li key={e.repo}>
                      <Link
                        href={`/extensions#${e.repo}`}
                        onClick={smoothScrollHash}
                      >
                        {e.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
        {ext.inBeta != undefined ? (
          <div className="mt-3">
            <div className="alert alert-warning mb-0" role="alert">
              This extension is in beta since <b>{ext.inBeta.since}</b> because:
              <br />
              {ext.inBeta.text}
            </div>
          </div>
        ) : undefined}
      </>
    </motion.div>
  );
}
