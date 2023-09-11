import React from "react";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";

const pageName = "About";

export function About({ appProps }: { appProps: AppProps }): JSX.Element {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <h1>About</h1>
      <p>
        Awesome Arcade Extensions is developed and run by a high school student
        learning to program. Having a passion for MakeCode Arcade, I decided to{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions"
          target="_blank"
          rel="noopener noreferrer"
        >
          turn an old project
        </a>{" "}
        into a website to learn modern web development.
      </p>
      <p>
        I would love it if you joined me on{" "}
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
        , or emailed me at{" "}
        <a href="mailto:unsignedarduino@outlook.com">
          unsignedarduino@outlook.com
        </a>
        . I am always accepting suggestions and constructive criticism!
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

export default About;
