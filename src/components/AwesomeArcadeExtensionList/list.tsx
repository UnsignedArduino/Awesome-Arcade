import {
  Extension,
  ExtensionList,
  Tool,
} from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";

function AwesomeArcadeExtension({ ext }: { ext: Extension }): JSX.Element {
  return (
    <>
      {ext.repo}
      <br />
    </>
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
    <>
      {tool.repo}
      <br />
    </>
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

export default function AwesomeArcadeExtensionList({
  list,
}: {
  list: ExtensionList;
}): JSX.Element {
  return (
    <>
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
    </>
  );
}
