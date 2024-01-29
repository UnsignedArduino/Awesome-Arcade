import Layout from "@/components/Layout";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import React from "react";
import Link from "next/link";

const pageName = "Sign in";

export default function Error({ appProps }: { appProps: AppProps }) {
  const [error, setError] = React.useState(
    "Sorry, there was an error during authentication!"
  );

  React.useEffect(() => {
    const errorValue = new URLSearchParams(window.location.search).get("error");
    if (errorValue) {
      const errorString = {
        Configuration:
          "Sorry, there is a problem with the authentication configuration!",
        AccessDenied: "Sorry, you are not allowed to access this page!",
        Verification:
          "Sorry, your email token has expired or already been used, try signing in again!",
      }[errorValue];
      if (errorString) {
        setError(errorString);
      }
    }
  }, []);

  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <>
        <h1>Authentication error</h1>
        <p>{error}</p>
        <p>
          Go back to <Link href="/">home</Link>?
        </p>
        <p>
          You can report{" "}
          <a
            href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            issues
          </a>{" "}
          like this in the GitHub repository.
        </p>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { appProps: AppProps };
}> {
  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}
