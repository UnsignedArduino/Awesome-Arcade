import React from "react";
import Layout from "../../../components/Layout";
import getAppProps, { AppProps } from "../../../components/WithAppProps";
import { useFeatureValue } from "@growthbook/growthbook-react";
import { QuickLink } from "@/components/QuickLinks/types";
import QuickLinkCards from "@/components/QuickLinks/QuickLinkCards";

const pageName = "Built In Tools";

export function About({ appProps }: { appProps: AppProps }): React.ReactNode {
  const quickLinks: QuickLink[] = [
    {
      name: "Image Importer (beta)",
      description:
        "Convert your images, including GIFs, into MakeCode Arcade images and animations!",
      link: "/tools/built-in/image-importer",
      linkText: "Import images into MakeCode Arcade",
    },
    {
      name: "Image Exporter (coming soon)",
      description:
        "Convert your MakeCode Arcade images and animations to downloadable images and GIFs!",
      // link: "/tools/built-in/image-exporter",
      // linkText: "Export images from MakeCode Arcade",
    },
    {
      name: "MIDI Importer (coming soon)",
      description:
        "Convert your piano songs in the MIDI file format into MakeCode Arcade songs!",
      // link: "/tools/built-in/midi-importer",
      // linkText: "Import MIDI songs into MakeCode Arcade",
    },
    {
      name: "MIDI Exporter (coming soon)",
      description:
        "Convert your MakeCode Arcade songs to piano songs in the MIDI file format!",
      // link: "/tools/built-in/midi-exporter",
      // linkText: "Export MIDI songs from MakeCode Arcade",
    },
  ];

  const builtinToolsTag = useFeatureValue("built-in-tools-tag", "");
  const builtinToolsDesc = useFeatureValue(
    "built-in-tools-description",
    "Use Awesome Arcade's tools to make your game development experience even better!",
  );

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      breadCrumbs={[
        { Tools: "/tools" },
        { "Built In Tools": "/tools/built-in" },
      ]}
    >
      <h1>
        {builtinToolsTag ? (
          <>
            <span className="badge text-bg-info">{builtinToolsTag}</span>{" "}
          </>
        ) : (
          <></>
        )}
        Built In Tools
      </h1>
      <p>{builtinToolsDesc}</p>
      <QuickLinkCards
        quickLinks={quickLinks}
        divColumnClasses="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 px-1 pt-1 pb-3"
      />
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
