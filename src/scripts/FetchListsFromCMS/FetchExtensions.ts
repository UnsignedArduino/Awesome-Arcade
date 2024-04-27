import { Extension } from "./types";
import client from "../../../tina/__generated__/client";
import { partsFromURL } from "@/scripts/FetchListsFromCMS/helpers";
import NodeCache from "node-cache";

const extensionCache = new NodeCache({ stdTTL: 60 * 5 });

export default async function fetchExtensionsFromCMS(): Promise<Extension[]> {
  const cachedExtensions: Extension[] | undefined =
    extensionCache.get("extensions");
  if (cachedExtensions) {
    console.log("Returning cached extensions list");
    return cachedExtensions;
  }

  const exts: Extension[] = [];

  const extsListData = await client.queries.extensionsConnection({
    first: 999999,
  });

  console.log(
    `Fetched ${(extsListData.data.extensionsConnection.edges ?? []).length} extensions`,
  );

  for (const edge of extsListData.data.extensionsConnection.edges ?? []) {
    if (!edge || !edge.node) {
      continue;
    }
    const extension = edge.node;

    const [url, repo, title, author] = partsFromURL(extension.repo);

    exts.push({
      type: "Extension",
      title,
      author,
      repo,
      url,
      description: extension.description,
      links: [
        {
          type: "URLLink",
          label: "GitHub repo",
          url,
          isPrimary: true,
        },
        ...(extension.links ?? []).map((link) => {
          return {
            type: "URLLink",
            label: link!.title!,
            url: link!.url!,
            isPrimary: false,
          };
        }),
      ],
      forks: (extension.forks ?? []).map((fork) => {
        const [url, repo, title, author] = partsFromURL(fork!);
        return {
          type: "ExtensionRef",
          title,
          author,
          repo,
          url,
        };
      }),
      depreciatedBy: (extension.deprecated ?? []).map((fork) => {
        const [url, repo, title, author] = partsFromURL(fork!);
        return {
          type: "ExtensionRef",
          title,
          author,
          repo,
          url,
        };
      }),
      inBeta:
        extension.betaStatus && extension.betaStatus.inBeta
          ? {
              text: extension.betaStatus.reason!,
              since: extension.betaStatus.since!,
            }
          : null,
      javascriptOnly: extension.isJavascriptOnly ?? false,
    });
  }

  extensionCache.set("extensions", exts);

  return exts;
}
