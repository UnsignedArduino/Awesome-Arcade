import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import { GetStaticPathsResult } from "next";
import Layout from "@/components/Layout";
import { PostQuery } from "../../../tina/__generated__/types";
import React from "react";
import { createBreadCrumbSegment } from "@/components/Layout/layout";
import BlogPost from "@/components/Blog/Post/Post";
import MakeCodeArcadeBlockRendererContext from "@/components/MakeCodeArcade/Blocks/RendererContext";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";

type BlogProps = {
  variables: { relativePath: string };
  filename: string;
  data: PostQuery;
  query: string;
  appProps: AppProps;
};

type BlogParams = { filename: string };

export default function BlogPage(props: BlogProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageName = `${data.post.title} | Blog`;

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={props.appProps}
      description={data.post.description ?? "A blog post on Awesome Arcade!"}
      keywords={`Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Blog, Awesome Arcade blog, Blog post, Awesome Arcade blog post, ${(data.post.tags ?? []).join(", ")}`}
      breadCrumbs={[
        createBreadCrumbSegment("Blog", "/blog"),
        createBreadCrumbSegment(data.post.title, props.filename),
      ]}
    >
      <ThemedSyntaxHighlighter language="json">
        {JSON.stringify(data.post.body, null, 2)}
      </ThemedSyntaxHighlighter>
      <MakeCodeArcadeBlockRendererContext>
        <div id={`blogPost${data.post.title}`}>
          <BlogPost data={data} />
        </div>
      </MakeCodeArcadeBlockRendererContext>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: {
  params: BlogParams;
}): Promise<{
  props: BlogProps;
}> {
  let variables = { relativePath: `${params.filename}.mdx` };

  const res = await client.queries.post(variables);
  const query = res.query;
  const data = res.data;
  variables = res.variables;

  return {
    props: {
      variables,
      filename: params.filename,
      data,
      query,
      appProps: await getAppProps(),
    },
  };
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<BlogParams>
> {
  const postsListData = await client.queries.postConnection();

  return {
    paths: postsListData.data.postConnection.edges!.map((post) => ({
      params: { filename: post!.node!._sys.filename },
    })),
    fallback: false,
  };
}
