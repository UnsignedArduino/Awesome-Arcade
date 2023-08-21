import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "../scripts/Utils/SiteWebmanifest/manifest";
import Link from "next/link";

const pageName = "Home";

type HomeProps = { appProps: AppProps };

export function Home({ appProps }: HomeProps): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description=""
      keywords=""
    >
      <h1>Welcome to Awesome Arcade Extensions</h1>
      <p>
        This is a list of MakeCode Arcade extensions that I find super useful
        (or just plain cool) in my projects.
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
  props: HomeProps;
}> {
  await fs.writeFile(
    "./public/site.webmanifest",
    await generateSiteWebmanifest()
  );

  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default Home;
