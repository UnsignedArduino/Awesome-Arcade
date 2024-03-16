import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "@/scripts/SiteWebmanifest/manifest";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";
import { QuickLink } from "@/components/QuickLinks/types";

const pageName = "Home";

type HomeProps = { appProps: AppProps };

export function Home({ appProps }: HomeProps): JSX.Element {
  const removeOldHome = useFeatureIsOn("remove-old-home");

  const { data: session } = useSession();

  const quickLinks: QuickLink[] = [
    {
      name: "Extensions",
      description: `A list of ${Math.floor(appProps.extensionsListed / 10) * 10}+ awesome MakeCode Arcade extensions to further your games!`,
      link: "/extensions",
      linkText: "View awesome extensions",
    },
    {
      name: "Tools",
      description: `A list of ${Math.floor(appProps.toolsListed / 10) * 10}+ awesome MakeCode Arcade tools to help you develop great games!`,
      link: "/tools",
      linkText: "View awesome tools",
    },
    {
      name: "Blog",
      description:
        "Read about the latest news and updates in the MakeCode Arcade world!",
      link: "/blog",
      linkText: "Read the blog",
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
      <QuickLinkCards
        quickLinks={quickLinks}
        divColumnClasses="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2"
      />
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
        Want to suggest a new extension, tool, or modification? Check out our{" "}
        <Link href="/help/contributing">guides</Link> on contributing to Awesome
        Arcade!
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
