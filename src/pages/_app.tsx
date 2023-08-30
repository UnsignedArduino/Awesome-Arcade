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

export default function AwesomeArcadeExtensions({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  React.useEffect(() => {
    import("bootstrap");
  }, []);

  return (
    <ErrorBoundary>
      <NextNProgress color="#FFF603" options={{ showSpinner: false }} />
      <Analytics />
      <Adsense />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ErrorBoundary>
  );
}
