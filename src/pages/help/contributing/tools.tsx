import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";

const pageName = "Contributing tools";

export function ContributingTools({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's guide on contributing tools to the site."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Help, Help page, Contributing, Contributing tools, Contribute tools"
      breadCrumbs={[
        { Help: "/help" },
        { Contributing: "/help/contributing" },
        { Extensions: "/help/contributing/tools" },
      ]}
    >
      <h1>{pageName}</h1>
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

export default ContributingTools;
