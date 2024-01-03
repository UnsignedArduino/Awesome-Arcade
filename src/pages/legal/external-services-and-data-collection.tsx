import React from "react";
import AnalyticsConsent from "../../components/AnalyticsConsent";
// import { GOOGLE_SERVICES_WARNING_KEY } from "../../components/GoogleServicesWarning";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

const pageName = "External services and data collection";

export function ExternalServicesAndDataCollection({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's page on external services and data collection."
      keywords={
        "Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Legal, Legal stuff, External services, Data collection, External services and data collection, Cookies, Disable cookies, Disable Awesome Arcade Extensions cookies"
      }
      breadCrumbs={[
        { Legal: "/legal" },
        {
          "External services and data collection":
            "/legal/external-services-and-data-collection",
        },
      ]}
    >
      <h1>{pageName}</h1>
      <p>
        This website uses Google services, which uses cookies and other web
        technologies for analytics and security. This is to help us know how
        visitors use our site so we can improve it.
      </p>
      <p>
        You can view Google{"'"}s partner sites policy at{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/technologies/partner-sites
        </a>{" "}
        and Google{"'"}s cookie policy at{" "}
        <a
          href="https://policies.google.com/technologies/cookies"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/technologies/cookies
        </a>
      </p>
      <AnalyticsConsent />
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

export default ExternalServicesAndDataCollection;
