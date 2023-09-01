import React from "react";
import Layout from "../../../../../components/Layout";
import getAppProps, { AppProps } from "../../../../../components/WithAppProps";

const pageName = "Arcade MIDI to Song";

export function ArcadeMIDItoSongOnline({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <h1>Arcade-MIDI-to-Song-Online</h1>
      <p>
        Made by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/UnsignedArduino"
        >
          UnsignedArduino
        </a>
        .
      </p>
      <div className="alert alert-warning" role="alert">
        This tool is still a work in progress!
      </div>
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

export default ArcadeMIDItoSongOnline;
