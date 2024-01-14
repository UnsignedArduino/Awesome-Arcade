import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";
import { useSession } from "next-auth/react";
import Link from "next/link";

const pageName = "Multiplayer browser";

export function MultiplayerBrowser({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  const { data: session } = useSession();

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
          {session != null ? (
            <p>
              Click <Link href="/multiplayer-browser/post">here</Link> to post a
              new multiplayer game.
            </p>
          ) : (
            <p>You are not signed in, so you cannot post a multiplayer game!</p>
          )}
        </div>
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
