import React from "react";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import Link from "next/link";

const pageName = "Tools";

export function Tools({ appProps }: { appProps: AppProps }): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description=""
      keywords=""
    >
      <h1>Welcome to Awesome Arcade Tools</h1>
      <p>
        This is a list of MakeCode Arcade tools that I find super useful (or
        just plain cool) in my projects.
      </p>
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      <p>
        You can find the old home page <Link href="/old">here</Link>.
      </p>
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

export default Tools;
