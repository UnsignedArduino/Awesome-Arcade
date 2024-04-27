import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import { QuickLink } from "@/components/QuickLinks/types";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";

const pageName = "Contributing";

export function Contributing({
  appProps,
}: {
  appProps: AppProps;
}): React.ReactNode {
  const helpPages: QuickLink[] = [
    {
      name: "Contributing extensions",
      description: "A guide on how to contribute extensions to Awesome Arcade.",
      link: "/help/contributing/extensions",
      linkText: "Contribute extensions",
    },
    {
      name: "Contributing tools",
      description: "A guide on how to contribute tools to Awesome Arcade.",
      link: "/help/contributing/tools",
      linkText: "Contribute tools",
    },
  ];

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's help page on contributing."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Help, Help page, Contributing, Main contributing page"
      breadCrumbs={[{ Help: "/help" }, { Contributing: "/help/contributing" }]}
    >
      <h1>{pageName}</h1>
      <QuickLinkCards quickLinks={helpPages} />
      <p>
        If you have any problems, you can join me on{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Discussions
        </a>{" "}
        or the{" "}
        <a
          href="https://forum.makecode.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MakeCode forums
        </a>
        .
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

export default Contributing;
