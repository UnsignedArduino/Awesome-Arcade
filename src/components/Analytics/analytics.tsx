import type { NextWebVitalsMetric } from "next/app";
import { event, GoogleAnalytics } from "nextjs-google-analytics";
import React from "react";
import { getEnvironment } from "@/components/WithAppProps";

export function getAdStorageConsent(): string {
  return window.localStorage.getItem("adStorageConsent") || "denied";
}

export function setAdStorageConsent(consent: string): void {
  window.localStorage.setItem("adStorageConsent", consent);
}

export function getAdsDataRedaction(): string {
  return window.localStorage.getItem("adsDataRedaction") || "true";
}

export function setAdsDataRedaction(consent: string): void {
  window.localStorage.setItem("adsDataRedaction", consent);
}

export function getAnalyticsStorageConsent(): string {
  return window.localStorage.getItem("analyticsStorage") || "denied";
}

export function setAnalyticsStorageConsent(consent: string): void {
  window.localStorage.setItem("analyticsStorage", consent);
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function Analytics(): JSX.Element {
  const [useGA, setUseGA] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    // @ts-ignore
    gtag("consent", "default", {
      ad_storage: "denied",
      ads_data_redaction: "true",
      analytics_storage: "denied",
    });

    const keys = ["adStorageConsent", "adsDataRedaction", "analyticsStorage"];
    const defaults = ["granted", "false", "granted"];
    for (const index in keys) {
      if (window.localStorage.getItem(keys[index]) == undefined) {
        window.localStorage.setItem(keys[index], defaults[index]);
      }
    }

    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: getAdStorageConsent(),
      ads_data_redaction: getAdsDataRedaction(),
      analytics_storage: getAnalyticsStorageConsent(),
    });

    if (getEnvironment() === "development") {
      console.info("Google Analytics disabled during development");
      return;
    }

    setUseGA(true);
  }, []);

  return useGA ? <GoogleAnalytics trackPageViews /> : <></>;
}

export default Analytics;

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}
