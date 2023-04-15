import Link from "next/link";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";

const pageName = "Page not found";

export function PageNotFound({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <>
        <h1>Page not found</h1>
        <p>Sorry, we were unable to find the page you were looking for. </p>
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
          in the GitHub repository if you believe there should be a page here.
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
