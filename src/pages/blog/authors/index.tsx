import client from "../../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import { Authors } from "../../../../tina/__generated__/types";
import React from "react";
import { createBreadCrumbSegment } from "@/components/Layout/layout";
import BlogAuthorPreviewRenderer, {
  BlogAuthorPreview,
} from "@/components/Blog/Author/Preview";
import { CARD_VARIANTS } from "@/animations/card";
import { motion } from "framer-motion";

type BlogAuthorProps = {
  blogAuthorPreviews: BlogAuthorPreview[];
  appProps: AppProps;
};

const pageName = `All authors | Blog`;

export default function AllBlogAuthors(props: BlogAuthorProps) {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={props.appProps}
      description="All of Awesome Arcade's blog authors!"
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Blog, Awesome Arcade blog, Blog authors, Awesome Arcade blog authors, All blog authors, All Awesome Arcade blog authors"
      breadCrumbs={[
        createBreadCrumbSegment("Blog", "/blog"),
        createBreadCrumbSegment("Authors", "/blog/authors"),
      ]}
    >
      <h1>All blog authors</h1>
      <p>Here is a list of all blog authors on Awesome Arcade.</p>
      {
        <div className="p-2">
          {props.blogAuthorPreviews.map((preview, index) => {
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
                key={preview.name}
              >
                <BlogAuthorPreviewRenderer
                  preview={preview}
                  key={preview.name}
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
  props: BlogAuthorProps;
}> {
  const authorsListData = await client.queries.authorsConnection();

  const previews: BlogAuthorPreview[] = [];

  for (const edge of authorsListData.data.authorsConnection.edges ?? []) {
    if (!edge || !edge.node) {
      continue;
    }
    const author = edge.node;
    previews.push({
      name: author.name,
      link: author.link,
      avatarURL: author.avatarURL,
    });
  }

  return {
    props: {
      blogAuthorPreviews: previews,
      appProps: await getAppProps(),
    },
  };
}
