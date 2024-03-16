import { parseExtensionXML, parseToolXML } from "../../scripts/ParseListXML";
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

export function getBaseURL(): string {
  switch (getEnvironment()) {
    case "production": {
      return "https://awesome-arcade.vercel.app";
    }
    case "preview": {
      return "https://awesome-arcade-beta.vercel.app";
    }
    case "development": {
      return "http://localhost:3000";
    }
  }
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
