import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";
import { appName } from "@/components/Layout/layout";

const pageName = "Legal";

export function Legal({ appProps }: { appProps: AppProps }): React.ReactNode {
  const legalPages = {
    "External services and data collection":
      "external-services-and-data-collection",
    "Copyright policy": "copyright-policy",
    "Privacy policy": "privacy-policy",
    "Terms of service": "terms-of-service",
  };

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
      <ul>
        {Object.entries(legalPages).map(([name, page]) => {
          return (
            <li key={name}>
              <Link href={`/legal/${page}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
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
