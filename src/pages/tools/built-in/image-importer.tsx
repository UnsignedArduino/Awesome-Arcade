import React from "react";
import Layout from "@/components/Layout";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import ImageImporterTool from "@/components/BuiltInTools/ImageImporter";

const pageName = "Image Importer";

export function ImageImporter({
  appProps,
}: {
  appProps: AppProps;
}): React.ReactNode {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      breadCrumbs={[
        { Tools: "/tools" },
        { "Built In Tools": "/tools/built-in" },
        { "Image Importer (beta)": "/tools/built-in/image-importer" },
      ]}
    >
      <h1>Image Importer (beta)</h1>
      <p>
        Convert your images, including GIFs, into MakeCode Arcade images and
        animations!
      </p>
      <ImageImporterTool />
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

export default ImageImporter;
