import React from "react";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import { formatDateAndTimeAndSecond } from "@/scripts/Utils/DateAndTime/Format";
import { TextCountup } from "@/components/TextCountFromDate";

const pageName = "Environment";

interface AboutProps {
  envVars: string[][];
  appProps: AppProps;
}

export function About({ envVars, appProps }: AboutProps): React.ReactNode {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <h1>Environment</h1>
      <p>
        Build hash:{" "}
        <a
          href={`https://github.com/UnsignedArduino/Awesome-Arcade/commit/${appProps.buildHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>{appProps.buildHash}</code>
        </a>
        <br />
        Build branch:{" "}
        <a
          href={`https://github.com/UnsignedArduino/Awesome-Arcade/tree/${appProps.buildBranch}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>{appProps.buildBranch}</code>
        </a>
        <br />
        Build time: <code>{appProps.buildTime}</code> (
        {formatDateAndTimeAndSecond(new Date(appProps.buildTime))} -{" "}
        <TextCountup date={new Date(appProps.buildTime)} serverRender={false} />{" "}
        ago)
      </p>
      <h2>Build variables</h2>
      <code>
        {envVars.map((value: string[]) => {
          return (
            <React.Fragment key={value[0]}>
              {value[0]}: {value[1]}
              <br />
            </React.Fragment>
          );
        })}
      </code>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{ props: AboutProps }> {
  const vercelEnvs = [
    "NODE_ENV",
    "VERCEL_ENV",
    "VERCEL_URL",
    "VERCEL_GIT_PROVIDER",
    "VERCEL_GIT_REPO_SLUG",
    "VERCEL_GIT_REPO_OWNER",
    "VERCEL_GIT_REPO_ID",
    "VERCEL_GIT_COMMIT_REF",
    "VERCEL_GIT_COMMIT_SHA",
    "VERCEL_GIT_COMMIT_MESSAGE",
    "VERCEL_GIT_COMMIT_AUTHOR_LOGIN",
    "VERCEL_GIT_COMMIT_AUTHOR_NAME",
  ];

  return {
    props: {
      envVars: vercelEnvs.map((envVar: string) => {
        return [
          envVar,
          process.env[envVar] != undefined ? process.env[envVar] : "undefined",
        ];
      }) as string[][],
      appProps: await getAppProps(),
    },
  };
}

export default About;
