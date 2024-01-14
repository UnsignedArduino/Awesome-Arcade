import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";
import Link from "next/link";
import { useSession } from "next-auth/react";

const pageName = "Post active game";

export function PostActiveGame({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  const { data: session } = useSession();

  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <>
        <h1>Post active game</h1>
        <div>
          {session == null ? (
            <p>You are not signed in, so you cannot post a multiplayer game!</p>
          ) : (
            <p>Fill in the information below to post a multiplayer game!</p>
          )}
        </div>
        <p>
          Back to <Link href="/multiplayer-browser">multiplayer browser</Link>.
        </p>
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

export default PostActiveGame;
