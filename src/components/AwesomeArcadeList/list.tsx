import React from "react";
import { AwesomeArcadeExtensionGroup } from "@/components/AwesomeArcadeList/extension";
import { AwesomeArcadeToolGroup } from "@/components/AwesomeArcadeList/tool";
import { Extension, Tool } from "@/scripts/FetchListsFromCMS/types";

export function AwesomeArcadeExtensionsList({
  list,
}: {
  list: Extension[];
}): React.ReactNode {
  return (
    <div id="awesomeArcadeExtensions" style={{ overflowX: "hidden" }}>
      <AwesomeArcadeExtensionGroup exts={list} />
    </div>
  );
}

export function AwesomeArcadeToolsList({
  list,
}: {
  list: Tool[];
}): React.ReactNode {
  return (
    <div id="awesomeArcadeTools" style={{ overflowX: "hidden" }}>
      <AwesomeArcadeToolGroup tools={list} />
    </div>
  );
}
