import { XMLParser } from "fast-xml-parser";
import { Extension, Tool } from "@/scripts/ParseListXML";
import {
  gatherExtensionList,
  gatherToolList,
} from "@/scripts/ParseListXML/parse";
import { findElementWithAttributeValue } from "@/scripts/ParseListXML/helpers";

export type ExtensionList = {
  builtIn: Extension[];
  notBuiltIn: Extension[];
  tools: Tool[];
};

export default async function parseListXML(
  xml: string,
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
    "Built in",
  ).extensionList;
  const notBuiltIn = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Not built in",
  ).extensionList;
  const tools = findElementWithAttributeValue(
    allExtensions,
    "label",
    "Tools",
  ).toolList;

  return {
    builtIn: await gatherExtensionList(builtIn),
    notBuiltIn: await gatherExtensionList(notBuiltIn),
    tools: await gatherToolList(tools),
  };
}
