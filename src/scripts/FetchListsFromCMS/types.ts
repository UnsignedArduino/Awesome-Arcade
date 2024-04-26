import { TinaMarkdownContent } from "tinacms/dist/rich-text";

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
  description: TinaMarkdownContent;
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
  description: TinaMarkdownContent;
  links: URLLink[];
  forks?: ToolRef[] | null;
  depreciatedBy?: ToolRef[] | null;
  inBeta?: { text: string; since: string } | null;
  notAWebsite?: boolean | null;
};

export type URLLink = {
  type: string;
  label?: string | null;
  url: string;
  isPrimary?: boolean | null;
};
