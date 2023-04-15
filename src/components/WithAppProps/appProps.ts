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
}

export async function getAppProps(): Promise<AppProps> {
  return {
    environment: getEnvironment(),
  };
}

export default getAppProps;
