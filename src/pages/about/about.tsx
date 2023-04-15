import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

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
        We would also love it if you joined us on{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Discussions
        </a>{" "}
        or emailed me at{" "}
        <a href="mailto:unsignedarduino@outlook.com">
          unsignedarduino@outlook.com
        </a>
        . We are always accepting suggestions and constructive criticism!
      </p>
      <p>Thank you so much for being a user of our site.</p>
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
