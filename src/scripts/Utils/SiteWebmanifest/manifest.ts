import { getEnvironment } from "../../../components/WithAppProps";

export default async function generateSiteWebmanifest(): Promise<string> {
  const json = JSON.parse(`{
  "name": "Awesome Arcade Extensions",
  "short_name": "Awesome Arcade Extensions",
  "description": "This is a list of MakeCode Arcade extensions that I find super useful (or just plain cool) in my projects.",
  "start_url": "/",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`);
  json.name = json.short_name = `Awesome Arcade Extensions${(() => {
    switch (getEnvironment()) {
      case "development": {
        return " Development";
      }
      case "preview": {
        return " Beta";
      }
      default:
      case "production": {
        return "";
      }
    }
  })()}`;
  return JSON.stringify(json, undefined, 2);
}
