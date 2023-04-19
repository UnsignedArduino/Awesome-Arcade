import React from "react";
import fs from "fs";
import path from "path";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "../scripts/Utils/SiteWebmanifest/manifest";
import AwesomeArcadeExtensionList from "../components/AwesomeArcadeExtensionList";
import parseExtensionXML, {
  ExtensionList,
} from "@/scripts/Utils/ParseExtensionsXML";

const pageName = "Home";

type HomeProps = { appProps: AppProps; list: ExtensionList };

export function Home({ appProps, list }: HomeProps): JSX.Element {
  const [_, setTheme] = React.useState<"dark" | "light">("light");

  function onThemeChange(event: CustomEvent<"Dark" | "Light">) {
    setTheme(event.detail.toLowerCase() as "dark" | "light");
  }

  React.useEffect(() => {
    let theme = window.localStorage.getItem("themeUsed");
    if (theme === null) {
      theme = "light";
    } else {
      theme = theme.toLowerCase();
    }

    window.document.documentElement.addEventListener(
      "themeused",
      onThemeChange
    );

    setTheme(theme as "dark" | "light");
  }, []);

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="This is a list of MakeCode Arcade extensions that I find super useful (or just plain cool) in my projects."
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions"
    >
      <h1>Welcome to Awesome Arcade Extensions</h1>
      <p>
        This is a list of MakeCode Arcade extensions that I find super useful
        (or just plain cool) in my projects.
      </p>
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      <p>Click anywhere in the box to copy the link to your clipboard!</p>
      <div>
        <AwesomeArcadeExtensionList list={list} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: HomeProps;
}> {
  fs.writeFileSync(
    "./public/site.webmanifest",
    await generateSiteWebmanifest()
  );

  return {
    props: {
      appProps: await getAppProps(),
      list: await parseExtensionXML(
        fs
          .readFileSync(path.resolve(process.cwd(), "src", "extensions.xml"))
          .toString()
      ),
    },
  };
}

export default Home;
