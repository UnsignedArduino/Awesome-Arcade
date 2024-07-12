import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";
import { appName } from "@/components/Layout/layout";
import { QuickLink } from "@/components/QuickLinks/types";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";

const pageName = "Legal";

export function Legal({ appProps }: { appProps: AppProps }): React.ReactNode {
  const legalLinks: QuickLink[] = [
    {
      name: "External services and data collection",
      description:
        "Read about the external services and data collection used by this website and control how we process your data.",
      link: "/legal/external-services-and-data-collection",
      linkText: "View external services and data collection",
    },
    {
      name: "Copyright policy",
      description:
        "Read about the copyright policy of this website and how you can use the content.",
      link: "/legal/copyright-policy",
      linkText: "View copyright policy",
    },
    {
      name: "Privacy policy",
      description:
        "Read about the privacy policy of this website and how we handle your data.",
      link: "/legal/privacy-policy",
      linkText: "View privacy policy",
    },
    {
      name: "Terms of service",
      description:
        "Read about the terms of service of this website and the rules you must follow.",
      link: "/legal/terms-of-service",
      linkText: "View terms of service",
    },
  ];

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's legal stuff page."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Legal, Legal stuff, legal stuff pages"
    >
      <h1>{pageName}</h1>
      <p>{appName} is © 2024 UnsignedArduino. All rights reserved.</p>
      <p>
        This website is not developed, affiliated, or endorsed by Microsoft, the
        owner of MakeCode Arcade. All trademarks mentioned on this website
        belong to their respective owners. Microsoft and MakeCode Arcade are
        trademarks of the Microsoft group of companies.
      </p>
      <p>
        The source code for Awesome Arcade is licensed under the{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade/blob/main/LICENSE.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          GNU General Public License v3.0
        </a>
        .
      </p>
      <QuickLinkCards quickLinks={legalLinks} />
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
  props: {
    appProps: AppProps;
  };
}> {
  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default Legal;
