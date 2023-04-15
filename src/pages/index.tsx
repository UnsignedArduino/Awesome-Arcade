import React from "react";
import fs from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "../scripts/Utils/SiteWebmanifest/manifest";

const pageName = "Home";

export function Home({ appProps }: { appProps: AppProps }): JSX.Element {
  const [theme, setTheme] = React.useState<"dark" | "light">("light");

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
      <>
        <h1>Welcome to Awesome Arcade Extensions</h1>
        <p>
          This is a list of MakeCode Arcade extensions that I find super useful
          (or just plain cool) in my projects.
        </p>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { appProps: AppProps };
}> {
  fs.writeFileSync(
    "./public/site.webmanifest",
    await generateSiteWebmanifest()
  );

  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default Home;
