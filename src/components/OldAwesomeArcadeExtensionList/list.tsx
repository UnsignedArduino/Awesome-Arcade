import { ExtensionList } from "../../scripts/Utils/ParseOldExtensionsXML";
import React from "react";
import getElement from "@/scripts/Utils/Element";
import { forceOutboundLinksToNewPage } from "@/scripts/Utils/PageUtils";
import { AwesomeArcadeToolGroup } from "@/components/OldAwesomeArcadeExtensionList/tool";
import { LinkableH2 } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { AwesomeArcadeExtensionGroup } from "@/components/OldAwesomeArcadeExtensionList/extension";

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
    <div id="awesomeArcadeExtensions" style={{ overflowX: "hidden" }}>
      <AwesomeArcadeExtensionGroup
        title={
          <LinkableH2 id="built-in-extensions">Built-in extensions</LinkableH2>
        }
        description={
          <p>
            These extensions are already built in to the editor, all you have to
            do is go to the toolbox, click on <code>Extensions</code>, and click
            on the extension you want to import!
          </p>
        }
        exts={list.builtIn}
        showImportURL={false}
      />
      <AwesomeArcadeExtensionGroup
        title={
          <LinkableH2 id="not-built-in-extensions">
            Not built-in extensions
          </LinkableH2>
        }
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
      {/*<AwesomeArcadeExtensionGroup*/}
      {/*  title={*/}
      {/*    <LinkableH2 id="experimental-extensions">*/}
      {/*      Experimental extensions*/}
      {/*    </LinkableH2>*/}
      {/*  }*/}
      {/*  description={*/}
      {/*    <p>*/}
      {/*      Shouldn{"'"}t need an explanation.*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      {'"'}VERY UNSTABLE{'"'} - @livcheerful*/}
      {/*    </p>*/}
      {/*  }*/}
      {/*  exts={list.experimental}*/}
      {/*/>*/}
      <AwesomeArcadeToolGroup
        title={<LinkableH2 id="tools">Tools</LinkableH2>}
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
