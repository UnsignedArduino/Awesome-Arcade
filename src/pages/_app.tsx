import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "katex/dist/katex.min.css";
import Adsense from "../components/Adsense";
import Analytics from "../components/Analytics";
import ErrorBoundary from "../components/ErrorBoundary";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import growthbook from "@/components/FeatureFlags";

export default function AwesomeArcadeExtensions({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  React.useEffect(() => {
    import("bootstrap");
  }, []);

  const router = useRouter();

  React.useEffect(() => {
    window.addEventListener("popstate", () => {
      router.push(window.location.href);
    });
  }, [router]);

  React.useEffect(() => {
    growthbook.loadFeatures();
  }, []);

  return (
    <ErrorBoundary>
      <NextNProgress color="#FFF603" options={{ showSpinner: false }} />
      <Analytics />
      <Adsense />
      <GrowthBookProvider growthbook={growthbook}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </GrowthBookProvider>
    </ErrorBoundary>
  );
}
