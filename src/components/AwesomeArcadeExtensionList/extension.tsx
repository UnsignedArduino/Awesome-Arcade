import { Extension, Link } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";

export function AwesomeArcadeExtension({
  ext,
  showImportURL,
  pad,
}: {
  ext: Extension;
  showImportURL?: boolean | undefined;
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={`card ${pad ? "mb-2" : ""}`}>
      <h5 className="card-title">{ext.title}</h5>
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
          <blockquote className="border-start border-secondary border-2 ps-2 mt-1 mb-2">
            <a href={ext.url} target="_blank" rel="noopener noreferer">
              {ext.url}
            </a>
          </blockquote>
        </>
      ) : (
        <></>
      )}
      <div
        className="card-text"
        dangerouslySetInnerHTML={{ __html: ext.description }}
      />
      {ext.links.map((link: Link) => {
        return (
          <a
            href={link.url}
            key={link.url}
            className="card-link"
            target="_blank"
            rel="noopener noreferer"
          >
            {link.label != undefined ? link.label : link.url}
          </a>
        );
      })}
      <div className="card-body">
        {ext.forks != undefined && ext.forks.length > 0 ? (
          <AwesomeArcadeExtensionGroup
            description={
              <p className="mt-3">
                There {ext.forks.length === 1 ? "is" : "are"}{" "}
                <b>{ext.forks.length}</b> fork
                {ext.forks.length !== 1 ? "s" : undefined} available!
              </p>
            }
            exts={ext.forks}
            pad={false}
          />
        ) : (
          <></>
        )}
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
      {exts.map((ext, i) => {
        return (
          <AwesomeArcadeExtension
            key={ext.repo}
            ext={ext}
            showImportURL={showImportURL}
            pad={i < exts.length - 1}
          />
        );
      })}
    </div>
  );
}
