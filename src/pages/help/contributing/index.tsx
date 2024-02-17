import Link from "next/link";
import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";

const pageName = "Contributing";

export function Contributing({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  type HelpPage = {
    name: string;
    description: string;
    link: string;
    linkText: string;
  };

  const helpPages: HelpPage[] = [
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
      <div style={{ overflowX: "hidden" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {helpPages.map((feature: HelpPage, index: number) => {
            return (
              <div className="col mb-3 mt-1" key={`help-card-${index}`}>
                <div className="card mb-2 h-100">
                  {/* <Image
                    src={feature.image}
                    alt={feature.altText}
                    className="card-img-top"
                    objectFit="cover"
                  /> */}
                  <h5 className="card-title m-3 mb-0">{feature.name}</h5>
                  <div className="card-body">
                    <div className="card-text">
                      <p>{feature.description}</p>
                    </div>
                    <Link
                      href={
                        feature.link.startsWith("/")
                          ? feature.link
                          : `/help/${feature.link}`
                      }
                      passHref
                      legacyBehavior
                    >
                      <a className="card-link stretched-link">
                        {feature.linkText}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
