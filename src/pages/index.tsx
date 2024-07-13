import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "@/scripts/SiteWebmanifest/manifest";
import Link from "next/link";
import { useSession } from "next-auth/react";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";
import { QuickLink } from "@/components/QuickLinks/types";
import darkBlog from "../assets/images/index/for-dark-theme/blog.png";
import lightBlog from "../assets/images/index/for-light-theme/blog.png";
import darkExtensions from "../assets/images/index/for-dark-theme/extensions.png";
import lightExtensions from "../assets/images/index/for-light-theme/extensions.png";
import darkTools from "../assets/images/index/for-dark-theme/tools.png";
import lightTools from "../assets/images/index/for-light-theme/tools.png";
import { useFeatureIsOn } from "@growthbook/growthbook-react";

const pageName = "Home";

type HomeProps = { appProps: AppProps };

export function Home({ appProps }: HomeProps): React.ReactNode {
  const { data: session } = useSession();

  const showImages = useFeatureIsOn("home-page-card-images");

  // https://arcade.makecode.com/S14537-75361-35697-31523
  const quickLinks: QuickLink[] = [
    {
      name: "Extensions",
      description: `A list of ${Math.floor(appProps.extensionsListed / 10) * 10}+ awesome MakeCode Arcade extensions to further your games!`,
      link: "/extensions",
      linkText: "View awesome extensions",
      image: showImages
        ? {
            darkTheme: darkExtensions,
            lightTheme: lightExtensions,
            altText:
              "A picture of the MakeCode Arcade extension puzzle piece icon in MakeCode Arcade image style.",
          }
        : undefined,
    },
    {
      name: "Tools",
      description: `A list of ${Math.floor(appProps.toolsListed / 10) * 10}+ awesome MakeCode Arcade tools to help you develop great games!`,
      link: "/tools",
      linkText: "View awesome tools",
      image: showImages
        ? {
            darkTheme: darkTools,
            lightTheme: lightTools,
            altText: "A picture of tools in MakeCode Arcade image style.",
          }
        : undefined,
    },
    {
      name: "Blog",
      description:
        "Read about the latest news and updates in the MakeCode Arcade world!",
      link: "/blog",
      linkText: "Read the blog",
      image: showImages
        ? {
            darkTheme: darkBlog,
            lightTheme: lightBlog,
            altText: "A picture of a newspaper in MakeCode Arcade image style.",
          }
        : undefined,
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
      <QuickLinkCards quickLinks={quickLinks} />
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
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
