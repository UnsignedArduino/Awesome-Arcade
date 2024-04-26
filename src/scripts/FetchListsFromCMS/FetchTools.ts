import { Tool, ToolRef } from "./types";
import client from "../../../tina/__generated__/client";

export default async function fetchToolsFromCMS(): Promise<Tool[]> {
  const tools: Tool[] = [];

  const toolsListData = await client.queries.toolsConnection();

  for (const edge of toolsListData.data.toolsConnection.edges ?? []) {
    if (!edge || !edge.node) {
      continue;
    }
    const tool = edge.node;
    const title = tool.project.split("/")[1];
    const author = tool.project.split("/")[0];

    tools.push({
      type: "Tool",
      title,
      author,
      repo: tool.project,
      url: tool.url,
      description: tool.description,
      links: (tool.links ?? []).map((link) => {
        return {
          type: "URLLink",
          label: link!.title!,
          url: link!.url!,
          isPrimary: false,
        };
      }),
      forks: (tool.forks ?? [])
        .map((fork) => {
          const edge = (toolsListData.data.toolsConnection.edges ?? []).find(
            (edge) => {
              if (!edge || !edge.node) {
                return false;
              }
              return edge.node.project === fork!;
            },
          );
          if (!edge || !edge.node) {
            return undefined;
          }
          const forkToolObject = edge.node;
          const title = forkToolObject.project.split("/")[1];
          const author = forkToolObject.project.split("/")[0];

          return {
            type: "ToolRef",
            title,
            author,
            repo: forkToolObject.project,
            url: forkToolObject.url,
          };
        })
        .filter((fork) => {
          return fork !== undefined;
        }) as ToolRef[],
      depreciatedBy: (tool.deprecated ?? [])
        .map((deprecated) => {
          const edge = (toolsListData.data.toolsConnection.edges ?? []).find(
            (edge) => {
              if (!edge || !edge.node) {
                return false;
              }
              return edge.node.project === deprecated!;
            },
          );
          if (!edge || !edge.node) {
            return undefined;
          }
          const deprecatedToolObject = edge.node;
          const title = deprecatedToolObject.project.split("/")[1];
          const author = deprecatedToolObject.project.split("/")[0];

          return {
            type: "ToolRef",
            title,
            author,
            repo: deprecatedToolObject.project,
            url: deprecatedToolObject.url,
          };
        })
        .filter((fork) => {
          return fork !== undefined;
        }) as ToolRef[],
      inBeta:
        tool.betaStatus && tool.betaStatus.inBeta
          ? {
              text: tool.betaStatus.reason!,
              since: tool.betaStatus.since!,
            }
          : null,
      notAWebsite: tool.isNotWebsite ?? false,
    });
  }

  return tools;
}
