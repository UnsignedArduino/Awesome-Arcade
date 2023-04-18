export type ExtensionList = {
  builtIn: Extension[];
  notBuiltIn: Extension[];
  experimental: Extension[];
  tools: Tool[];
};

export type Extension = {
  title: string;
  author: string;
  url: string;
  description: string;
  links: string[];
  forks?: Extension[];
  depreciatedBy?: Extension[];
};

export type Tool = {
  title: string;
  author: string;
  url: string;
  description: string;
  links: string[];
  forks?: Tool[];
  depreciatedBy?: Tool[];
};

export default function parseExtensionXML(xml: string): ExtensionList {
  const newJson: ExtensionList = {
    builtIn: [],
    notBuiltIn: [],
    experimental: [],
    tools: [],
  };

  return newJson;
}
