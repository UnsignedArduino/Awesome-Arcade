export type Environment = "development" | "preview" | "production";

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
