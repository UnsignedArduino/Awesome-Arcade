import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

const pageName = "Multiplayer browser";

export function MultiplayerBrowser({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <>
        <h1>Multiplayer browser</h1>
        <p>Nothing here just yet!</p>
      </>
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

export default MultiplayerBrowser;
