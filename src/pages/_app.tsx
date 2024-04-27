import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "katex/dist/katex.min.css";
import "tippy.js/dist/tippy.css";
import Adsense from "../components/Adsense";
import Analytics from "../components/Analytics";
import ErrorBoundary from "../components/ErrorBoundary";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import growthbook from "@/components/FeatureFlags";

export type BootstrapLibContextType = typeof import("bootstrap") | null;
export const BootstrapLibContext =
  React.createContext<BootstrapLibContextType>(null);

export type TippyJSLibContextType = typeof import("tippy.js") | null;
export const TippyJSLibContext =
  React.createContext<TippyJSLibContextType>(null);

export default function AwesomeArcadeExtensions({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): React.ReactNode {
  const [bootstrapLib, setBootstrapLib] =
    React.useState<BootstrapLibContextType>(null);
  const [tippyJSLib, setTippyJSLib] =
    React.useState<TippyJSLibContextType>(null);

  React.useEffect(() => {
    import("bootstrap")
      .then((lib) => {
        setBootstrapLib(lib);
        console.log("Loaded Bootstrap");
      })
      .catch((err) => {
        console.error("Failed to load Bootstrap!");
        console.error(err);
      });
    import("tippy.js")
      .then((lib) => {
        setTippyJSLib(lib);
        console.log("Loaded Tippy.js");
      })
      .catch((err) => {
        console.error("Failed to load Tippy.js!");
        console.error(err);
      });
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
      <BootstrapLibContext.Provider value={bootstrapLib}>
        <TippyJSLibContext.Provider value={tippyJSLib}>
          <NextNProgress color="#FFF603" options={{ showSpinner: false }} />
          <Analytics />
          <Adsense />
          <GrowthBookProvider growthbook={growthbook}>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </GrowthBookProvider>
        </TippyJSLibContext.Provider>
      </BootstrapLibContext.Provider>
    </ErrorBoundary>
  );
}
