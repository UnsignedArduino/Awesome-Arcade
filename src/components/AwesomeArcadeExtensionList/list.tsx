import { ExtensionList } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";
import getElement from "@/scripts/Utils/Element";
import { forceOutboundLinksToNewPage } from "@/scripts/Utils/PageUtils";
import { AwesomeArcadeExtensionGroup } from "@/components/AwesomeArcadeExtensionList/extension";
import { AwesomeArcadeToolGroup } from "@/components/AwesomeArcadeExtensionList/tool";

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
