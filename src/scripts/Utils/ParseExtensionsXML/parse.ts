import { XMLParser } from "fast-xml-parser";
import markdownToHTML from "@/scripts/Utils/MarkdownToHTML";

export type ExtensionList = {
  builtIn: Extension[];
  notBuiltIn: Extension[];
  tools: Tool[];
};

export type ExtensionRef = {
  type: string;
  title: string;
  author: string;
  repo: string;
  url: string;
};

export type Extension = {
  type: string;
  title: string;
  author: string;
  repo: string;
  url: string;
  description: string;
  links: URLLink[];
  forks?: ExtensionRef[] | null;
  depreciatedBy?: ExtensionRef[] | null;
  inBeta?: { text: string; since: string } | null;
};

export type ToolRef = {
  type: string;
  title: string;
  author: string;
  repo: string;
  url: string;
};

export type Tool = {
  type: string;
  title: string;
  author: string;
  repo: string;
  url: string;
  description: string;
  links: URLLink[];
  forks?: ToolRef[] | null;
  depreciatedBy?: ToolRef[] | null;
  inBeta?: { text: string; since: string } | null;
};

export type URLLink = {
  type: "URLLink";
  label?: string | null;
  url: string;
  isPrimary?: boolean | null;
};

function stringToBool(str: string): boolean {
  return (
    str != undefined &&
    ["true", "t", "1"].indexOf(str.toLowerCase().trim()) !== -1
  );
}

function findElementInElement(element: any, elementName: string): any {
  if (element instanceof Array) {
    for (const e of element) {
      const result = findElementInElement(e, elementName);
      if (result != undefined) {
        return result;
      }
    }
    return undefined;
  } else {
    for (const key of Object.keys(element)) {
      if (key === elementName) {
        return element;
      }
    }
    return undefined;
  }
}

function findElementWithAttributeValue(
  elements: any[],
  attributeName: string,
  attributeValue: string
): any {
  for (const element of elements) {
    const attributes = element[":@"];
    if (attributes != undefined) {
      if (attributes[`@_${attributeName}`] === attributeValue) {
        return element;
      }
    }
  }
  return undefined;
}

function gatherExtensionRefList(exts: any[]): ExtensionRef[] {
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

async function gatherExtensionList(exts: any[]): Promise<Extension[]> {
  const newExts = [];
  for (const extension of exts) {
    const ext = findElementInElement(extension, "extension").extension;
    const description = await markdownToHTML(
      findElementInElement(ext, "description").description[0]["#text"]
    );
    const links: URLLink[] = findElementInElement(ext, "links").links.map(
      (obj: any): URLLink => {
        return {
          type: "URLLink",
          label: obj[":@"]["@_label"],
          url: obj.url[0]["#text"],
          isPrimary: stringToBool(obj[":@"]["@_isPrimary"]),
        };
      }
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
    newExts.push({
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
    });
  }
  return newExts;
}

function gatherToolRefList(tools: any[]): ToolRef[] {
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

async function gatherToolList(tools: any[]): Promise<Tool[]> {
  const newTools = [];
  for (const tool of tools) {
    const t = findElementInElement(tool, "tool").tool;
    const description = await markdownToHTML(
      findElementInElement(t, "description").description[0]["#text"]
    );
    const links: URLLink[] = findElementInElement(t, "links").links.map(
      (obj: any): URLLink => {
        return {
          type: "URLLink",
          label: obj[":@"]["@_label"],
          url: obj.url[0]["#text"],
          isPrimary: stringToBool(obj[":@"]["@_isPrimary"]),
        };
      }
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
    });
  }
  return newTools;
}

export default async function parseExtensionXML(
  xml: string
): Promise<ExtensionList> {
  const parser = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
  });

  const obj = parser.parse(xml);

  const allExtensions = obj[1].allExtensions;
  const builtIn = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Built in"
  ).extensionList;
  const notBuiltIn = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Not built in"
  ).extensionList;
  const tools = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Tools"
  ).toolList;

  return {
    builtIn: await gatherExtensionList(builtIn),
    notBuiltIn: await gatherExtensionList(notBuiltIn),
    tools: await gatherToolList(tools),
  };
}
