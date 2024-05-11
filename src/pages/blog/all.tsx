import client from "../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import React from "react";
import BlogPostPreviewRenderer, {
  BlogPostPreview,
} from "@/components/Blog/Post/Preview";
import { createBreadCrumbSegment } from "@/components/Layout/layout";
import { makeUndefinedNull } from "@/scripts/Utils/TypeHelp/NullUndefined";
import { CARD_VARIANTS } from "@/animations/card";
import { motion } from "framer-motion";

type BlogProps = {
  blogPostPreviews: BlogPostPreview[];
  appProps: AppProps;
};

const pageName = `All blog posts | Blog`;

export default function AllBlogPosts(props: BlogProps) {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={props.appProps}
      description="All of Awesome Arcade's blog posts!"
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Blog, Awesome Arcade blog, Blog post, Awesome Arcade blog post, All blog posts, All Awesome Arcade blog posts"
      breadCrumbs={[
        createBreadCrumbSegment("Blog", "/blog"),
        createBreadCrumbSegment("All blog posts", "/blog/all"),
      ]}
    >
      <h1>All blog posts</h1>
      <p>Here is a list of all blog posts on Awesome Arcade. Enjoy reading!</p>
      {
        <div className="p-2">
          {props.blogPostPreviews.map((preview, index) => {
            return (
              <motion.div
                custom={index}
                variants={CARD_VARIANTS}
                initial="initial"
                animate="animate"
                whileHover="whileHover"
                whileTap="whileTap"
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                key={preview.title}
              >
                <BlogPostPreviewRenderer
                  preview={preview}
                  key={preview.title}
                />
              </motion.div>
            );
          })}
        </div>
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
      heroImage: makeUndefinedNull(post.heroImage),
      author: post.author,
      description: post.description ?? "",
      createdAt: makeUndefinedNull(post.createdAt),
      lastUpdated: makeUndefinedNull(post.lastUpdated),
      link: `/blog/${post._sys.filename}`,
    });
  }

  previews.sort((a, b) => {
    if (a.createdAt === null) {
      return 1;
    }
    if (b.createdAt === null) {
      return -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    props: {
      blogPostPreviews: previews,
      appProps: await getAppProps(),
    },
  };
}
