import { GoogleAdSense } from "nextjs-google-adsense";
import React from "react";
import { getEnvironment } from "@/scripts/Utils/Environment";

export function Adsense(): React.ReactNode {
  const [useGA, setUseGA] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (getEnvironment() === "development") {
      if (process.env.NEXT_PUBLIC_ENABLE_ADS) {
        console.info("Enabling Google Adsense during development");
      } else {
        console.info("Google Adsense disabled during development");
        return;
      }
    } else if (
      process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID === "pub-XXXXXXXXXXXXXXXX" ||
      !process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
    ) {
      // console.info("No publisher ID provided, disabling Google Adsense");
      return;
    }

    setUseGA(true);
  }, []);

  return useGA ? <></> : <GoogleAdSense publisherId="pub-XXXXXXXXXXXXXXXX" />;
}

export default Adsense;
