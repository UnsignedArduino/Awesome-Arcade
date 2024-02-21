import { parseExtensionXML, parseToolXML } from "@/scripts/Utils/ParseListXML";
import { promises as fs } from "fs";
import path from "path";

type Environment = "development" | "preview" | "production";

export function getEnvironment(): Environment {
  return process.env.VERCEL_ENV != undefined
    ? (process.env.VERCEL_ENV as Environment)
    : process.env.NODE_ENV != undefined
      ? (process.env.NODE_ENV as Environment)
      : "production";
}

export function getBranch(): "main" | "staging" {
  return getEnvironment() === "production" ? "main" : "staging";
}

export interface AppProps {
  environment: Environment;
  extensionsListed: number;
  toolsListed: number;
}

export async function getAppProps(): Promise<AppProps> {
  return {
    environment: getEnvironment(),
    extensionsListed: (
      await parseExtensionXML(
        (
          await fs.readFile(
            path.resolve(process.cwd(), "src", "extensions.xml"),
          )
        ).toString(),
      )
    ).length,
    toolsListed: (
      await parseToolXML(
        (
          await fs.readFile(path.resolve(process.cwd(), "src", "tools.xml"))
        ).toString(),
      )
    ).length,
  };
}

export default getAppProps;
