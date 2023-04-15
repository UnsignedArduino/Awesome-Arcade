import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "katex/dist/katex.min.css";
import Adsense from "../components/Adsense";
import Analytics from "../components/Analytics";
import ErrorBoundary from "../components/ErrorBoundary";

function LogicalSimulator({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    import("bootstrap");
  }, []);

  return (
    <ErrorBoundary>
      <NextNProgress color="#00FFFF" options={{ showSpinner: false }} />
      <Analytics />
      <Adsense />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default LogicalSimulator;
