import { GoogleAdSense } from "nextjs-google-adsense";
import React from "react";
import { getEnvironment } from "@/scripts/Utils/Environment";

export function Adsense(): React.ReactNode {
  React.useEffect(() => {
    if (getEnvironment() === "development") {
      if (process.env.NEXT_PUBLIC_ENABLE_ADS) {
        console.info("Enabling Google Adsense during development");
      } else {
        console.info("Google Adsense disabled during development");
        return;
      }
    }
  }, []);

  return getEnvironment() === "development" ? (
    <></>
  ) : (
    <GoogleAdSense publisherId="pub-XXXXXXXXXXXXXXXX" />
  );
}

export default Adsense;
