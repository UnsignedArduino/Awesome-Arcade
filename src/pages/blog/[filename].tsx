import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import { GetStaticPathsResult } from "next";
import Layout from "@/components/Layout";
import { PostQuery } from "../../../tina/__generated__/types";
import React from "react";
import { formatDateLong } from "@/scripts/Utils/DateAndTime/Format";
import { createBreadCrumbSegment } from "@/components/Layout/layout";

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
      {/*<code>{JSON.stringify(data, null, 2)}</code>*/}
      <h1>{data.post.title}</h1>
      <p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.post.author.avatarURL as string | undefined}
          alt={`Profile picture of ${data.post.author.name}`}
          style={{
            width: "1em",
            height: "1em",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />{" "}
        {data.post.author.name}
        <br />
        {data.post.datePosted != null ? (
          <>Posted on {formatDateLong(new Date(data.post.datePosted))}.</>
        ) : null}
      </p>
      <small>
        <ContentSection content={data.post.description} />
      </small>
      <ContentSection content={data.post.body} />
      <small>
        <p>
          {(data.post.tags?.length ?? 0) > 0 ? (
            <>
              Tags: <i>{(data.post.tags ?? []).join(", ")}</i>
            </>
          ) : (
            <i>No tags on this blog post.</i>
          )}
        </p>
      </small>
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
  let variables = { relativePath: `${params.filename}.md` };

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

const PageSection = (props: any) => {
  return (
    <>
      <h2>{props.heading}</h2>
      <p>{props.content}</p>
    </>
  );
};

const components = {
  PageSection,
};

const ContentSection = ({ content }: { content: any }) => {
  return <TinaMarkdown components={components} content={content} />;
};
