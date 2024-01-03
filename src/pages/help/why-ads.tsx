import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

const pageName = "Why ads?";

export function Help({ appProps }: { appProps: AppProps }): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's page on why we have ads."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Ads, Why ads"
      dontShowAdblockerWarning
    >
      <h1>{pageName}</h1>
      <p>
        Hey there! It looks like you are using an ad blocker, which we totally
        understand! I personally use ad blockers too! We know that ads can be
        annoying.
      </p>
      <p>
        The ads do support the development of our website - as a developer in
        high school, it would be a big help if you turned off your ad blocker.{" "}
        <b>We promise to never lock our content behind an ad detector</b>, so we
        recommend that you enable ads, as it would be extremely helpful,
        increasing our ability to deliver and maintain features. You can turn
        your ad blocker back on whenever you want to. We understand that it is
        your device though, and it is your right to run whatever programs you
        desire.
      </p>
      <p>
        If you do decide to keep your ad blocker on, another way you can support
        us is to share our website with your friends and family, or just anyone
        else who you know that enjoys MakeCode Arcade.
      </p>
      <p>Thanks for helping us out!</p>
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

export default Help;
