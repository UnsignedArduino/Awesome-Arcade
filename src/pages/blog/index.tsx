import client from "../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import { Authors } from "../../../tina/__generated__/types";
import React from "react";
import BlogPostPreviewRenderer, {
  BlogPostPreview,
} from "@/components/Blog/Post/Preview";
import Link from "next/link";

type BlogProps = {
  blogPostPreviews: BlogPostPreview[];
  appProps: AppProps;
};

const pageName = `Blog`;

export default function BlogPage(props: BlogProps) {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={props.appProps}
      description="Home for Awesome Arcade's blog!"
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Blog, Awesome Arcade blog, Blog post, Awesome Arcade blog post, Blog home, Awesome Arcade blog home"
    >
      <h1>Welcome to Awesome Arcade{"'"}s blog!</h1>
      <p>
        Here I write about many things related to MakeCode Arcade, including
        games, extensions, tools, tips and tricks, and experiences developing in
        MakeCode Arcade.
      </p>
      <p>
        Find all blog posts <Link href="/blog/all">here</Link>.
      </p>
      <h2>Latest blog posts</h2>
      {
        <>
          {props.blogPostPreviews.map((preview) => {
            return (
              <BlogPostPreviewRenderer preview={preview} key={preview.title} />
            );
          })}
        </>
      }
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: BlogProps;
}> {
  const postsListData = await client.queries.postConnection();

  const previews: BlogPostPreview[] = [];

  for (const edge of postsListData.data.postConnection.edges ?? []) {
    if (!edge || !edge.node) {
      continue;
    }
    const post = edge.node;
    previews.push({
      title: post.title,
      author: post.author as Authors,
      description: post.description ?? "",
      postedDate: post.datePosted == null ? null : post.datePosted,
      link: `/blog/${post._sys.filename}`,
    });
  }

  previews.sort((a, b) => {
    if (a.postedDate === null) {
      return 1;
    }
    if (b.postedDate === null) {
      return -1;
    }
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });

  previews.splice(5);

  return {
    props: {
      blogPostPreviews: previews,
      appProps: await getAppProps(),
    },
  };
}
