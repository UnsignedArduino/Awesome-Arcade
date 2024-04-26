import { Extension } from "./types";
import client from "../../../tina/__generated__/client";

function partsFromURL(repoURL: string) {
  const url = repoURL.endsWith("/") ? repoURL.slice(0, -1) : repoURL;
  const repo = (() => {
    const pieces = url.split("/");
    return pieces[pieces.length - 2] + "/" + pieces[pieces.length - 1];
  })();
  const title = repo.split("/")[1];
  const author = repo.split("/")[0];

  return [url, repo, title, author];
}

export default async function fetchExtensionsFromCMS(): Promise<Extension[]> {
  const exts: Extension[] = [];

  const extsListData = await client.queries.extensionsConnection();

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

  return exts;
}
