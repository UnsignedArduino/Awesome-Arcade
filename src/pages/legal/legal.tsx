import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

const pageName = "Legal";

export function Legal({ appProps }: { appProps: AppProps }): JSX.Element {
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
      description="Awesome Arcade Extensions's legal stuff page."
      keywords="Awesome Arcade Extensions, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Legal, Legal stuff, legal stuff pages"
    >
      <h1>{pageName}</h1>
      <p>
        The source code for Awesome Arcade Extensions is licensed under the{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/blob/main/LICENSE.md"
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
        </a>
        , the{" "}
        <a
          href="https://forum.makecode.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MakeCode forums
        </a>
        , or email me at{" "}
        <a href="mailto:unsignedarduino@outlook.com">
          unsignedarduino@outlook.com
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

export default Legal;
