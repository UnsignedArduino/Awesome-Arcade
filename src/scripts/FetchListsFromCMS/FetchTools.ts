import { Tool, ToolRef } from "./types";
import client from "../../../tina/__generated__/client";
import NodeCache from "node-cache";

const toolCache = new NodeCache({ stdTTL: 60 * 5 });

export default async function fetchToolsFromCMS(): Promise<Tool[]> {
  const cachedTools: Tool[] | undefined = toolCache.get("tools");
  if (cachedTools) {
    console.log("Returning cached tools list");
    return cachedTools;
  }

  const tools: Tool[] = [];

  const toolsListData = await client.queries.toolsConnection({ first: 999999 });

  console.log(
    `Fetched ${(toolsListData.data.toolsConnection.edges ?? []).length} tools`,
  );

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

  toolCache.set("tools", tools);

  return tools;
}
