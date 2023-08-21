import { ExtensionList } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";
import getElement from "@/scripts/Utils/Element";
import { forceOutboundLinksToNewPage } from "@/scripts/Utils/PageUtils";
import { AwesomeArcadeExtensionGroup } from "@/components/OldAwesomeArcadeExtensionList/extension";
import { LinkableH2 } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { AwesomeArcadeToolGroup } from "@/components/OldAwesomeArcadeExtensionList/tool";

export function AwesomeArcadeExtensionsList({
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
      <AwesomeArcadeExtensionGroup exts={list.notBuiltIn} />
      <AwesomeArcadeExtensionGroup
        title={
          <LinkableH2 id="experimental-extensions">
            Experimental extensions
          </LinkableH2>
        }
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
    </div>
  );
}

export function AwesomeArcadeToolsList({
  list,
}: {
  list: ExtensionList;
}): JSX.Element {
  React.useEffect(() => {
    const div = getElement("awesomeArcadeTools") as HTMLDivElement;
    forceOutboundLinksToNewPage(div);
  }, []);

  return (
    <div id="awesomeArcadeTools" style={{ overflowX: "hidden" }}>
      <AwesomeArcadeToolGroup tools={list.tools} />
    </div>
  );
}
