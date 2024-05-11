import {
  Extension,
  ExtensionRef,
  URLLink,
} from "@/scripts/FetchListsFromCMS/types";
import React from "react";
import { TippyJSLibContext } from "@/pages/_app";
import { Instance } from "tippy.js";
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
import { copyTextToClipboard } from "@/scripts/Utils/Clipboard";
import Link from "next/link";
import { smoothScrollHash } from "@/components/Linkable/Header";

export function AwesomeArcadeExtensionCard({
  ext,
  highlight,
  pad,
}: {
  ext: Extension;
  highlight?: boolean | undefined;
  pad?: boolean | undefined;
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

  const theme = React.useContext(ThemeContext);

  return (
    <motion.div
      className={`card ${pad ? "m-1 mb-2" : ""} h-100`}
      id={ext.repo}
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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
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
        </h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Made by <ShortAuthorRenderer author={ext.author} />
        </h6>
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
                  if (copyTextToClipboard(ext.url)) {
                    setTooltip("Copied!");
                  } else {
                    setTooltip(
                      "Failed to copy - did you give us clipboard permission?",
                    );
                  }
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
        <div className="card-text">
          <RichTextSectionRenderer content={ext.description} />
        </div>
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
      </div>
    </motion.div>
  );
}
