import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "../scripts/Utils/SiteWebmanifest/manifest";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFeatureIsOn } from "@growthbook/growthbook-react";

const pageName = "Home";

type HomeProps = { appProps: AppProps };

export function Home({ appProps }: HomeProps): JSX.Element {
  const removeOldHome = useFeatureIsOn("remove-old-home");

  const { data: session } = useSession();

  type QuickLinkPage = {
    name: string;
    description: string;
    link: string;
    linkText: string;
  };

  const quickLinkPages: QuickLinkPage[] = [
    {
      name: "Extensions",
      description:
        "A list of awesome MakeCode Arcade extensions to further your games!",
      link: "/extensions",
      linkText: "View awesome extensions",
    },
    {
      name: "Tools",
      description:
        "A list of awesome MakeCode Arcade tools to help you develop great games!",
      link: "/tools",
      linkText: "View awesome tools",
    },
  ];

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="This is a list of awesome MakeCode Arcade extensions and tools that I find super useful (or just plain cool) in my projects."
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools"
    >
      <h1>
        Welcome to Awesome Arcade
        {session?.user?.name != null ? `, ${session.user.name}` : ""}!
      </h1>
      <p>
        This is a website of awesome MakeCode Arcade extensions and tools that I
        find super useful (or just plain cool) in my projects.
      </p>
      <div style={{ overflowX: "hidden" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2">
          {quickLinkPages.map((feature: QuickLinkPage, index: number) => {
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
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      {removeOldHome ? (
        <></>
      ) : (
        <p>
          You can find the old home page <Link href="/old">here</Link>. (please
          note that this page will be removed soon.)
        </p>
      )}
      <p>
        Want to suggest a new extension, tool, or modification? Head over to our
        GitHub repository and file an{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue
        </a>
        ! (A GitHub account is required.)
      </p>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: HomeProps;
}> {
  await fs.writeFile(
    "./public/site.webmanifest",
    await generateSiteWebmanifest(),
  );

  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default Home;
