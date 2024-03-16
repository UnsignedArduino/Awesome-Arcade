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
  javascriptOnly?: boolean | null;
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
  notAWebsite?: boolean | null;
};

export type URLLink = {
  type: "URLLink";
  label?: string | null;
  url: string;
  isPrimary?: boolean | null;
};
