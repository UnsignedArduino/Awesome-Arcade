import { XMLParser } from "fast-xml-parser";
import markdownToHTML from "@/scripts/Utils/MarkdownToHTML";
import {
  Extension,
  ExtensionRef,
  Tool,
  ToolRef,
  URLLink,
} from "@/scripts/ParseListXML/types";
import {
  findElementInElement,
  findElementWithAttributeValue,
  stringToBool,
} from "@/scripts/ParseListXML/helpers";

export function gatherExtensionRefList(exts: any[]): ExtensionRef[] {
  const newExtsRef = [];
  for (const extension of exts) {
    const repo: string = extension[":@"]["@_repo"];
    const title = repo.split("/")[1];
    const author = repo.split("/")[0];
    const url = `https://github.com/${repo}`;
    newExtsRef.push({
      type: "ExtensionRef",
      title,
      author,
      repo,
      url,
    });
  }
  return newExtsRef;
}

export async function gatherExtensionList(exts: any[]): Promise<Extension[]> {
  const newExts: Extension[] = [];
  for (const extension of exts) {
    const ext = findElementInElement(extension, "extension").extension;
    const description = await markdownToHTML(
      findElementInElement(ext, "description").description[0]["#text"],
    );
    const links: URLLink[] = findElementInElement(ext, "links").links.map(
      (obj: any): URLLink => {
        return {
          type: "URLLink",
          label: obj[":@"]["@_label"],
          url: obj.url[0]["#text"],
          isPrimary: stringToBool(obj[":@"]["@_isPrimary"]),
        };
      },
    );
    const url = links.filter((link) => {
      return link.isPrimary;
    })[0];
    const repo: string = extension[":@"]["@_repo"];
    const title = repo.split("/")[1];
    const author = repo.split("/")[0];
    const forks = findElementInElement(ext, "forks");
    const depreciatedBy = findElementInElement(ext, "depreciatedBy");
    const inBeta = findElementInElement(ext, "inBeta");
    const javascriptOnly = stringToBool(extension[":@"]["@_javascriptOnly"]);
    newExts.push(<Extension>{
      type: "Extension",
      title,
      author,
      repo,
      url: url.url,
      description,
      links,
      forks: forks != undefined ? gatherExtensionRefList(forks.forks) : null,
      depreciatedBy:
        depreciatedBy != undefined
          ? gatherExtensionRefList(depreciatedBy.depreciatedBy)
          : null,
      inBeta:
        inBeta != undefined
          ? {
              text: inBeta["inBeta"][0]["#text"],
              since: inBeta[":@"]["@_asOf"],
            }
          : null,
      javascriptOnly,
    });
  }
  return newExts;
}

export function gatherToolRefList(tools: any[]): ToolRef[] {
  const newToolRefs = [];
  for (const tool of tools) {
    const repo: string = tool[":@"]["@_repo"];
    const title = repo.split("/")[1];
    const author = repo.split("/")[0];
    const url = `https://github.com/${repo}`;
    newToolRefs.push({
      type: "ToolRef",
      title,
      author,
      repo,
      url,
    });
  }
  return newToolRefs;
}

export async function gatherToolList(tools: any[]): Promise<Tool[]> {
  const newTools = [];
  for (const tool of tools) {
    const t = findElementInElement(tool, "tool").tool;
    const description = await markdownToHTML(
      findElementInElement(t, "description").description[0]["#text"],
    );
    const links: URLLink[] = findElementInElement(t, "links").links.map(
      (obj: any): URLLink => {
        return {
          type: "URLLink",
          label: obj[":@"]["@_label"],
          url: obj.url[0]["#text"],
          isPrimary: stringToBool(obj[":@"]["@_isPrimary"]),
        };
      },
    );
    const url = links.filter((link) => {
      return link.isPrimary;
    })[0];
    const repo: string = tool[":@"]["@_repo"];
    const title = repo.split("/")[1];
    const author = repo.split("/")[0];
    const forks = findElementInElement(t, "forks");
    const depreciatedBy = findElementInElement(t, "depreciatedBy");
    const inBeta = findElementInElement(t, "inBeta");
    const notAWebsite = stringToBool(tool[":@"]["@_notAWebsite"]);
    newTools.push({
      type: "Tool",
      title,
      author,
      url: url.url,
      repo,
      description,
      links,
      forks: forks != undefined ? gatherToolRefList(forks.forks) : null,
      depreciatedBy:
        depreciatedBy != undefined
          ? gatherToolRefList(depreciatedBy.depreciatedBy)
          : null,
      inBeta:
        inBeta != undefined
          ? {
              text: inBeta["inBeta"][0]["#text"],
              since: inBeta[":@"]["@_asOf"],
            }
          : null,
      notAWebsite,
    });
  }
  return newTools;
}

export async function parseExtensionXML(xml: string): Promise<Extension[]> {
  const parser = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
  });

  const obj = parser.parse(xml);

  const allExtensions = obj[1].allExtensions;
  const notBuiltIn = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Not built in",
  ).extensionList;

  return await gatherExtensionList(notBuiltIn);
}

export async function parseToolXML(xml: string): Promise<Tool[]> {
  const parser = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
  });

  const obj = parser.parse(xml);

  const allExtensions = obj[1].allTools;
  const tools = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Tools",
  ).toolList;

  return await gatherToolList(tools);
}
