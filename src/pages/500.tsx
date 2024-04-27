import Link from "next/link";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";

const pageName = "Page not found";

export function PageNotFound({
  appProps,
}: {
  appProps: AppProps;
}): React.ReactNode {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <>
        <h1>Internal server error</h1>
        <p>
          Sorry, an internal server error happened and we could not service your
          request.
        </p>
        <p>
          Go back to <Link href="/">home</Link>?
        </p>
        <p>
          You can report{" "}
          <a
            href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            issues
          </a>{" "}
          like this in the GitHub repository.
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

export default PageNotFound;
