import getAppProps, { AppProps } from "@/components/WithAppProps";
import { QuickLink } from "@/components/QuickLinks/types";
import React from "react";
import Layout from "@/components/Layout";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";

const pageName = "Built in tools";

type BuiltInToolsProps = { appProps: AppProps };

export function BuiltInTools({ appProps }: BuiltInToolsProps): JSX.Element {
  const quickLinks: QuickLink[] = [
    {
      name: "MIDI to ArcadeMidi",
      // subtitle: "By UnsignedArduino",
      description:
        "Converts your MIDI files to images compatible with the ArcadeMIDI extension!",
      link: "/tools/built-in/midi-to-arcademidi",
      linkText: "Convert your MIDI files",
    },
  ];

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="A list of Awesome Arcade's built in tools!"
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Built in tools, Built in, Awesome Arcade's Built in, Awesome Arcade's Built in tools"
      breadCrumbs={[{ Tools: "/tools" }, { "Built in": "/tools/built-in" }]}
    >
      <h1>Welcome to Awesome Arcade{"'"}s built in tools!</h1>
      <p>
        This is a list of all of Awesome Arcade{"'"}s built in tools, which can
        be used directly on the Awesome Arcade website!{" "}
        <s>
          It was definitely not because UnsignedArduino was too lazy to create a
          new website for his new tools.
        </s>
      </p>
      <QuickLinkCards quickLinks={quickLinks} />
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: BuiltInToolsProps;
}> {
  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default BuiltInTools;
