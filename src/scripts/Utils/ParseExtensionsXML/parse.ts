import { XMLParser } from "fast-xml-parser";

export type ExtensionList = {
  builtIn: Extension[];
  notBuiltIn: Extension[];
  experimental: Extension[];
  tools: Tool[];
};

export type ExtensionRef = {
  title: string;
  author: string;
  url: string;
};

export type Extension = {
  title: string;
  author: string;
  url: string;
  description: string;
  links: Link[];
  forks?: Extension[] | null;
  depreciatedBy?: ExtensionRef[] | null;
};

export type Tool = {
  title: string;
  author: string;
  url: string;
  description: string;
  links: Link[];
  forks?: Tool[] | null;
  depreciatedBy?: Tool[] | null;
};

export type Link = {
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
      title,
      author,
      url,
    });
  }
  return newExtsRef;
}

function gatherExtensionList(exts: any[]): Extension[] {
  const newExts = [];
  for (const extension of exts) {
    const ext = findElementInElement(extension, "extension").extension;
    const description: string = findElementInElement(ext, "description")
      .description[0]["#text"];
    const links: Link[] = findElementInElement(ext, "links").links.map(
      (obj: any): Link => {
        return {
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
    newExts.push({
      title,
      author,
      url: url.url,
      description,
      links,
      forks: forks != undefined ? gatherExtensionList(forks.forks) : null,
      depreciatedBy:
        depreciatedBy != undefined
          ? gatherExtensionRefList(depreciatedBy.depreciatedBy)
          : null,
    });
  }
  return newExts;
}

export default function parseExtensionXML(xml: string): ExtensionList {
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
  const experimental = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Experimental"
  ).extensionList;
  const tools = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Tools"
  ).extensionList;

  return {
    builtIn: gatherExtensionList(builtIn),
    notBuiltIn: gatherExtensionList(notBuiltIn),
    experimental: gatherExtensionList(experimental),
    tools: [],
  };
}
