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
        <p>
          You can browse active multiplayer games posted by other people to find
          someone to play with! You can also view dedicated server hosted games,
          where games that are compatible with the dedicated server model are
          hosted for an extended period of time, allowing three players to join
          and leave at will!
        </p>
        <h2>Active games</h2>
        <div>
          <div className="alert alert-info" role="alert">
            Nothing here just yet!
          </div>
        </div>
        <h2>Dedicated server hosted games</h2>
        <div>
          <div className="alert alert-info" role="alert">
            Nothing here just yet!
          </div>
        </div>
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
