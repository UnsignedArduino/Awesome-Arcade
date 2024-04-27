import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";
import { QuickLink } from "@/components/QuickLinks/types";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";

const pageName = "Help";

export function Help({ appProps }: { appProps: AppProps }): React.ReactNode {
  const helpPages: QuickLink[] = [
    {
      name: "Adding extensions",
      description: "A guide on how to add extensions to MakeCode Arcade.",
      link: "/help/adding-extensions",
      linkText: "View the guide",
    },
    {
      name: "Contributing",
      description: "Guides on how to contribute to Awesome Arcade.",
      link: "/help/contributing",
      linkText: "Contribute to Awesome Arcade",
    },
    {
      name: "Legal",
      description:
        "Everyone's favorite section, this includes a number of legal documents and settings to change how we process your data.",
      link: "/legal",
      linkText: "View the really fun section",
    },
  ];

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's help page."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Help, Help page, Main help page"
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

export default Help;
