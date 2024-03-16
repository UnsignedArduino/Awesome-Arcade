import { useTina } from "tinacms/dist/react";
import client from "../../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import { GetStaticPathsResult } from "next";
import Layout from "@/components/Layout";
import { AuthorsQuery } from "../../../../tina/__generated__/types";
import React from "react";
import { createBreadCrumbSegment } from "@/components/Layout/layout";
import BlogAuthor from "@/components/Blog/Author/Author";

type BlogAuthorProps = {
  variables: { relativePath: string };
  filename: string;
  data: AuthorsQuery;
  query: string;
  appProps: AppProps;
};

type BlogAuthorParams = { author: string };

export default function BlogAuthorPage(props: BlogAuthorProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageName = `${data.authors.name} | Blog`;

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={props.appProps}
      description={`${data.authors.name} on Awesome Arcade's blog!`}
      keywords={`Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Blog, Awesome Arcade blog, Blog post, Awesome Arcade blog post, ${data.authors.name}, ${data.authors.name} blog posts`}
      breadCrumbs={[
        createBreadCrumbSegment("Blog", "/blog"),
        createBreadCrumbSegment("Authors", "/blog/authors"),
        createBreadCrumbSegment(
          data.authors.name,
          `/blog/authors/${props.filename}`,
        ),
      ]}
    >
      {/*<code>{JSON.stringify(data, null, 2)}</code>*/}
      <BlogAuthor data={data} />
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: {
  params: BlogAuthorParams;
}): Promise<{
  props: BlogAuthorProps;
}> {
  let variables = { relativePath: `${params.author}.md` };

  const res = await client.queries.authors(variables);
  const query = res.query;
  const data = res.data;
  variables = res.variables;

  return {
    props: {
      variables,
      filename: params.author,
      data,
      query,
      appProps: await getAppProps(),
    },
  };
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<BlogAuthorParams>
> {
  const postsListData = await client.queries.authorsConnection();

  return {
    paths: postsListData.data.authorsConnection.edges!.map((author) => ({
      params: { author: author!.node!._sys.filename },
    })),
    fallback: false,
  };
}
