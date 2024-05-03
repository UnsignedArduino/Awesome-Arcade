import React from "react";
import { AwesomeArcadeExtensionGroup } from "@/components/AwesomeArcadeList/extension";
import { AwesomeArcadeToolGroup } from "@/components/AwesomeArcadeList/tool";
import { Extension, Tool } from "@/scripts/FetchListsFromCMS/types";
import { ListLayout } from "@/components/AwesomeArcadeList/listLayout";

export function AwesomeArcadeExtensionsList({
  list,
  layout = "grid",
}: {
  list: Extension[];
  layout?: ListLayout;
}): React.ReactNode {
  return (
    <div id="awesomeArcadeExtensions" style={{ overflowX: "hidden" }}>
      <AwesomeArcadeExtensionGroup exts={list} layout={layout} />
    </div>
  );
}

export function AwesomeArcadeToolsList({
  list,
  layout = "grid",
}: {
  list: Tool[];
  layout?: ListLayout;
}): React.ReactNode {
  return (
    <div id="awesomeArcadeTools" style={{ overflowX: "hidden" }}>
      <AwesomeArcadeToolGroup tools={list} layout={layout} />
    </div>
  );
}
