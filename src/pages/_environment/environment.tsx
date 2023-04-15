import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

const pageName = "Environment build variables";

interface AboutProps {
  vercelVars: string[][];
  appProps: AppProps;
}

export function About({ vercelVars, appProps }: AboutProps): JSX.Element {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <h1>Environment build variables</h1>
      <pre>
        {vercelVars.map((value: string[]) => {
          return (
            <React.Fragment key={value[0]}>
              {value[0]}: {value[1]}
              <br />
            </React.Fragment>
          );
        })}
      </pre>
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
      vercelVars: vercelEnvs.map((envVar: string) => {
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
