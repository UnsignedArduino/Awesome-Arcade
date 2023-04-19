import {
  Extension,
  ExtensionList,
  Tool,
} from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";
import getElement from "@/scripts/Utils/Element";

function AwesomeArcadeExtension({ ext }: { ext: Extension }): JSX.Element {
  return (
    <div className="card mb-2">
      <div className="card-body">
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
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: ext.description }}
        />
        {ext.links.map((link) => {
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
      </div>
    </div>
  );
}

function AwesomeArcadeExtensionGroup({
  title,
  description,
  exts,
}: {
  title: JSX.Element;
  description: JSX.Element;
  exts: Extension[];
}): JSX.Element {
  return (
    <div className="mb-3">
      {title}
      {description}
      {exts.map((ext) => {
        return <AwesomeArcadeExtension key={ext.repo} ext={ext} />;
      })}
    </div>
  );
}

function AwesomeArcadeTool({ tool }: { tool: Tool }): JSX.Element {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{tool.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Made by{" "}
          <a
            href={`https://github.com/${tool.author}`}
            target="_blank"
            rel="noopener noreferer"
          >
            {tool.author}
          </a>
        </h6>
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: tool.description }}
        />
        {tool.links.map((link) => {
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
      </div>
    </div>
  );
}

function AwesomeArcadeToolGroup({
  title,
  description,
  tools,
}: {
  title: JSX.Element;
  description: JSX.Element;
  tools: Tool[];
}): JSX.Element {
  return (
    <div className="mb-3">
      {title}
      {description}
      {tools.map((tool) => {
        return <AwesomeArcadeTool key={tool.repo} tool={tool} />;
      })}
    </div>
  );
}

function isExternalLink(url: string): boolean {
  return new URL(url).host !== window.location.host;
}

function forceOutboundLinksToNewPage(parent: Element) {
  const elements: Element[] = [parent];
  while (elements.length > 0) {
    const e = elements.splice(0, 1)[0];
    if (e.tagName === "A" && isExternalLink((e as HTMLAnchorElement).href)) {
      (e as HTMLAnchorElement).target = "_blank";
      (e as HTMLAnchorElement).rel = "noopener noreferrer";
    }
    if (e.children.length > 0) {
      for (let i = 0; i < e.children.length; i++) {
        elements.push(e.children[i]);
      }
    }
  }
}

export default function AwesomeArcadeExtensionList({
  list,
}: {
  list: ExtensionList;
}): JSX.Element {
  React.useEffect(() => {
    const div = getElement("awesomeArcadeExtensions") as HTMLDivElement;
    forceOutboundLinksToNewPage(div);
  }, []);

  return (
    <div id="awesomeArcadeExtensions">
      <AwesomeArcadeExtensionGroup
        title={<h2>Built-in extensions</h2>}
        description={
          <p>
            These extensions are already built in to the editor, all you have to
            do is go to the toolbox, click on <code>Extensions</code>, and click
            on the extension you want to import!
          </p>
        }
        exts={list.builtIn}
      />
      <AwesomeArcadeExtensionGroup
        title={<h2>Not built-in extensions</h2>}
        description={
          <p>
            The following extensions, while just as good as the ones listed
            above, will require some slightly different steps while importing.
            First go to the toolbox, click on <code>Extensions</code>, and you
            will see a text box that says{" "}
            <code>Search or enter project URL...</code> This is where you will
            paste in the URL to the extension. The URL will be posted along with
            the extensions below.
          </p>
        }
        exts={list.notBuiltIn}
      />
      <AwesomeArcadeExtensionGroup
        title={<h2>Experimental extensions</h2>}
        description={
          <p>
            Shouldn{"'"}t need an explanation.
            <br />
            <br />
            {'"'}VERY UNSTABLE{'"'} - @livcheerful
          </p>
        }
        exts={list.experimental}
      />
      <AwesomeArcadeToolGroup
        title={<h2>Tools</h2>}
        description={
          <p>
            Yes, this is about useful MakeCode Arcade extensions but these tools
            will level up your game-making experience!
          </p>
        }
        tools={list.tools}
      />
    </div>
  );
}
